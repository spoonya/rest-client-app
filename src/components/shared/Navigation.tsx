'use client';

import { useTranslations } from 'next-intl';
import { useSelectedLayoutSegment } from 'next/navigation';

import { AppRoutes } from '@/services';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';

import { Logo } from '../ui';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navigation() {
  const t = useTranslations('Navigation');
  const segment = useSelectedLayoutSegment();
  console.log(segment);

  return (
    <Navbar>
      <NavbarBrand className="w-40">
        <Logo />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem className="w-full">
          <LocaleSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link href={AppRoutes.SIGN_IN}>{t('Sign In')}</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href={AppRoutes.SIGN_UP}
            variant="flat"
          >
            {t('Sign Up')}
          </Button>
        </NavbarItem>
        {segment === AppRoutes.AUTH && (
          <NavbarItem>
            <Link href="#">{t('Sign Out')}</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
