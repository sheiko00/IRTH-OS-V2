import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage, Bucket } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: Bucket;
  private readonly logger = new Logger(StorageService.name);

  constructor(private config: ConfigService) {
    const projectId = this.config.get<string>('GCS_PROJECT_ID');
    const keyFilename = this.config.get<string>('GCS_KEY_FILE');
    const bucketName = this.config.get<string>('GCS_BUCKET') || 'irth-os-assets';

    if (projectId && keyFilename) {
      this.storage = new Storage({ projectId, keyFilename });
    } else if (projectId) {
      // Use default credentials (Cloud Run automatically has these)
      this.storage = new Storage({ projectId });
    } else {
      // Local dev fallback — will use emulator or mock
      this.storage = new Storage();
      this.logger.warn(
        'GCS not configured — file uploads will fail unless running in Cloud environment'
      );
    }

    this.bucket = this.storage.bucket(bucketName);
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads'
  ): Promise<{ url: string; filename: string; size: number; mimeType: string }> {
    const ext = path.extname(file.originalname);
    const filename = `${folder}/${uuidv4()}${ext}`;

    const blob = this.bucket.file(filename);
    const stream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', err => {
        this.logger.error(`Upload failed: ${err.message}`);
        reject(err);
      });

      stream.on('finish', async () => {
        // Make file publicly accessible
        try {
          await blob.makePublic();
        } catch (_e) {
          this.logger.warn('Could not make file public, using signed URL');
        }

        const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${filename}`;
        resolve({
          url: publicUrl,
          filename,
          size: file.size,
          mimeType: file.mimetype,
        });
      });

      stream.end(file.buffer);
    });
  }

  async uploadBuffer(
    buffer: Buffer,
    filename: string,
    mimeType: string,
    folder: string = 'uploads'
  ): Promise<string> {
    const ext = path.extname(filename);
    const storedName = `${folder}/${uuidv4()}${ext}`;

    const blob = this.bucket.file(storedName);
    await blob.save(buffer, {
      contentType: mimeType,
      metadata: { cacheControl: 'public, max-age=31536000' },
    });

    try {
      await blob.makePublic();
    } catch (_e) {
      // Ignore — may not have permission
    }

    return `https://storage.googleapis.com/${this.bucket.name}/${storedName}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const bucketPrefix = `https://storage.googleapis.com/${this.bucket.name}/`;
      if (!fileUrl.startsWith(bucketPrefix)) return;

      const filename = fileUrl.replace(bucketPrefix, '');
      await this.bucket.file(filename).delete();
      this.logger.log(`Deleted: ${filename}`);
    } catch (err) {
      this.logger.warn(`Failed to delete file: ${err}`);
    }
  }

  async getSignedUrl(filename: string, expiresInMinutes = 60): Promise<string> {
    const [url] = await this.bucket.file(filename).getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresInMinutes * 60 * 1000,
    });
    return url;
  }
}
