'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Container, Logo } from '@/components/ui';
import { useAuth } from '@/hooks';
import { AppRoutes } from '@/services';
import { cn } from '@/utils';
import { Button } from '@heroui/react';

import { LocaleSwitcher } from './LocaleSwitcher';

interface HeaderProsp {
  className?: string;
}

export const Header = ({ className }: Readonly<HeaderProsp>) => {
  const { user, logout } = useAuth();
  const t = useTranslations('auth');

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm',
        className
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 mx-auto">
          <Link href={AppRoutes.HOME}>
            <Logo />
          </Link>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />

            {user ? (
              <>
                <Button variant="bordered" onPress={logout}>
                  {t('logout')}
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button as={Link} href={AppRoutes.SIGN_IN} variant="bordered">
                  {t('sign-in')}
                </Button>
                <Button as={Link} href={AppRoutes.SIGN_UP}>
                  {t('sign-up')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
