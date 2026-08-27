import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { existsSync } from 'fs';
import { ChatModule } from './modules/chat/chat.module';
import { EmailModule } from './modules/email/email.module';
import { HealthModule } from './modules/health/health.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ServeStaticModule.forRoot({
      // Vercel/serverless: files are at /var/task/frontend/dist
      // Local: files are at <project-root>/frontend/dist
      rootPath: existsSync(join(process.cwd(), 'frontend', 'dist'))
        ? join(process.cwd(), 'frontend', 'dist')
        : join(__dirname, '..', 'frontend', 'dist'),
      serveRoot: '/',
    }),
    HealthModule,
    SettingsModule,
    ChatModule,
    EmailModule,
  ],
})
export class AppModule {}
