// import cn from 'classnames';
import {User, Link} from "@heroui/react";
// import classes from './footer.module.css';
import  { UserType} from '@/types';


interface FooterProps {
  user: UserType,
  className?: string;
}

export const UserItem = ({ user }: FooterProps) => {
  return (
    <User
      avatarProps={{
        src: user.avatar,
      }}
      description={
        <Link isExternal href={user.git} size="sm">
          {user.git}
        </Link>
      }
      name={user.name}
    />
  );
};