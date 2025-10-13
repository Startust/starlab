'use client';

import { Button } from '@/components/ui/button';
import { get, useApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const { data, isLoading } = useApi(
    '/me',
    () =>
      get<{ id: string; email: string; name: string }>('/api/me', { extra: { requireAuth: true } }),
    { toast: { loading: 'Loading profile…', error: true } },
  );

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </header>

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-sm font-semibold">Profile</h2>
        <div className="mt-3 text-sm">
          {isLoading ? (
            'Loading…'
          ) : (
            <ul className="space-y-1">
              <li>
                <b>Name:</b> {data?.name ?? user?.name}
              </li>
              <li>
                <b>Email:</b> {data?.email ?? user?.email}
              </li>
              <li>
                <b>ID:</b> {data?.id ?? user?.id}
              </li>
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
