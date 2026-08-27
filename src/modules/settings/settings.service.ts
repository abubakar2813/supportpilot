import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface BusinessSettings {
  businessName: string;
  businessWebsite: string;
  supportEmail: string;
  systemPrompt: string;
}

@Injectable()
export class SettingsService {
  constructor(private readonly configService: ConfigService) {}

  getSettings(): BusinessSettings {
    return {
      businessName: this.configService.get<string>('BUSINESS_NAME', 'SupportPilot'),
      businessWebsite: this.configService.get<string>('BUSINESS_WEBSITE', ''),
      supportEmail: this.configService.get<string>('SUPPORT_EMAIL', ''),
      systemPrompt: this.configService.get<string>(
        'SYSTEM_PROMPT',
        'You are a helpful customer support agent. Be friendly, concise, and professional.',
      ),
    };
  }
}
