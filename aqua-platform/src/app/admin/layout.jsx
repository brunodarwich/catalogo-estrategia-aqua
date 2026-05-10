import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAdminUser } from '@/lib/permissions';
import AdminShell from './shell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect('/login?redirectTo=/admin');
  }

  const adminUser = await getAdminUser(user.email);

  if (!adminUser || adminUser.status !== 'active') {
    redirect('/login?error=unauthorized');
  }

  return (
    <AdminShell
      adminUser={{
        email: adminUser.email,
        name: adminUser.name || user.user_metadata?.name || user.email,
        role: adminUser.role,
      }}
    >
      {children}
    </AdminShell>
  );
}
