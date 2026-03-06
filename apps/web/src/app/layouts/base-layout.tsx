import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router';

export function BaseLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center max-w-content mx-auto px-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}
