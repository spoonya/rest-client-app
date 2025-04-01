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
    <Navbar>
      <NavbarContent justify='center'>
      {protected_menu.map((item)=> (
        <NavbarItem key={item.name}>
          <Link href={item.link}>{t(item.name)}</Link>
        </NavbarItem>
      ))}
      </NavbarContent>
    </Navbar>
  );
}
