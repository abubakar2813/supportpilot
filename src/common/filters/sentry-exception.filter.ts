import { Catch, ArgumentsHost, HttpException, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryExceptionFilter extends BaseExceptionFilter {
  constructor(applicationRef?: HttpServer) {
    super(applicationRef);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    // Only report non-HTTP exceptions to Sentry, or 5xx HTTP errors
    if (
      !(exception instanceof HttpException) ||
      (exception instanceof HttpException && exception.getStatus() >= 500)
    ) {
      Sentry.captureException(exception);
    }

    // If BaseExceptionFilter was not given an adapter (e.g. missing SENTRY_DSN
    // or registration race), let the default exception handler take over.
    if (!this.applicationRef) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      if (response && typeof response.status === 'function') {
        return response.status(500).json({
          statusCode: 500,
          message: 'Internal server error',
        });
      }
      return;
    }

    super.catch(exception, host);
  }
}
