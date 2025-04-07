'use client';

import { useTranslations } from 'next-intl';

import { protected_menu } from '@/data';
import { Link, Navbar, NavbarContent, NavbarItem } from '@heroui/react';

export function Menu() {
  const t = useTranslations('Menu');

  return (
    <div className="flex items-center justify-center">
      <Navbar className="px-10 max-w-lg rounded-xl bg-inherit z-0">
        <NavbarContent className="w-full" justify="center">
          {protected_menu.map((item) => (
            <NavbarItem
              key={item.name}
              className="p-5 h-full shadow-lg shadow-slate-700 hover:bg-black hover:shadow-indigo-600 hover:text-sky-50 hover:cursor-pointer duration-300"
            >
              <Link
                href={item.link}
                className="text-blue-800 hover:text-sky-50"
              >
                {t(item.name)}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
