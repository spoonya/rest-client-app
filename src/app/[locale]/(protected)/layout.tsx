// import { Footer, Header, Menu } from '@/components';
'use client'
import { cn } from '@/utils';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn('min-h-screen', 'page')}>
     {children}
    </main>
  );
}
