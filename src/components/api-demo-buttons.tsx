'use client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { get, useApi } from '@/lib/api';
export default function ApiDemoButtons() {
  const [helloKey, setHelloKey] = useState(0);
  const [boomKey, setBoomKey] = useState(0);

  useApi<{ ok: boolean; message: string }>(
    helloKey ? `/api/hello?tick=${helloKey}` : null,
    () => get('/api/hello', { extra: { auth: false } }),
    { toast: { loading: true, success: 'Hello ✓', error: true } },
  );

  useApi<{ message: string }>(
    boomKey ? `/api/boom?tick=${boomKey}` : null,
    () => get('/api/boom', { extra: { auth: false } }),
    { toast: { loading: 'Requesting…', error: true } },
  );

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <Button className="px-5" onClick={() => setHelloKey((n) => n + 1)}>
        Call /api/hello
      </Button>
      <Button variant="outline" className="px-5" onClick={() => setBoomKey((n) => n + 1)}>
        Call /api/boom
      </Button>
    </div>
  );
}
