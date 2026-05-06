import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);
  private fromAddress: string;

  constructor(private config: ConfigService) {
    const host = this.config.get<string>('SMTP_HOST') || 'smtp.spacemail.com';
    const port = this.config.get<number>('SMTP_PORT') || 465;
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    this.fromAddress = this.config.get<string>('SMTP_FROM') || user || 'noreply@irth.app';

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      this.logger.log(`Email configured: ${host}:${port} as ${user}`);
    } else {
      this.logger.warn('SMTP not configured — emails will be logged to console');
    }
  }

  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<boolean> {
    if (!this.transporter) {
      this.logger.log(`📧 [DEV] Email to: ${to} | Subject: ${subject}`);
      this.logger.debug(html);
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: `"IRTH" <${this.fromAddress}>`,
        to,
        subject,
        html,
        text: text || subject,
      });
      this.logger.log(`Email sent to ${to}: ${subject}`);
      return true;
    } catch (err) {
      this.logger.error(`Failed to send email to ${to}: ${err}`);
      return false;
    }
  }

  // ─── ORDER EMAILS ─────────────────────────────
  async sendOrderConfirmation(to: string, data: {
    orderNumber: string;
    customerName: string;
    items: { name: string; quantity: number; price: number }[];
    total: number;
  }) {
    const itemsHtml = data.items.map(i =>
      `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${i.price} EGP</td></tr>`
    ).join('');

    return this.sendEmail(to, `تأكيد الطلب #${data.orderNumber}`, `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">IRTH</h1>
          <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">تأكيد الطلب</p>
        </div>
        <div style="padding:32px">
          <h2 style="margin:0 0 8px;color:#1a1a2e">مرحباً ${data.customerName} 👋</h2>
          <p style="color:#666;margin:0 0 24px">تم استلام طلبك بنجاح! رقم الطلب: <strong>${data.orderNumber}</strong></p>
          <table style="width:100%;border-collapse:collapse;margin:0 0 24px">
            <thead><tr style="background:#f8f9fa"><th style="padding:10px;text-align:left">المنتج</th><th style="padding:10px;text-align:center">الكمية</th><th style="padding:10px;text-align:right">السعر</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot><tr><td colspan="2" style="padding:12px;font-weight:bold;text-align:right">الإجمالي:</td><td style="padding:12px;font-weight:bold;text-align:right;color:#7c3aed;font-size:18px">${data.total} EGP</td></tr></tfoot>
          </table>
          <p style="color:#666;font-size:14px">سنخبرك بتحديثات الشحن قريباً. شكراً لتسوقك معنا! 💜</p>
        </div>
        <div style="background:#f8f9fa;padding:16px;text-align:center;color:#999;font-size:12px">
          © 2026 IRTH. All rights reserved.
        </div>
      </div>
    `);
  }

  async sendOrderStatusUpdate(to: string, data: {
    orderNumber: string;
    customerName: string;
    status: string;
    trackingNumber?: string;
  }) {
    const statusMessages: Record<string, string> = {
      CONFIRMED: 'تم تأكيد طلبك وجاري تحضيره ✅',
      PROCESSING: 'طلبك قيد التحضير 🔄',
      IN_PRODUCTION: 'طلبك في مرحلة الإنتاج 🏭',
      READY: 'طلبك جاهز للشحن 📦',
      SHIPPED: `طلبك تم شحنه 🚚${data.trackingNumber ? ` رقم التتبع: ${data.trackingNumber}` : ''}`,
      DELIVERED: 'تم توصيل طلبك بنجاح! 🎉',
      CANCELLED: 'تم إلغاء الطلب ❌',
    };

    return this.sendEmail(to, `تحديث الطلب #${data.orderNumber}`, `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">IRTH</h1>
        </div>
        <div style="padding:32px;text-align:center">
          <h2 style="margin:0 0 16px">${data.customerName}</h2>
          <p style="font-size:18px;color:#333">${statusMessages[data.status] || `حالة الطلب: ${data.status}`}</p>
          <p style="color:#999;margin:16px 0 0">طلب رقم: <strong>${data.orderNumber}</strong></p>
        </div>
        <div style="background:#f8f9fa;padding:16px;text-align:center;color:#999;font-size:12px">© 2026 IRTH</div>
      </div>
    `);
  }

  async sendPasswordReset(to: string, resetLink: string) {
    return this.sendEmail(to, 'إعادة تعيين كلمة المرور — IRTH', `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">IRTH</h1>
        </div>
        <div style="padding:32px;text-align:center">
          <h2 style="margin:0 0 16px">إعادة تعيين كلمة المرور</h2>
          <p style="color:#666;margin:0 0 24px">اضغط على الزر أدناه لإعادة تعيين كلمة المرور:</p>
          <a href="${resetLink}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">إعادة تعيين كلمة المرور</a>
          <p style="color:#999;font-size:12px;margin:24px 0 0">هذا الرابط صالح لمدة ساعة واحدة فقط</p>
        </div>
        <div style="background:#f8f9fa;padding:16px;text-align:center;color:#999;font-size:12px">© 2026 IRTH</div>
      </div>
    `);
  }

  async sendWelcomeEmail(to: string, name: string) {
    return this.sendEmail(to, 'أهلاً بك في IRTH! 💜', `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">IRTH</h1>
          <p style="color:rgba(255,255,255,0.8);margin:8px 0 0">مرحباً بك!</p>
        </div>
        <div style="padding:32px;text-align:center">
          <h2 style="margin:0 0 16px">أهلاً ${name} 👋</h2>
          <p style="color:#666">حسابك جاهز! يمكنك الآن تصفح منتجاتنا والطلب بسهولة.</p>
        </div>
        <div style="background:#f8f9fa;padding:16px;text-align:center;color:#999;font-size:12px">© 2026 IRTH</div>
      </div>
    `);
  }
}
