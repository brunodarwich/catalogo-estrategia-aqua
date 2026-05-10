import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './supabase/server';
import { getAdminUser, isOperational, isStrategic } from './permissions';

export async function requireAdminUser({ strategicOnly = false } = {}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect('/login?redirectTo=/admin');
  }

  const adminUser = await getAdminUser(user.email);
  const allowed = strategicOnly ? isStrategic(adminUser) : isOperational(adminUser);

  if (!allowed) {
    redirect('/login?error=unauthorized');
  }

  return adminUser;
}
