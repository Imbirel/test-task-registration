import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { RegistrationData } from '@packages/validation';
import { Button } from '@/shared/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Checkbox } from '@/shared/ui/checkbox';

export const StepOne = () => {
  const { control, trigger } = useFormContext<RegistrationData>();
  const navigate = useNavigate();

  const handleNext = () => {
    void (async () => {
      const isValid = await trigger(['email', 'accepted']);
      if (isValid) {
        void navigate('/registration/step-2');
      }
    })();
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Корпоративный e-mail</FormLabel>
            <FormControl>
              <Input placeholder="Введи почту" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="accepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              {/* Добавляем mt-1, чтобы чекбокс был на уровне первой строки текста */}
              <div>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </div>
            </FormControl>
            <FormLabel>
              <div>
                Я подтверждаю согласие с{' '}
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  политикой конфиденциальности
                </a>
                <FormMessage className="mt-1" />
              </div>
            </FormLabel>
          </FormItem>
        )}
      />

      <Button className="w-full" size="lg" onClick={handleNext}>
        Продолжить
      </Button>
      <Button className="w-full" size="lg" variant="secondary" disabled>
        Войти
      </Button>
    </div>
  );
};
