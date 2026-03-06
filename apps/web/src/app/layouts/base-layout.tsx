import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router';

export function BaseLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>

      <main className='flex-1 flex flex-col max-w-content mx-auto px-4 w-full'>
        <Outlet />
      </main>
    </div>
  );
}
