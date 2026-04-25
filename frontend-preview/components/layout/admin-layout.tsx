import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/navigation/admin-sidebar';

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
