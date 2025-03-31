import { cn } from '@/utils';

interface SignUpFormProps {
  className?: string;
}

export const SignUpForm = ({ className }: Readonly<SignUpFormProps>) => {
  return <div className={cn(className)}>SignUpForm</div>;
};
