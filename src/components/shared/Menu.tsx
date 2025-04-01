'use client';

import { useTranslations } from 'next-intl';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import { protected_menu } from '@/data';

export function Menu() {
  const t = useTranslations('Menu');

  return (
    <div className='flex items-center justify-center'>
    <Navbar className='px-10 max-w-lg rounded-xl bg-slate-50'>
      <NavbarContent className='w-full' justify='center'>
      {protected_menu.map((item)=> (
        <NavbarItem key={item.name} className='px-5'>
          <Link href={item.link}>{t(item.name)}</Link>
        </NavbarItem>
      ))}
      </NavbarContent>
    </Navbar>
    </div>
  );
}
