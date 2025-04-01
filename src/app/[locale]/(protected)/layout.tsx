import { Footer, Header, Menu } from '@/components';
import { cn } from '@/utils';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn('min-h-screen', 'page')}>
      <Header />
     <Menu/>
      {children}
      <Footer />
    </main>
  );
}
