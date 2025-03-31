import { redirect } from 'next/navigation';

import { Footer, Header } from '@/components/shared';
import { isAuthenticated } from '@/lib';
import { AppRoutes } from '@/services';
import { cn } from '@/utils';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = isAuthenticated();
  if (!user) redirect(AppRoutes.SIGN_IN);

  return (
    <main className={cn('min-h-screen', 'page')}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
