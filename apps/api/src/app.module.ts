import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from '#users/users.module';
import { PrismaModule } from '#prisma/prisma.module';
import { LoggerMiddleware } from '#common/middleware/logger.middleware';
import { AllExceptionsFilter } from '#common/filters/all-exceptions.filter';
import { PrismaClientExceptionFilter } from '#common/filters/prisma-client-exception.filter';
import { EnvModule } from '#common/configs/env.module';

@Module({
  imports: [EnvModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
