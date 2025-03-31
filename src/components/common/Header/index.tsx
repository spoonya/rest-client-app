import cn from 'classnames';

import classes from './header.module.css';
import Navigation from '../Navigation/Navigation';

interface HeadeProps {
  className?: string;
}

export const Header = ({ className }: HeadeProps) => {
  return <header className={cn(classes.header, className)}><Navigation/></header>;
};
