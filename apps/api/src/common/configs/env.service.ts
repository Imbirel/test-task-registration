import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.validation.js';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get nodeEnv() {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  get port() {
    return this.configService.get('PORT', { infer: true });
  }

  get isProduction() {
    return this.nodeEnv === 'production';
  }

  get allowedOrigins() {
    return this.configService.get('ALLOWED_ORIGINS', { infer: true });
  }

  get databaseUrl() {
    return this.configService.get('DATABASE_URL', { infer: true });
  }
}
