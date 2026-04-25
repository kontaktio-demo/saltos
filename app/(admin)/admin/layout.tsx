import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/navigation/admin-sidebar';

/**
 * Admin layout — sidebar + content area.
 * Auth enforcement happens in `middleware.ts`.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  );
}
