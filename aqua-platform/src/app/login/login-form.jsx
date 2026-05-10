'use client';

import { LogIn } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const redirectTo = searchParams.get('redirectTo') || '/admin';

  const handleLogin = async () => {
    const supabase = createSupabaseBrowserClient();
    const origin = window.location.origin;

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
  };

  return (
    <>
      {error === 'unauthorized' ? (
        <p className="error-text">Seu Google entrou corretamente, mas este e-mail não está autorizado.</p>
      ) : null}
      <button className="button" type="button" onClick={handleLogin}>
        <LogIn size={18} />
        Entrar com Google
      </button>
    </>
  );
}
