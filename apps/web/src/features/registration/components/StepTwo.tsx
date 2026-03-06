import { useUsersControllerCreate } from '@/shared/api/generated/users/users';
import { Button } from '@/shared/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import type { RegistrationData } from '@packages/validation';
import type { AxiosError } from 'axios';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const StepTwo = () => {
  const { control, handleSubmit } = useFormContext<RegistrationData>();
  const navigate = useNavigate();

  const { mutate, isPending } = useUsersControllerCreate({
    mutation: {
      onSuccess: () => {
        console.log('Успешная регистрация!');
        void navigate('/userslist');
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        const message = error.response?.data.message ?? 'Ошибка сервера';
        alert(`Ошибка: ${message}`);
      },
    },
  });

  const onSubmit = (data: RegistrationData) => {
    console.log('Данные из формы:', data);
    mutate({ data });
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Имя</FormLabel>
            <FormControl>
              <Input placeholder="Введи имя" {...field} disabled={isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Пароль</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Введи пароль" {...field} disabled={isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        className="w-full"
        size="lg"
        variant="secondary"
        onClick={() => {
          void navigate(-1);
        }}
        disabled={isPending}
      >
        Вернуться
      </Button>
      <Button
        className="w-full"
        size="lg"
        onClick={() => {
          void handleSubmit(onSubmit)();
        }}
        disabled={isPending}
      >
        {isPending ? 'Загрузка...' : 'Войти'}
      </Button>
    </div>
  );
};
