import cn from 'classnames';

import classes from './header.module.scss';

interface HeadeProps {
  className?: string;
}

export const Header = ({ className }: HeadeProps) => {
  return <h1 className={cn(classes.header, className)}>Header</h1>;
};
