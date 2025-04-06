import { cn } from '@/utils';

interface DefaultLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function DefaultLayout({ children, className }: DefaultLayoutProps) {
  return (
    <main className={cn('min-h-screen', className)}>
    
      {children}
    
    </main>
  );
}
