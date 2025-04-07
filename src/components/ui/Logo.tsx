import Image from 'next/image';

import { cn } from '@/utils';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: Readonly<LogoProps>) => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={100}
      height={100}
      className={cn(className)}
    />
  );
};
