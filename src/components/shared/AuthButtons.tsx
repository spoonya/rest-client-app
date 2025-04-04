'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/utils';

import { AppRoutes } from '@/services';
import {
  Button,
  Link,
} from '@heroui/react';



interface AuthButtonsProps {
  className?: string;
}

export function AuthButtons({ className }: AuthButtonsProps) {
  const t = useTranslations('Navigation');

  return (

    <nav className={cn(className, 'w-[200px]')}>
    <ul  className='flex items-center justify-between'>

<li className="lg:flex">
<Button
          as={Link}
          color="primary"
          href={AppRoutes.SIGN_IN}
          variant="flat"
          className='hover:bg-slate-500 hover:text-white text-inherit !duration-500 shadow-lg shadow-slate-700'
        >
          {t('Sign In')}
        </Button>
      {/* <Link href={AppRoutes.SIGN_IN}>{t('Sign In')}</Link> */}
    </li><li>
        <Button
          as={Link}
          color="primary"
          href={AppRoutes.SIGN_UP}
          variant="flat"
          className='hover:bg-slate-500 hover:text-white text-inherit !duration-500 shadow-lg shadow-slate-700'
        >
          {t('Sign Up')}
        </Button>
</li>
    </ul>
  </nav>

    
//   <Navbar className={cn(className)}>
//     <NavbarContent justify='center' className='bg-inherit'>

// <NavbarItem className="lg:flex">
// <Button
//           as={Link}
//           color="primary"
//           href={AppRoutes.SIGN_IN}
//           variant="flat"
//         >
//           {t('Sign In')}
//         </Button>
//       {/* <Link href={AppRoutes.SIGN_IN}>{t('Sign In')}</Link> */}
//     </NavbarItem><NavbarItem>
//         <Button
//           as={Link}
//           color="primary"
//           href={AppRoutes.SIGN_UP}
//           variant="flat"
//         >
//           {t('Sign Up')}
//         </Button>
// </NavbarItem>
//     </NavbarContent>
//   </Navbar>

     )
}
