'use client';

import { useState } from 'react';

import ApiDemoButtons from '@/components/api-demo-buttons';
import { Button } from '@/components/ui/button';

export default function Home() {
  // 惰性初始化，避免 effect 里 setState 的 lint 警告
  const [dark, setDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setDark((v) => !v);
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center px-6">
      {/* 背景装饰：两个柔和的光斑（浅/深色都好看） */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-20%] top-[-10%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(closest-side,theme(colors.primary/15),transparent)] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[35vmax] w-[35vmax] rounded-full bg-[radial-gradient(closest-side,theme(colors.muted/40),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,theme(colors.primary/12),transparent)]" />
      </div>

      <section className="text-center">
        <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(260_70%_60%)] bg-clip-text text-transparent">
            starlab
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Minimal · Modern · Ready to grow
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button className="px-5">Get Started</Button>
          <Button variant="outline" className="px-5" onClick={toggleDark}>
            {dark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
        <ApiDemoButtons />
      </section>
    </main>
  );
}
