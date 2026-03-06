import { Logo } from '@/shared/assets/logo';
import { MenuIcon } from '@/shared/assets/menu-icon';
import { NotificationsIcon } from '@/shared/assets/notifications-icon';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router';

export function Header() {
  return (
    <header className="w-full h-18 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-content mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo className="text-primary" />
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <NotificationsIcon className="size-8" />
          </Button>
          <Button variant="ghost" size="icon">
            <MenuIcon className="size-8" />
          </Button>
        </div>
      </div>
    </header>
  );
}
