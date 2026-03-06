import { useUsersControllerFindAll } from '@/shared/api/generated/users/users';
import type { AxiosError } from 'axios';
import type { RegistrationData } from '@packages/validation';

type UserItem = RegistrationData & { id: string | number };

export const UsersList = () => {
  const { data, isLoading, error } = useUsersControllerFindAll();
  const users = data as UserItem[] | undefined;

  if (isLoading) return <div>Загрузка...</div>;

  if (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return <div>Ошибка: {axiosError.response?.data.message ?? 'Не удалось загрузить список'}</div>;
  }

  if (!users || users.length === 0) return <div>Список пользователей пуст</div>;

  return (
    <ul className="space-y-2 p-4">
      {users.map((user: UserItem) => (
        <li key={String(user.id)} className="border-b pb-2">
          <span className="font-bold">{user.name}</span>
          <span className="text-gray-500 ml-2">({user.email})</span>
        </li>
      ))}
    </ul>
  );
};
