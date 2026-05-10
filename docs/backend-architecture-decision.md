# AQUA — Decisao de Arquitetura Backend

Versao: 0.1  
Status: Decisao aprovada para proxima fase  
Data: 2026-05-09

---

## 1. Contexto

O MVP publico da AQUA foi entregue como uma SPA em React + Vite, com dados mockados centralizados em JSON/helpers locais. Essa base atende bem ao catalogo publico, mas a proxima fase inclui painel privado, persistencia, login Google, CRUD de produtos, vendas, configuracoes e analytics real.

A decisao desta etapa e escolher a arquitetura da fase backend sem interromper o site publico atual.

---

## 2. Decisao

### 2.1 Arquitetura oficial da proxima fase

A proxima fase deve ser implementada em uma nova base fullstack com **Next.js App Router na Vercel**, usando:

- **Next.js App Router** para rotas publicas futuras, rotas privadas, layouts, Server Components, Server Actions e Route Handlers.
- **Vercel** como plataforma de deploy e execucao das funcoes server-side.
- **Supabase Postgres** como banco relacional principal.
- **Supabase Auth** como autenticacao, com Google OAuth.
- **Prisma ORM** para modelagem, migrations e acesso tipado ao banco no servidor.
- **Supabase Storage** para imagens de produtos e midias administraveis.
- **Eventos proprios em Postgres** para analytics de negocio.

O projeto Vite atual permanece como entrega publica validada ate a migracao planejada. A migracao para Next.js deve acontecer antes do painel real protegido e antes de qualquer operacao sensivel de CRUD/vendas.

---

## 3. Decisoes por Pergunta

### Painel

**Decisao:** o painel nao deve ficar como uma area administrativa sensivel dentro da SPA Vite atual.  
**Caminho:** criar/migrar para uma base Next.js App Router e implementar o painel em `/admin`.

Motivo:

- rotas privadas ficam mais naturais com layouts protegidos;
- mutacoes podem rodar em Server Actions/Route Handlers;
- regras sensiveis nao precisam morar no cliente;
- o deploy na Vercel continua simples.

### Banco

**Decisao:** usar **Supabase Postgres**.

Motivo:

- Postgres cobre bem produtos, categorias, vendas, eventos e configuracoes;
- Supabase integra Auth, banco, storage e Row Level Security;
- custo operacional inicial tende a ser baixo;
- facilita evolucao para CRM, automacoes e IA.

### ORM ou client direto

**Decisao:** usar **Prisma ORM no servidor** para schema, migrations e consultas principais.

Uso esperado:

- Prisma para `products`, `categories`, `sales`, `store_settings`, `admin_users` e `events`;
- Supabase SDK para Auth e Storage;
- SQL/RLS do Supabase para politicas de seguranca quando necessario.

### Autenticacao Google

**Decisao:** usar **Supabase Auth com Google OAuth**.

Modelo:

- login Google no painel;
- sessao validada no servidor;
- autorizacao por tabela `admin_users`;
- roles iniciais: `operational` e `strategic`.

### APIs e server functions

**Decisao:** usar recursos server-side do Next.js:

- **Server Actions** para formularios e mutacoes internas do painel;
- **Route Handlers** para endpoints publicos, analytics, uploads, webhooks e integracoes futuras.

### Upload e gestao de imagens

**Decisao:** usar **Supabase Storage**.

Modelo:

- bucket publico `product-media` para imagens de produtos;
- bucket privado `internal-media`, se houver arquivos internos no futuro;
- uploads passam por area autenticada;
- banco guarda metadados, ordem e URL/caminho das imagens.

### Usuarios autorizados iniciais

**Decisao:** nao hardcodar emails administrativos no repositorio.

Modelo inicial:

- seed inicial le `AQUA_INITIAL_STRATEGIC_EMAILS` e `AQUA_INITIAL_OPERATIONAL_EMAILS`;
- tabela `admin_users` guarda email, role e status;
- primeiro usuario `strategic` deve ser configurado por variavel de ambiente antes de ativar o painel real;
- usuarios nao cadastrados podem autenticar no Google, mas nao acessam o painel.

### Analytics real

**Decisao:** criar analytics proprio minimo em Postgres.

Eventos iniciais:

- `page_view`;
- `product_view`;
- `category_view`;
- `whatsapp_click`;
- `promotion_click`;
- `reseller_cta_click`.

Regras:

- registrar apenas dados necessarios para metricas de negocio;
- evitar dados pessoais desnecessarios;
- nao armazenar IP bruto;
- usar endpoint server-side `/api/events`;
- usar agregacoes no dashboard para produtos mais vistos, cliques no WhatsApp e origem de trafego.

---

## 4. Criterios de Decisao

| Criterio | Decisao |
| --- | --- |
| Custo e simplicidade de operacao | Supabase concentra banco, auth e storage; Vercel continua como deploy principal. |
| Facilidade de deploy na Vercel | Next.js e Vercel tem integracao fullstack direta. |
| Seguranca de rotas privadas | Painel protegido por sessao server-side, tabela `admin_users` e validacoes no servidor. |
| CRUD de produtos, categorias e vendas | Prisma + Postgres dao schema consistente e migrations versionadas. |
| Evolucao para CRM e IA | Postgres relacional facilita historico, eventos, clientes e dados para futuras automacoes. |
| Baixo retrabalho no MVP publico | Site Vite atual continua funcionando; migracao para Next.js deve reaproveitar componentes e estilos. |

---

## 5. Riscos e Tradeoffs

- **Migracao Vite -> Next.js:** exige uma etapa tecnica antes do painel real. Mitigacao: portar primeiro componentes publicos sem alterar visual/fluxo.
- **Complexidade de Auth/RLS:** Supabase facilita, mas regras precisam ser testadas. Mitigacao: validar acesso no servidor e no banco.
- **Custos por uso:** Supabase/Vercel podem crescer com trafego, storage e funcoes. Mitigacao: comecar com analytics enxuto e revisar limites antes de producao.
- **Uploads publicos:** imagens de produto podem ser publicas, mas escrita precisa ser autenticada. Mitigacao: bucket publico apenas para leitura; upload/delete pelo painel protegido.
- **Analytics proprio:** exige modelagem e cuidado com privacidade. Mitigacao: registrar eventos minimos e agregados.

---

## 6. Implicacoes para as Proximas Etapas

### Etapa 6

O dashboard deve ser desenhado ja pensando no caminho `/admin`, mas pode comecar mockado se a migracao Next.js ainda nao tiver sido feita.

### Etapa 7

A implementacao real deve seguir esta ordem:

1. Criar base Next.js App Router.
2. Portar site publico atual.
3. Configurar Supabase.
4. Configurar Prisma.
5. Criar schema inicial.
6. Configurar Google OAuth.
7. Criar tabela `admin_users`.
8. Proteger `/admin`.
9. Migrar dados mockados para seed/banco.

### Etapa 8

Vendas, analytics e configuracoes devem persistir em Supabase Postgres e passar por server-side validation.

---

## 7. Referencias Consultadas

- Vercel — Next.js on Vercel: https://vercel.com/docs/frameworks/full-stack/nextjs
- Vercel — Functions: https://vercel.com/docs/functions
- Supabase — Auth: https://supabase.com/docs/guides/auth
- Supabase — Login with Google: https://supabase.com/docs/guides/auth/social-login/auth-google
- Supabase — Storage buckets: https://supabase.com/docs/guides/storage/buckets/fundamentals
- Prisma — Prisma Migrate: https://www.prisma.io/docs/orm/prisma-migrate/getting-started
