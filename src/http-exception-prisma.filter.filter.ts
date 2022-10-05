import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class HttpExceptionPrismaFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let code;
    let message;
    switch (exception.code) {
      case 'P2025':
        code = 404;
        message = 'Object with this id was not found';
        break;
      case 'P2002':
        code = 409;
        message =
          'There is already an object with this field- ' +
          Object.values(exception.meta);
        break;
      case 'P2003':
        code = 404;
        message =
          'Object with this id was not found- ' + Object.values(exception.meta);
        break;
      default:
        code = 400;
        message = exception.message;
    }

    response.status(code).json({
      statusCode: code,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
