import { Footer, Header } from '@/components/shared';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn('min-h-screen', 'page')}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
