import Image from 'next/image';

import { cn } from '@/utils';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: Readonly<LogoProps>) => {
  return (
    <Image
      src="/logo.svg"
      alt="Apicorn"
      width={40}
      height={40}
      className={cn(className)}
    />
  );
};
