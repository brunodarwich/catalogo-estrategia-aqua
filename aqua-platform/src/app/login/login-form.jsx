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
      ) : error === 'oauth_failed' ? (
        <p className="error-text">
          Não foi possível concluir o login com Google. Revise o Client ID, o Client Secret e o callback no Google Cloud e no Supabase.
        </p>
      ) : null}
      <button className="button" type="button" onClick={handleLogin}>
        <LogIn size={18} />
        Entrar com Google
      </button>
    </>
  );
}
