import { cn } from '@/lib/utils/cn';

export function StatsCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className={cn('rounded-2xl bg-ink-muted p-6', className)}>
      <div className="text-sm uppercase tracking-wide text-white/60">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold">{value}</div>
    </div>
  );
}
