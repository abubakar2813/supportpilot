/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/bootstrap';

let cachedApp: any;

async function bootstrap() {
  console.log('[Vercel] Bootstrapping NestJS app...');
  const app = await NestFactory.create(AppModule, { logger: false });
  console.log('[Vercel] NestJS app created');
  await configureApp(app);
  console.log('[Vercel] App configured');
  await app.init();
  console.log('[Vercel] App initialized');
  return app;
}

export default async (req: any, res: any) => {
  console.log('[Vercel] Request received:', req.method, req.url);

  // Lightweight ping endpoint to verify the handler is reachable
  if (req.url === '/api/ping' || req.url === '/ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  try {
    if (!cachedApp) {
      cachedApp = await bootstrap();
    }

    const instance = cachedApp.getHttpAdapter().getInstance();
    console.log('[Vercel] Passing request to Express app');

    // Add a safety timeout so we can see if Express never responds
    const timer = setTimeout(() => {
      console.error('[Vercel] Express did not respond within 8s');
      if (!res.headersSent) {
        res.statusCode = 504;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Express handler timeout' }));
      }
    }, 8000);

    res.on('finish', () => {
      clearTimeout(timer);
      console.log('[Vercel] Response finished:', res.statusCode);
    });

    instance(req, res);
  } catch (error) {
    console.error('[Vercel] Handler error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ statusCode: 500, message: 'Internal server error' }));
  }
};
