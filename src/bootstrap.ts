import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import compression from 'compression';
import { SentryExceptionFilter } from './common/filters/sentry-exception.filter';

export async function configureApp(app: INestApplication): Promise<INestApplication> {
  const isVercel = !!process.env.VERCEL;
  if (isVercel) console.log('[Vercel] configureApp start');

  const configService = app.get(ConfigService);

  // Security & performance middleware
  if (isVercel) console.log('[Vercel] Applying helmet...');
  app.use(helmet());
  // Compression can hang in serverless environments (e.g. Vercel), so skip it there.
  if (!isVercel) {
    app.use(compression());
  }
  if (isVercel) console.log('[Vercel] CORS enabled');
  app.enableCors();

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Sentry init
  const sentryDsn = configService.get<string>('SENTRY_DSN');
  if (sentryDsn) {
    if (isVercel) console.log('[Vercel] Initializing Sentry...');
    Sentry.init({
      dsn: sentryDsn,
      environment: configService.get<string>('NODE_ENV', 'development'),
      tracesSampleRate: 1.0,
    });
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new SentryExceptionFilter(httpAdapter));
    if (isVercel) console.log('[Vercel] Sentry initialized');
  }

  // Swagger docs
  if (isVercel) console.log('[Vercel] Setting up Swagger...');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SupportPilot API')
    .setDescription(
      'SupportPilot - AI customer support agent for small businesses. REST APIs for chat, email summaries, business settings and monitoring.',
    )
    .setVersion('1.0.0')
    .addTag('Health')
    .addTag('Settings')
    .addTag('Chat')
    .addTag('Email')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  if (isVercel) console.log('[Vercel] Swagger setup complete');

  return app;
}
