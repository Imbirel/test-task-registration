import { z } from 'zod';

export const RegistrationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Обязательное поле')
    .email('Некорректный формат email')
    .describe('Email пользователя'),
  accepted: z.literal(true, {
    error: 'Необходимо согласие',
  }),
  name: z.string().trim().min(1, 'Обязательное поле').max(50, 'Имя слишком длинное').describe('Имя пользователя'),
  password: z
    .string()
    .min(1, 'Обязательное поле')
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+=\-{}\[\]|:;"'<>,.?/]+$/, 'Только латиница')
    .min(6, 'Пароль не короче 6 символов')
    .describe('Пароль'),
});

export type RegistrationData = z.infer<typeof RegistrationSchema>;
