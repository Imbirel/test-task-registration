import { useUsersControllerCreate } from '@/shared/api/generated/users/users';
import type { RegistrationData } from '@packages/validation';
import type { AxiosError } from 'axios';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const StepTwo = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<RegistrationData>();

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
      <div>
        <input {...register('name')} placeholder="Имя" className="border p-2 w-full" disabled={isPending} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Пароль"
          className="border p-2 w-full"
          disabled={isPending}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            void navigate(-1);
          }}
          disabled={isPending}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={() => {
            void handleSubmit(onSubmit)();
          }}
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          {isPending ? 'Загрузка...' : 'Войти'}
        </button>
      </div>
    </div>
  );
};
