import { cn } from '@/utils';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: Readonly<LogoProps>) => {
  return <div className={cn(className)}>Logo</div>;
};
