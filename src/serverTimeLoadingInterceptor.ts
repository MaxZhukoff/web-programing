import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class serverTimeLoadingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const startTimestamp = performance.now();
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const endTimestamp = performance.now();
        response.cookie(
          'server-loading-time',
          ((endTimestamp - startTimestamp) / 1000).toFixed(4).toString(),
        );
        return data;
      }),
    );
  }
}
