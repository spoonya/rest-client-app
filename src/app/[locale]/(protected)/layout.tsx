import { cn } from '@/utils';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn('min-h-screen h-screen', 'page')}>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </main>
  );
}
