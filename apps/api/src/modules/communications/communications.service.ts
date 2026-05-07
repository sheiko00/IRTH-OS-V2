import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WebSocketsService } from '../websockets/websockets.service';

@Injectable()
export class CommunicationsService {
  constructor(
    private prisma: PrismaService,
    private websockets: WebSocketsService
  ) {}

  async createThread(data: {
    title: string;
    type: string;
    participantIds: string[];
    orderId?: string;
  }) {
    const thread = await this.prisma.thread.create({
      data: {
        title: data.title,
        type: data.type,
        orderId: data.orderId,
        participants: {
          connect: data.participantIds.map(id => ({ id })),
        },
      },
      include: {
        participants: { select: { id: true, name: true, email: true } },
      },
    });

    return thread;
  }

  async getThreads(userId: string) {
    return this.prisma.thread.findMany({
      where: {
        participants: { some: { id: userId } },
      },
      include: {
        lastMessage: true,
        participants: { select: { id: true, name: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getMessages(threadId: string, userId: string) {
    // Verify participation
    const thread = await this.prisma.thread.findFirst({
      where: {
        id: threadId,
        participants: { some: { id: userId } },
      },
    });

    if (!thread) throw new NotFoundException('Thread not found or access denied');

    return this.prisma.message.findMany({
      where: { threadId },
      include: { sender: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendMessage(threadId: string, senderId: string, content: string) {
    const thread = await this.prisma.thread.findFirst({
      where: {
        id: threadId,
        participants: { some: { id: senderId } },
      },
      include: { participants: true },
    });

    if (!thread) throw new NotFoundException('Thread not found');

    const message = await this.prisma.message.create({
      data: {
        threadId,
        senderId,
        content,
      },
      include: { sender: { select: { id: true, name: true } } },
    });

    // Update thread last message
    await this.prisma.thread.update({
      where: { id: threadId },
      data: { lastMessageId: message.id },
    });

    // Notify participants via WebSocket
    thread.participants.forEach(p => {
      if (p.id !== senderId) {
        this.websockets.emitToUser(p.id, 'new_message', {
          threadId,
          message,
        });
      }
    });

    return message;
  }
}
