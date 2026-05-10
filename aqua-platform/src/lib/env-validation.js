const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const placeholderSnippets = [
  'SEU_PROJETO',
  'sua-chave',
  'PROJECT_REF',
  'PASSWORD',
  'admin@exemplo.com',
  'bruno@example.com',
];

function hasPlaceholder(value = '') {
  return placeholderSnippets.some((snippet) => value.includes(snippet));
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isValidEmailList(value) {
  return String(value)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
    .every((email) => EMAIL_REGEX.test(email));
}

export function getActivationPreflightReport(env = process.env) {
  const errors = [];
  const warnings = [];

  const requiredKeys = [
    'NEXT_PUBLIC_APP_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DATABASE_URL',
    'DIRECT_URL',
    'AQUA_INITIAL_STRATEGIC_EMAILS',
  ];

  for (const key of requiredKeys) {
    const value = String(env[key] || '').trim();

    if (!value) {
      errors.push(`${key}: ausente.`);
      continue;
    }

    if (hasPlaceholder(value)) {
      errors.push(`${key}: ainda usa valor de exemplo.`);
    }
  }

  const appUrl = String(env.NEXT_PUBLIC_APP_URL || '').trim();
  if (appUrl) {
    if (!isValidUrl(appUrl)) {
      errors.push('NEXT_PUBLIC_APP_URL: URL invalida.');
    } else if (new URL(appUrl).pathname !== '/') {
      warnings.push('NEXT_PUBLIC_APP_URL: prefira a origem base sem path adicional.');
    }
  }

  const supabaseUrl = String(env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  if (supabaseUrl) {
    if (!isValidUrl(supabaseUrl)) {
      errors.push('NEXT_PUBLIC_SUPABASE_URL: URL invalida.');
    } else if (!new URL(supabaseUrl).hostname.endsWith('.supabase.co')) {
      warnings.push('NEXT_PUBLIC_SUPABASE_URL: host inesperado para um projeto Supabase.');
    }
  }

  const databaseUrl = String(env.DATABASE_URL || '').trim();
  if (databaseUrl) {
    if (!databaseUrl.startsWith('postgresql://')) {
      errors.push('DATABASE_URL: use uma URL PostgreSQL valida.');
    } else {
      const database = new URL(databaseUrl);
      if (!database.hostname.includes('pooler.supabase.com')) {
        warnings.push('DATABASE_URL: para runtime, prefira a pooler URL do Supabase.');
      }

      if (database.port && database.port !== '6543') {
        warnings.push('DATABASE_URL: a pooler do Supabase normalmente usa a porta 6543.');
      }
    }
  }

  const directUrl = String(env.DIRECT_URL || '').trim();
  if (directUrl) {
    if (!directUrl.startsWith('postgresql://')) {
      errors.push('DIRECT_URL: use uma URL PostgreSQL valida.');
    } else {
      const direct = new URL(directUrl);
      if (direct.searchParams.get('pgbouncer') === 'true') {
        warnings.push('DIRECT_URL: evite pooler/pgbouncer em migracoes e seeds.');
      }

      if (direct.port && direct.port !== '5432') {
        warnings.push('DIRECT_URL: a conexao direta do Supabase normalmente usa a porta 5432.');
      }
    }
  }

  const strategicEmails = String(env.AQUA_INITIAL_STRATEGIC_EMAILS || '').trim();
  if (strategicEmails && !isValidEmailList(strategicEmails)) {
    errors.push('AQUA_INITIAL_STRATEGIC_EMAILS: informe emails validos separados por virgula.');
  }

  const operationalEmails = String(env.AQUA_INITIAL_OPERATIONAL_EMAILS || '').trim();
  if (operationalEmails && !isValidEmailList(operationalEmails)) {
    errors.push('AQUA_INITIAL_OPERATIONAL_EMAILS: informe emails validos separados por virgula.');
  }

  const serviceRoleKey = String(env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  if (!serviceRoleKey) {
    warnings.push('SUPABASE_SERVICE_ROLE_KEY: ausente; mantenha configurada antes de automacoes administrativas futuras.');
  } else if (hasPlaceholder(serviceRoleKey)) {
    warnings.push('SUPABASE_SERVICE_ROLE_KEY: ainda usa valor de exemplo.');
  }

  return { errors, warnings };
}