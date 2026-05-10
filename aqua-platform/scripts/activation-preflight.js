import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getActivationPreflightReport } from '../src/lib/env-validation.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function parseEnvFile(content) {
  const values = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

function loadEnvFiles() {
  const merged = {};

  for (const fileName of ['.env', '.env.local']) {
    const filePath = path.join(rootDir, fileName);
    if (!fs.existsSync(filePath)) continue;

    Object.assign(merged, parseEnvFile(fs.readFileSync(filePath, 'utf8')));
  }

  return merged;
}

const report = getActivationPreflightReport({
  ...loadEnvFiles(),
  ...process.env,
});

if (!report.errors.length && !report.warnings.length) {
  console.log('Preflight OK: ambiente pronto para iniciar a ativacao real da plataforma.');
  process.exit(0);
}

if (report.errors.length) {
  console.error('Erros de preflight:');
  report.errors.forEach((message) => console.error(`- ${message}`));
}

if (report.warnings.length) {
  console.warn('Avisos de preflight:');
  report.warnings.forEach((message) => console.warn(`- ${message}`));
}

process.exit(report.errors.length ? 1 : 0);