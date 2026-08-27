import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check API health status' })
  @ApiResponse({ status: 200, description: 'API is healthy' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('sentry-test')
  @ApiOperation({ summary: 'Trigger a test error for Sentry' })
  @ApiResponse({ status: 500, description: 'Test error triggered' })
  sentryTest() {
    throw new InternalServerErrorException('Intentional Sentry test error');
  }
}
