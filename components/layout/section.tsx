import { cn } from '@/lib/utils/cn';

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      {children}
    </section>
  );
}
