# AQUA — Operacao: Producao Atual e Plataforma

## Producao atual: catalogo Vite

- A aplicacao publica em producao continua sendo a SPA React + Vite na raiz do repositorio.
- O deploy raiz deve ignorar `aqua-platform/`, `tmp/`, `logs/` e arquivos locais, conforme `.vercelignore`.
- Variaveis esperadas na Vercel: `VITE_WHATSAPP_PHONE` e `VITE_WHATSAPP_MESSAGE`.
- Checklist antes de publicar: `npm run lint`, `npm run test`, `npm run build` e validacao visual dos CTAs principais.
- URL oficial atual de producao: `https://catalogo-estrategia-aqua.vercel.app/`.
- Ultima validacao local registrada em 2026-05-10: `npm run test`, `npm run lint`, `npm run build` e `npm audit --omit=dev` concluidos sem erro na raiz.

### Rollback simples na Vercel

1. Abrir o projeto da raiz na Vercel.
2. Entrar em `Deployments`.
3. Identificar o ultimo deploy estavel anterior ao problema.
4. Usar a opcao `Promote to Production` nesse deploy anterior.
5. Revalidar a home, abertura de modal e CTA de WhatsApp em producao.

### Checklist operacional da raiz

- Confirmar que `.vercelignore` continua com `aqua-platform/`, `tmp/`, `logs/` e `.claude/`.
- Confirmar `VITE_WHATSAPP_PHONE` e `VITE_WHATSAPP_MESSAGE` em Preview e Production.
- Rodar `npm run test`.
- Rodar `npm run lint`.
- Rodar `npm run build`.
- Rodar `npm audit --omit=dev`.
- Se houver regressao apos deploy, promover o ultimo deploy saudavel pela tela `Deployments`.

## Proxima fase: `aqua-platform`

- `aqua-platform/` e a base Next.js App Router para painel, banco, autenticacao, vendas, configuracoes e analytics.
- Nao expor esta aplicacao em producao antes de validar Supabase Auth, Supabase Postgres, Google OAuth, Storage e permissoes reais.
- O schema Prisma agora possui migration inicial em `prisma/migrations/20260510000000_init/migration.sql`; ambientes duraveis devem usar `npm run db:migrate`.
- Para desenvolvimento controlado, `npm run db:push` ainda pode ser usado somente em banco descartavel.

## Checklist de ativacao da plataforma

1. Criar projeto Supabase e configurar Postgres.
2. Preencher `.env` e `.env.local` a partir dos exemplos, sem commitar valores reais.
	Rodar `npm run activation:preflight` em `aqua-platform/` e corrigir qualquer placeholder ou URL invalida antes de migrar banco ou testar OAuth.
3. Configurar Google OAuth no Supabase e no Google Cloud Console.
4. Criar bucket publico `product-media` com escrita restrita a usuarios autenticados.
5. Rodar `npm run db:migrate` e depois `npm run db:seed`.
6. Definir pelo menos um email em `AQUA_INITIAL_STRATEGIC_EMAILS`.
7. Validar login, bloqueio de usuario nao autorizado, CRUD de produtos, upload de imagem, vendas, eventos e dashboard.
8. Rodar `npm run lint`, `npm run test`, `npm run build` e `npm audit --omit=dev`.

### Repetir seed sem destruir dados reais

- O seed atual usa `upsert` para `categories`, `products`, `store_settings` e `admin_users`.
- Reexecutar `npm run db:seed` atualiza registros com o mesmo `id`, `key` ou `email`, em vez de duplicar linhas.
- Para ambiente real, prefira fornecer um `prisma/seed-data.json` controlado, em vez de depender automaticamente de `src/data/products.json`.
- Antes de repetir seed em producao, revisar o diff do JSON de seed e confirmar emails em `AQUA_INITIAL_STRATEGIC_EMAILS` e `AQUA_INITIAL_OPERATIONAL_EMAILS`.
- Se for necessario preservar alteracoes manuais do banco, congelar o seed e aplicar apenas scripts de importacao pontuais.

## Politica de seguranca operacional

- O proxy nunca deve ser o unico controle de acesso; paginas e Server Actions precisam validar usuario no servidor.
- Redirecionamentos de OAuth devem aceitar apenas caminhos relativos internos.
- Endpoints publicos devem validar origem exata, limitar payloads e tratar referencias invalidas sem expor stack trace.
- Analytics deve coletar apenas dados minimos de negocio e nao persistir IP bruto.
