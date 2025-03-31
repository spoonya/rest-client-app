import { Container } from '@/components/ui';
import { cn } from '@/utils';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: Readonly<FooterProps>) => {
  return (
    <footer className={cn(className)}>
      <Container>Footer</Container>
    </footer>
  );
};
