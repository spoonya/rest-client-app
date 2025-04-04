'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import { AppRoutes } from '@/services';
import {
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
  const router = useRouter();
  const handleLogout = () => {
    supabase.auth.signOut();
    router.replace(AppRoutes.HOME);
  };

  return (
    <Navbar className='bg-inherit !text-inherit'>
      <NavbarBrand className="w-40">
        <Link href={AppRoutes.HOME}>
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem className="w-full" >
          <LocaleSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className='text-inherit'>
        {(segment === (AppRoutes.SIGN_IN).slice(1) || segment === (AppRoutes.SIGN_UP).slice(1) || user)? (
          <><NavbarItem className='shadow-lg shadow-slate-700 px-3 py-2 hover:bg-black hover:shadow-indigo-600 hover:cursor-pointer duration-300'>
            <Link href={AppRoutes.HOME} className='text-blue-800 hover:text-sky-50'>{t('home')}</Link>
          </NavbarItem><NavbarItem className='shadow-lg shadow-slate-700 px-3 py-2 hover:bg-black hover:shadow-indigo-600 hover:cursor-pointer duration-300'>
          <Link
          className='text-blue-800 hover:text-sky-50'
            onPress={handleLogout}
          >
            {t('Sign Out')}
          </Link>
          {/* <Button
            as={Link}
            color="primary"
            variant="flat"
            onPress={handleLogout}
          >
            {t('Sign Out')}
          </Button> */}
            </NavbarItem></>
        ): 
       (<AuthButtons className='bg-inherit text-inherit'/>

        )}
      </NavbarContent>
    </Navbar>
  );
}
