'use client';

import { developers } from '@/data';
import { cn } from '@/utils';
import { Navbar, NavbarContent, NavbarItem } from '@heroui/react';

import { DeveloperItem } from './DeveloperItem';

interface HeaderProps {
  className?: string;
}

export const Footer = ({ className }: HeaderProps) => {
  return (
    <footer className={cn(className)}>
      <Navbar>
        <NavbarContent>
          <NavbarItem>
            {developers.map((developer) => (
              <div key={developer.name}>
                <DeveloperItem
                  developer={{
                    name: developer.name,
                    avatar: developer.avatar,
                    git: developer.git,
                  }}
                />
              </div>
            ))}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </footer>
  );
};
