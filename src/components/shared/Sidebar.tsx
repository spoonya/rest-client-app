import { cn } from '@/utils';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn('w-16 h-full border-r-4 bo', className)}>sidebar</div>
  );
};
