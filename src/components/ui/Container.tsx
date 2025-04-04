import { cn } from '@/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({
  children,
  className,
}: Readonly<ContainerProps>) => {
  return <div className={cn('mx-auto px-6 w-full', className)}>{children}</div>;
};
