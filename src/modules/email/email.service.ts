import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      console.warn(
        'RESEND_API_KEY is not set. Email endpoints will return mock responses.',
      );
    }
    this.resend = new Resend(apiKey || 'placeholder');
    this.fromEmail = this.configService.get<string>(
      'RESEND_FROM_EMAIL',
      'onboarding@resend.dev',
    );
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { to, subject, text, html } = sendEmailDto;
    const apiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!apiKey) {
      return {
        success: false,
        message:
          'Resend is not configured. Set RESEND_API_KEY to send real emails.',
        mock: true,
        to,
        subject,
      };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject,
        text,
        html,
      });

      if (error) {
        console.error('Resend API error:', error);
        throw new BadRequestException(error.message || 'Failed to send email.');
      }

      return {
        success: true,
        message: 'Email sent successfully',
        id: data?.id,
        to,
        subject,
      };
    } catch (error) {
      console.error('Email service error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unable to send email at this time.',
      );
    }
  }

  async sendTestEmail(to: string) {
    return this.sendEmail({
      to,
      subject: '🤖 SupportPilot - Test Email',
      text: `Hi there,\n\nThis is a test email from SupportPilot, your AI customer support agent powered by NestJS, Gemini, Resend, Swagger and Sentry.\n\nIf you received this, your email integration is working!`,
      html: `<p>Hi there,</p><p>This is a test email from <strong>SupportPilot</strong>, your AI customer support agent powered by NestJS, Gemini, Resend, Swagger and Sentry.</p><p>If you received this, your email integration is working!</p>`,
    });
  }

  async sendChatSummary(to: string, messages: { role: string; text: string }[]) {
    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Customer' : 'AI'}: ${m.text}`)
      .join('\n\n');

    return this.sendEmail({
      to,
      subject: '📋 New SupportPilot Conversation Summary',
      text: `You have a new customer conversation summary:\n\n${transcript}\n\n---\nSent by SupportPilot AI`,
      html: `<h2>New Customer Conversation</h2><pre style="white-space:pre-wrap;font-family:inherit;background:#f1f5f9;padding:1rem;border-radius:0.5rem;">${transcript.replace(/\n/g, '<br/>')}</pre><p>— Sent by SupportPilot AI</p>`,
    });
  }
}
