import { cn } from '@/utils';

import { Navigation } from './Navigation';

interface HeadeProps {
  className?: string;
}

export const Header = ({ className }: HeadeProps) => {
  return (
    <header className={cn(className)}>
      <Navigation />
    </header>
  );
};
