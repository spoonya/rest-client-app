'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import { useAuth } from '@/hooks';
import { supabase } from '@/lib';
import { AppRoutes } from '@/services';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';

import { Logo } from '../ui';
import { AuthButtons } from './AuthButtons';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navigation() {
  const t = useTranslations('Navigation');
  const segment = useSelectedLayoutSegment();
  const user = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    supabase.auth.signOut();
    router.replace(AppRoutes.HOME);
  };

  return (
    <Navbar
      maxWidth="full"
      className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent"
      shouldHideOnScroll={false}
    >
      <NavbarBrand className="gap-2 max-w-fit">
        <Link
          href={AppRoutes.HOME}
          className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
        >
          <Logo className="h-16 w-16" />
          <span className="font-semibold text-slate-700">Apicorn</span>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <LocaleSwitcher />
        </NavbarItem>

        {segment === AppRoutes.SIGN_IN.slice(1) ||
        segment === AppRoutes.SIGN_UP.slice(1) ||
        user ? (
          <>
            <NavbarItem>
              <Link
                href={AppRoutes.HOME}
                className="px-3 py-2 text-slate-600 hover:text-blue-600 transition-all duration-300 ease-in-out"
              >
                {t('home')}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-red-600 hover:text-red-700 transition-all duration-300 ease-in-out"
              >
                {t('Sign Out')}
              </button>
            </NavbarItem>
          </>
        ) : (
          <AuthButtons />
        )}
      </NavbarContent>
    </Navbar>
  );
}
