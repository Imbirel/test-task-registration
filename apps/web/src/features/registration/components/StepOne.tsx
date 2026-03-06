import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { RegistrationData } from '@packages/validation';

export const StepOne = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<RegistrationData>();
  const navigate = useNavigate();

  const handleNext = () => {
    void (async () => {
      const isEmailValid = await trigger('email');
      if (isEmailValid) {
        void navigate('/registration/step-2');
      }
    })();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Корпоративный e-mail</label>
        <input
          {...register('email')}
          placeholder="Введи почту"
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <button type="button" onClick={handleNext} className="w-full bg-brand text-white py-2 rounded">
        Продолжить
      </button>
    </div>
  );
};
