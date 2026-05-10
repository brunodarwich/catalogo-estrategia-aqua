'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, LayoutDashboard, LogOut, Package, Settings, ShieldCheck, ShoppingBag, Tags } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const roleLabels = {
  operational: 'Operacional',
  strategic: 'Estratégico',
};

const navigationGroups = [
  {
    label: 'Acesso operacional',
    description: 'Disponível para perfis operational e strategic.',
    items: [
      { href: '/admin', icon: LayoutDashboard, label: 'Visão geral' },
      { href: '/admin/sales', icon: ShoppingBag, label: 'Vendas' },
    ],
  },
  {
    label: 'Acesso estratégico',
    description: 'Mudanças estruturais protegidas no servidor.',
    items: [
      { href: '/admin/products', icon: Package, label: 'Produtos', strategicOnly: true },
      { href: '/admin/categories', icon: Tags, label: 'Categorias', strategicOnly: true },
      { href: '/admin/analytics', icon: BarChart3, label: 'Analytics', strategicOnly: true },
      { href: '/admin/settings', icon: Settings, label: 'Configurações', strategicOnly: true },
    ],
  },
];

export default function AdminShell({ adminUser, children }) {
  const pathname = usePathname();
  const isStrategic = adminUser.role === 'strategic';

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand">
          <span className="admin-brand-mark">A</span>
          <span>AQUA</span>
        </Link>

        <div className="role-summary">
          <span className={`access-badge ${adminUser.role}`}>{roleLabels[adminUser.role]}</span>
          <p className="muted">
            {isStrategic
              ? 'Seu perfil pode operar e também publicar mudanças de catálogo, analytics e configurações.'
              : 'Seu perfil acessa um painel simples, focado na visão geral e no registro comercial.'}
          </p>
        </div>

        <nav className="admin-nav" aria-label="Navegação interna">
          {navigationGroups.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              <div className="admin-nav-group-heading">
                <span>{group.label}</span>
                <small>{group.description}</small>
              </div>

              {group.items
                .filter((item) => !item.strategicOnly || isStrategic)
                .map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link className={active ? 'active' : ''} href={item.href} key={item.href}>
                      <Icon size={17} />
                      <span>{item.label}</span>
                      {item.strategicOnly ? (
                        <span className="nav-access-pill strategic">Estratégico</span>
                      ) : (
                        <span className="nav-access-pill operational">Operacional</span>
                      )}
                    </Link>
                  );
                })}
            </div>
          ))}

          <button type="button" onClick={handleLogout}>
            <LogOut size={17} /> Sair
          </button>
        </nav>

        <div className="admin-panel admin-user-card">
          <ShieldCheck size={18} />
          <p>
            <strong>{adminUser.name}</strong>
            <br />
            <span>{roleLabels[adminUser.role]}</span>
          </p>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
