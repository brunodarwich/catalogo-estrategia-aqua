import test from 'node:test';
import assert from 'node:assert/strict';
import { getActivationPreflightReport } from '../src/lib/env-validation.js';

test('activation preflight reports missing and placeholder values', () => {
  const report = getActivationPreflightReport({
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
    NEXT_PUBLIC_SUPABASE_URL: 'https://SEU_PROJETO.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'sua-chave-anon',
    DATABASE_URL: 'postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1',
    DIRECT_URL: 'postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-sa-east-1.pooler.supabase.com:5432/postgres',
    AQUA_INITIAL_STRATEGIC_EMAILS: 'admin@exemplo.com',
  });

  assert.ok(report.errors.some((message) => message.includes('NEXT_PUBLIC_SUPABASE_URL')));
  assert.ok(report.errors.some((message) => message.includes('AQUA_INITIAL_STRATEGIC_EMAILS')));
  assert.ok(report.warnings.some((message) => message.includes('SUPABASE_SERVICE_ROLE_KEY')));
});

test('activation preflight accepts a realistic Supabase setup', () => {
  const report = getActivationPreflightReport({
    NEXT_PUBLIC_APP_URL: 'https://app.aqua.com.br',
    NEXT_PUBLIC_SUPABASE_URL: 'https://abcxyz.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'sb_publishable_xpto',
    SUPABASE_SERVICE_ROLE_KEY: 'sb_service_role_xpto',
    DATABASE_URL: 'postgresql://postgres.abcxyz:secret@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1',
    DIRECT_URL: 'postgresql://postgres.abcxyz:secret@aws-0-sa-east-1.pooler.supabase.com:5432/postgres',
    AQUA_INITIAL_STRATEGIC_EMAILS: 'admin@aqua.com.br,owner@aqua.com.br',
    AQUA_INITIAL_OPERATIONAL_EMAILS: 'operacao@aqua.com.br',
  });

  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.warnings, []);
});