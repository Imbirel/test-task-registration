import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, type RegistrationData } from '@packages/validation';
import { Outlet } from 'react-router';
import type { BaseSyntheticEvent } from 'react';
import { Form } from '@/shared/ui/form';
import { Typography } from '@/shared/ui/typography';

export const RegistrationPage = () => {
  const methods = useForm<RegistrationData>({
    resolver: zodResolver(RegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      accepted: false as unknown as true,
      name: '',
      password: '',
    },
  });

  const onSubmit = (e?: BaseSyntheticEvent) => {
    void methods.handleSubmit((data) => {
      console.log('Final Submit', data);
    })(e);
  };

  return (
    <div className="w-134 px-17 py-14 bg-background-secondary shadow-lg rounded-[48px]">
      <Typography variant="h1" className="mb-6 text-center">
        Регистрация
      </Typography>

      <Form {...methods}>
        <form onSubmit={onSubmit}>
          <Outlet />
        </form>
      </Form>

      <div className="mt-2 text-center">
        <Typography variant="label" as="p">
          Возник вопрос или что-то сломалось?
        </Typography>
        <Typography variant="label" as="p">
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-primary underline-offset-4 hover:underline"
          >
            Вступай в чат и задавай вопрос
          </a>
        </Typography>
      </div>
    </div>
  );
};
