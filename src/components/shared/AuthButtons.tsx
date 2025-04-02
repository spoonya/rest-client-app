'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/utils';

import { AppRoutes } from '@/services';
import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';

interface AuthButtonsProps {
  className?: string;
}

export function AuthButtons({className}:AuthButtonsProps) {
  const t = useTranslations('Navigation');
  

  return (
    
  <Navbar className={cn(className)}>
    <NavbarContent justify='center' className='bg-inherit'>

<NavbarItem className="lg:flex">
      <Link href={AppRoutes.SIGN_IN}>{t('Sign In')}</Link>
    </NavbarItem><NavbarItem>
        <Button
          as={Link}
          color="primary"
          href={AppRoutes.SIGN_UP}
          variant="flat"
        >
          {t('Sign Up')}
        </Button>
</NavbarItem>
    </NavbarContent>
  </Navbar>

     )
}
