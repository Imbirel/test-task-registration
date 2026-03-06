import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, type RegistrationData } from '@packages/validation';
import { Outlet } from 'react-router';
import type { BaseSyntheticEvent } from 'react';

export const RegistrationPage = () => {
  const methods = useForm<RegistrationData>({
    resolver: zodResolver(RegistrationSchema),
    mode: 'onChange',
  });

  const onSubmit = (e?: BaseSyntheticEvent) => {
    void methods.handleSubmit((data) => {
      console.log('Final Submit', data);
    })(e);
  };

  return (
    <div className="w-134 h-127 mx-auto mt-10 px-17 py-14 bg-white shadow-lg rounded-[48px]">
      <h1 className="text-[44px] leading-11 font-semibold mb-6 text-center">Регистрация</h1>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Outlet />
        </form>
      </FormProvider>

      <div>
        <p>Возник вопрос или что-то сломалось?</p>
        <p>Вступай в чат и задавай вопрос</p>
      </div>
    </div>
  );
};
