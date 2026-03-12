import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'cyan' | 'lime' | 'gray';
  className?: string;
}

const variants = {
  primary: 'bg-blue-100 text-[#045CB4]',
  cyan: 'bg-cyan-100 text-cyan-700',
  lime: 'bg-lime-100 text-lime-700',
  gray: 'bg-slate-100 text-slate-600',
};

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
