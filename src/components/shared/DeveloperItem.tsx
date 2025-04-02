'use client';

import { DeveloperInfo } from '@/types';
import { Link, User } from '@heroui/react';

interface FooterProps {
  developer: DeveloperInfo;
  className?: string;
}

export const DeveloperItem = ({ developer }: FooterProps) => {
  return (
    <User
      avatarProps={{
        src: developer.avatar,
      }}
      description={
        <Link isExternal href={developer.git} size="sm">
          {developer.gitName}
        </Link>
      }
      name={developer.name}
    />
  );
};
