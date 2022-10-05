import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { serverTimeLoadingInterceptor } from './serverTimeLoadingInterceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { HttpExceptionPrismaFilter } from './http-exception-prisma.filter.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  app.use(cookieParser());
  app.useGlobalInterceptors(new serverTimeLoadingInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Clinic example')
    .setDescription('The clinic API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionPrismaFilter());
  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
