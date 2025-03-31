import { cn } from '@/utils';

import { Container } from '../../ui';

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
