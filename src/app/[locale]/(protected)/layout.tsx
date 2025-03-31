import { redirect } from 'next/navigation';

import { Footer, Header } from '@/components/shared';
import { isAuthenticated } from '@/lib';
import { AppRoutes } from '@/services';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const user = isAuthenticated();
  if (!user) redirect(AppRoutes.SIGN_IN);

  return (
    <main className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
