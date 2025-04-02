import { Footer, Header } from '@/components';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className='h-full'>

      {children}
      </main>
      <Footer />
    </div>
  );
}
