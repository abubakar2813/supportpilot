import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SettingsService, BusinessSettings } from './settings.service';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get business profile settings' })
  @ApiResponse({ status: 200, description: 'Business settings returned' })
  getSettings(): BusinessSettings {
    return this.settingsService.getSettings();
  }
}
