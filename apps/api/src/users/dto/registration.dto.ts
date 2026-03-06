import { createZodDto } from '@anatine/zod-nestjs';
import { RegistrationSchema } from '@packages/validation';

export class RegistrationDto extends createZodDto(RegistrationSchema) {}
