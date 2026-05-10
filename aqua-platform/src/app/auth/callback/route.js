import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getSafeRelativeRedirect } from '@/lib/redirects';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const authError = requestUrl.searchParams.get('error');
  const next = getSafeRelativeRedirect(requestUrl.searchParams.get('next'));
  const loginUrl = new URL('/login', requestUrl.origin);

  if (authError) {
    loginUrl.searchParams.set('error', 'oauth_failed');
    loginUrl.searchParams.set('redirectTo', next);
    return NextResponse.redirect(loginUrl);
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      loginUrl.searchParams.set('error', 'oauth_failed');
      loginUrl.searchParams.set('redirectTo', next);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
