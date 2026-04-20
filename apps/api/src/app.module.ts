import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '#common/configs/env.validation';
import { UsersModule } from '#users/users.module';
import { PrismaModule } from '#prisma/prisma.module';
import { LoggerMiddleware } from '#common/middleware/logger.middleware';
import { EnvModule } from '#common/configs/env.module';

@Module({
  imports: [EnvModule, PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
