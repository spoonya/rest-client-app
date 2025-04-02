'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

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
import { useAuth } from '@/hooks';
import { supabase } from '@/lib';
import { AuthButtons } from './AuthButtons';

export function Navigation() {
  const t = useTranslations('Navigation');
  const segment = useSelectedLayoutSegment();
  const user = useAuth();
  const router = useRouter()
  const handleLogout = () => {
    supabase.auth.signOut();
    router.replace(AppRoutes.HOME)
  }

  return (
    <Navbar>
      <NavbarBrand className="w-40">
        <Link href={AppRoutes.HOME}>
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem className="w-full">
          <LocaleSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {(segment === (AppRoutes.SIGN_IN).slice(1) || segment === (AppRoutes.SIGN_UP).slice(1) || user)? (
          <><NavbarItem>
            <Link href={AppRoutes.HOME}>{t('home')}</Link>
          </NavbarItem><NavbarItem>
          <Button
            as={Link}
            color="primary"
            variant="flat"
            onPress={handleLogout}
          >
            {t('Sign Out')}
          </Button>
            </NavbarItem></>
        ): 
       (<AuthButtons className='bg-inherit'/>
      //  <>
      //  <NavbarItem className="lg:flex">
      //   <Link href={AppRoutes.SIGN_IN}>{t('Sign In')}</Link>
      // </NavbarItem><NavbarItem>
      //     <Button
      //       as={Link}
      //       color="primary"
      //       href={AppRoutes.SIGN_UP}
      //       variant="flat"
      //     >
      //       {t('Sign Up')}
      //     </Button>
      //   </NavbarItem></>
        )}
      </NavbarContent>
    </Navbar>
  );
}
