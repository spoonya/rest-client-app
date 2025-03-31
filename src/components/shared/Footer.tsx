'use client';

import { developers } from '@/data/developers';
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
            {developers.map((user) => (
              <div key={user.name}>
                <DeveloperItem
                  developer={{
                    name: user.name,
                    avatar: user.avatar,
                    git: user.git,
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
