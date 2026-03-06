import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { RegistrationPage } from '../pages/RegistrationPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { UsersListPage } from '../pages/UsersListPage';
import { StepOne } from '../features/registration/components/StepOne';
import { StepTwo } from '../features/registration/components/StepTwo';
import { BaseLayout } from '@/app/layouts/base-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Navigate to="/registration" replace />} />
          <Route path="/registration" element={<RegistrationPage />}>
            <Route index element={<Navigate to="step-1" replace />} />
            <Route path="step-1" element={<StepOne />} />
            <Route path="step-2" element={<StepTwo />} />
          </Route>
          <Route path="/userslist" element={<UsersListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
