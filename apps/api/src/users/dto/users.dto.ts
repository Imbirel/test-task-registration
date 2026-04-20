import { createZodDto } from 'nestjs-zod';
import {
  CreateUserSchema,
  PaginationQuerySchema,
  UserResponseSchema,
} from '@packages/validation';

export class CreateUserDto extends createZodDto(CreateUserSchema) {}

export class UserResponseDto extends createZodDto(UserResponseSchema) {}

export class PaginationQueryDto extends createZodDto(PaginationQuerySchema) {}
