/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/bootstrap';

const express = require('express');
const serverless = require('serverless-http');

const expressApp = express();
let cachedHandler: any;

async function bootstrap() {
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  await configureApp(app);
  await app.init();
  return expressApp;
}

export default async (req: any, res: any) => {
  if (!cachedHandler) {
    const app = await bootstrap();
    cachedHandler = serverless(app);
  }
  return cachedHandler(req, res);
};
