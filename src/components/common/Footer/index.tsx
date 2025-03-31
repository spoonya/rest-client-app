'use client'

import cn from 'classnames';
import classes from './footer.module.css';
import { Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import { users } from './constants';
import { UserItem } from '../User';

interface HeaderProps {
  className?: string;
}

export const Footer = ({ className }: HeaderProps) => {
  return <footer className={cn(classes.footer, className)}>
    <Navbar>
      <NavbarContent>
        <NavbarItem>
          {users.map((user)=> (
            <div key={user.name}>

              <UserItem user={{
                name: user.name,
                avatar: user.avatar,
                git: user.git
              }}/>
            </div>
          ))}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  </footer>;
};