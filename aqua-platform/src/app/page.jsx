import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-panel">
        <span className="eyebrow">AQUA Platform</span>
        <h1>Base backend preparada</h1>
        <p className="muted">
          Esta aplicação concentra a próxima fase da AQUA: autenticação, permissões,
          persistência e painel protegido.
        </p>
        <Link className="button" href="/admin">
          Acessar painel
        </Link>
      </section>
    </main>
  );
}
