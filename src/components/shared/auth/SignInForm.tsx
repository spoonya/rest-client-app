import { cn } from '@/utils';

interface SignInFormProps {
  className?: string;
}

export const SignInForm = ({ className }: Readonly<SignInFormProps>) => {
  return <div className={cn(className)}>SignInForm</div>;
};
