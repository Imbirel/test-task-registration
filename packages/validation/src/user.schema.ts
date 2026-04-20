import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z
    .string()
    .trim()
    .min(1, 'Обязательное поле')
    .email('Некорректный формат email')
    .toLowerCase()
    .describe('Email пользователя'),
  name: z.string().trim().min(1, 'Обязательное поле').max(50, 'Имя слишком длинное').describe('Имя пользователя'),
  password: z
    .string()
    .regex(/^[ -~]+$/, 'Только латиница и спецсимволы')
    .min(6, 'Пароль не короче 6 символов')
    .max(100, 'Слишком длинный пароль')
    .describe('Пароль'),
  createdAt: z.preprocess((val) => (val instanceof Date ? val.toISOString() : val), z.string()),
  updatedAt: z.preprocess((val) => (val instanceof Date ? val.toISOString() : val), z.string()),
});
export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export const UserResponseSchema = UserSchema.omit({
  password: true,
});
export type UserResponse = z.infer<typeof UserResponseSchema>;

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const RegistrationFormSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
}).extend({
  accepted: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие',
  }),
});
export type RegistrationForm = z.infer<typeof RegistrationFormSchema>;
