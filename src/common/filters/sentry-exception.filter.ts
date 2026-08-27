import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryExceptionFilter extends BaseExceptionFilter {
  constructor(adapterHost: HttpAdapterHost) {
    super(adapterHost.httpAdapter);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    // Only report non-HTTP exceptions to Sentry, or 5xx HTTP errors
    if (
      !(exception instanceof HttpException) ||
      (exception instanceof HttpException && exception.getStatus() >= 500)
    ) {
      Sentry.captureException(exception);
    }

    super.catch(exception, host);
  }
}
