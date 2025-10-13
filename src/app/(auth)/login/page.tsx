'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  const loginDemo = () => {
    setToken('demo-token');
    setUser({ id: 'u_1', email: 'demo@starlab.dev', name: 'Star Demo' });
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <section className="w-full max-w-sm rounded-xl border bg-card p-6 text-center">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Demo login for starlab</p>
        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={loginDemo}>Continue as Demo</Button>
          <p className="text-xs text-muted-foreground">No real auth yet.</p>
        </div>
      </section>
    </main>
  );
}
