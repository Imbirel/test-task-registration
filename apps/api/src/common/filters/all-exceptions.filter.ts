import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { EnvService } from '#common/configs/env.service';

/**
 * Утилитарный type guard для HttpException
 */
function isHttpException(exception: unknown): exception is HttpException {
  return exception instanceof HttpException;
}

/**
 * Утилитарный type guard для стандартной Error
 */
function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}

/**
 * Type guard для объекта ответа HttpException
 */
function isHttpExceptionResponseObject(
  response: unknown,
): response is Record<string, unknown> {
  return typeof response === 'object' && response !== null;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  private readonly INTERNAL_ERROR_MESSAGE = 'Internal server error';

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly env: EnvService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    if (!httpAdapter) {
      this.logger.warn('HTTP adapter is not available, rethrowing exception.');
      throw exception;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const httpStatus = isHttpException(exception)
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseMessage = this.extractMessage(exception);

    const requestUrlRaw: unknown = httpAdapter.getRequestUrl(request);
    const path = typeof requestUrlRaw === 'string' ? requestUrlRaw : '';

    const messageString =
      typeof responseMessage === 'string'
        ? responseMessage
        : JSON.stringify(responseMessage);

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path,
      message:
        httpStatus >= 500 && this.env.isProduction
          ? this.INTERNAL_ERROR_MESSAGE
          : messageString,
    };

    if (httpStatus >= 500) {
      const method = request.method;
      const url = request.url;
      let errorDetail: string;

      if (isError(exception)) {
        errorDetail = exception.stack ?? exception.message;
      } else {
        errorDetail = String(exception);
      }

      this.logger.error(`[${method}] ${url} ${httpStatus} - ${errorDetail}`);
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }

  /**
   * Извлечение читаемого сообщения из исключения.
   */
  private extractMessage(exception: unknown): string | object {
    if (isHttpException(exception)) {
      const response: unknown = exception.getResponse();

      if (typeof response === 'string') {
        return response;
      }

      if (isHttpExceptionResponseObject(response)) {
        if ('message' in response) {
          const msg = response['message'];
          if (typeof msg === 'string' || Array.isArray(msg)) {
            return msg;
          }
          if (typeof msg === 'object' && msg !== null) {
            return msg;
          }
        }
        return response;
      }

      return String(response);
    }

    if (isError(exception)) {
      return exception.message;
    }

    return 'Internal server error';
  }
}
