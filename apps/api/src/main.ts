import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ZodValidationPipe, patchNestjsSwagger } from '@anatine/zod-nestjs';
import { PrismaClientExceptionFilter } from '#common/filters/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { Env } from '#common/configs/env.validation';
import { TransformInterceptor } from '#common/interceptors/transform.interceptor';
import { AppModule } from '#app.module';
import { EnvService } from '#common/configs/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const env = app.get(EnvService);
  const port = env.port;
  const origins = env.allowedOrigins;

  app.use(helmet());
  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  patchNestjsSwagger();
  const config = new DocumentBuilder()
    .setTitle('Registration API')
    .setDescription('API для регистрации пользователей')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableShutdownHooks();
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
