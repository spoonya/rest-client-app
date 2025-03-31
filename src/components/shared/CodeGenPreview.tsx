import { cn } from '@/utils';

interface CodeGenPreviewProps {
  className?: string;
}

export const CodeGenPreview = ({ className }: CodeGenPreviewProps) => {
  return <div className={cn(className)}>CodeGenPreview</div>;
};
