'use client';

import { developers } from '@/data';
import { cn } from '@/utils';

import { DeveloperItem } from './DeveloperItem';
import Image from 'next/image';

import Link from 'next/link';

interface HeaderProps {
  className?: string;
}

export const Footer = ({ className }: HeaderProps) => {
  return (
    <footer className={cn(className)}>
      <div className="title flex items-center justify-around py-2">
        <Link href="https://github.com/spoonya/rest-client-app">GitHub</Link>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 </p>
        </div>
        <Link href="https://rs.school/courses/reactjs">
          <Image
            src="/ReactCourseLogo.svg"
            alt="ReactCourseLogo"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <hr />
      <div className="flex flex-col items-center justify-center ">
        <p className='title'>developers</p>
        <div className="flex flex-col items-center w-full gap-9 py-3">
          <div className="flex flex-wrap justify-center gap-6 px-40 sm:px-4">
            {developers.map((developer) => (
              <DeveloperItem key={developer.name} developer={developer} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
