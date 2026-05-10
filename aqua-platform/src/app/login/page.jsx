import { Suspense } from 'react';
import LoginForm from './login-form';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <span className="eyebrow">Acesso interno</span>
        <h1>Entrar na AQUA</h1>
        <p className="muted">
          Use sua conta Google autorizada para acessar o painel administrativo.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}
