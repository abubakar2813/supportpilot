import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendTestEmailDto } from './dto/send-test-email.dto';
import { ChatSummaryDto } from '../chat/dto/chat-summary.dto';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';

@ApiTags('Email')
@Controller('email')
@UseInterceptors(LoggingInterceptor)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a custom email via Resend' })
  @ApiResponse({ status: 201, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request payload' })
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }

  @Post('send-test')
  @ApiOperation({ summary: 'Send a test email via Resend' })
  @ApiResponse({ status: 201, description: 'Test email sent successfully' })
  async sendTestEmail(@Body() sendTestEmailDto: SendTestEmailDto) {
    return this.emailService.sendTestEmail(sendTestEmailDto.to);
  }

  @Post('chat-summary')
  @ApiOperation({ summary: 'Email a chat conversation summary' })
  @ApiResponse({ status: 201, description: 'Summary email sent successfully' })
  async sendChatSummary(@Body() chatSummaryDto: ChatSummaryDto) {
    return this.emailService.sendChatSummary(
      chatSummaryDto.to,
      chatSummaryDto.messages,
    );
  }
}
