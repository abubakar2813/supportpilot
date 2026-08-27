import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

function resolveFrontendDist(): string {
  const candidates = [
    join(process.cwd(), 'frontend', 'dist'),
    join(__dirname, '..', '..', '..', 'frontend', 'dist'),
    join(__dirname, '..', '..', 'frontend', 'dist'),
    join(__dirname, '..', 'frontend', 'dist'),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  // Default to cwd path even if it doesn't exist, so error messages are useful
  return candidates[0];
}

const STATIC_ROOT = resolveFrontendDist();

@Controller()
export class StaticController {
  @Get()
  root(@Res() res: Response) {
    const file = join(STATIC_ROOT, 'index.html');
    if (existsSync(file)) {
      return res.sendFile(file);
    }
    return res.status(404).json({
      error: 'index.html not found',
      resolvedPath: file,
      cwd: process.cwd(),
      dirname: __dirname,
    });
  }

  @Get('assets/*')
  assets(@Req() req: Request, @Res() res: Response) {
    const assetPath = req.params[0];
    const file = join(STATIC_ROOT, 'assets', assetPath);

    if (existsSync(file)) {
      return res.sendFile(file);
    }
    return res.status(404).json({
      error: 'Asset not found',
      asset: assetPath,
      resolvedPath: file,
    });
  }
}
