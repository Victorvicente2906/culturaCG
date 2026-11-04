import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  tone?: 'success' | 'warning' | 'danger' | 'neutral' | 'info';
};

export default function Badge({ children, tone = 'neutral' }: BadgeProps) {
  const tones = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    neutral: 'bg-slate-100 text-slate-700',
    info: 'bg-violet-100 text-violet-700',
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
