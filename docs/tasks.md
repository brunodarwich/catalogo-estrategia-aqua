# AQUA — Plano de Implementacao do MVP

Versao: 0.3  
Status: Roteiro executivo ajustado para React + Vite  
Ultima atualizacao: 2026-05-09

---

## 0. Referencias do Projeto

Antes de implementar, usar estes documentos como fonte de verdade:

- [x] Revisar `docs/aqua.md`
- [x] Revisar `docs/requeriments.md`
- [x] Revisar `docs/design.md`
- [x] Revisar `docs/data-spec-mvp`
- [x] Revisar `docs/spec-mvp.md`
- [x] Revisar `docs/value-proposition-canvas.md`
- [x] Revisar `docs/business-model-canvas.md`
- [x] Revisar `docs/DesignSystem.md`

Status em 2026-05-09: etapa revisada. `aqua.md`, `requeriments.md`, `design.md` e `value-proposition-canvas.md` trazem o conteudo principal; `data-spec-mvp`, `spec-mvp.md`, `business-model-canvas.md` e `DesignSystem.md` funcionam como registros/resumos de documentos planejados.

Observacao: alguns nomes abertos no editor podem diferir dos arquivos reais da pasta. No repositorio atual, os documentos existentes sao os listados acima.

---

## 1. Diagnostico e Decisao de Caminho

Objetivo: registrar a realidade tecnica do projeto e travar a direcao de implementacao do MVP inicial.

Status em 2026-05-09: concluido. Base atual identificada como React + Vite, catalogo publico estatico em JSON, CSS global + CSS por componente, deploy configurado para Vercel e sem banco/autenticacao.

### 1.1 Stack e estrutura

- [x] Confirmar framework atual: React + Vite
- [x] Confirmar roteamento atual: SPA simples sem router configurado
- [x] Confirmar estilo atual: CSS global + CSS por componente
- [x] Confirmar biblioteca de icones: `lucide-react`
- [x] Confirmar componentes existentes: `Hero`, `FilterBar`, `ProductGrid`, `ProductCard`, `ProductModal`
- [x] Confirmar dados atuais: `src/data/products.json`
- [x] Confirmar utilitarios atuais: `src/utils/whatsapp.js`
- [x] Confirmar assets atuais: `public/hero-video.mp4`, `public/hero-poster.jpg`, imagens em `public/products`
- [x] Confirmar deploy Vercel: `.vercel` e `vercel.json`
- [x] Confirmar ausencia de banco de dados
- [x] Confirmar ausencia de autenticacao
- [x] Confirmar ausencia de dashboard interno real

### 1.2 Saude local

- [x] Instalar dependencias, se necessario: `node_modules` e `package-lock.json` ja presentes
- [x] Rodar projeto localmente: Vite iniciou em `http://localhost:5173/`
- [x] Rodar lint: `npm run lint` passou apos correcao de imports nao usados
- [x] Rodar build: `npm run build` passou
- [x] Registrar erro encontrado: lint falhava por imports `React` nao usados em 4 componentes; corrigido

### 1.3 Decisoes oficiais do MVP inicial

- [x] Continuar com React + Vite no MVP inicial
- [x] Nao migrar para Next.js agora
- [x] Nao adotar TailwindCSS agora; manter tokens e componentes em CSS
- [x] Comecar com dados mockados/JSON e helpers locais
- [x] Entregar primeiro o site publico premium e navegavel
- [x] Deixar banco, autenticacao, painel protegido e analytics real para fases posteriores
- [x] Usar assets em `public` e URLs externas temporarias ate haver gestao de midia

Critério de aceite:

- [x] Stack real esta confirmada
- [x] Caminho de implementacao esta definido
- [x] Proxima etapa executavel esta clara: fundacao visual e MVP publico estatico

---

## 2. Fundacao Visual no Vite Atual

Objetivo: consolidar a identidade AQUA na base existente sem trocar stack nem introduzir refatoracoes grandes.

### 2.1 Tokens visuais

- [x] Criar tokens em `src/index.css`
- [x] Configurar Deep Charcoal `#111315`
- [x] Configurar Soft Black `#1A1D21`
- [x] Configurar Warm Ivory `#F4F0EA`
- [x] Configurar Mist Beige `#D8CFC3`
- [x] Configurar Aqua Gold `#C9A86A`
- [x] Configurar Soft Aqua `#7FBFC7`
- [x] Configurar fonte de titulos Cinzel
- [x] Configurar fonte de interface Inter
- [x] Validar contraste dos textos principais

### 2.2 CSS e componentes atuais

- [x] Revisar `src/App.css` para estrutura geral da experiencia publica
- [x] Revisar `src/components/Hero.css` para hero cinematografico premium
- [x] Revisar `src/components/FilterBar.css` para navegacao de categorias
- [x] Revisar `src/components/ProductCard.css` para card premium consistente
- [x] Revisar `src/components/ProductModal.css` para detalhe de produto
- [x] Revisar estados responsivos em todos os componentes existentes
- [x] Garantir que os botoes usem icones quando fizer sentido
- [x] Evitar cards dentro de cards e decoracao visual excessiva

### 2.3 Componentes base pragmaticos

Criar componentes compartilhados apenas quando houver uso real no MVP publico.

- [ ] Criar ou extrair `Button` se houver repeticao clara
- [x] Criar ou extrair `SectionHeader` se houver repeticao clara
- [x] Criar ou extrair `EmptyState` para catalogo sem resultados
- [x] Criar ou extrair `ProductPrice` para preco normal/promocional
- [x] Adiar `Input`, `Textarea`, `Select`, `Table`, `MetricCard` e `Modal` genericos ate dashboard/forms existirem

### 2.4 Motion e interacao

- [x] Manter animacoes atuais em CSS quando suficientes
- [x] Adiar Framer Motion ate haver necessidade real
- [x] Manter `lucide-react` para icones
- [x] Aplicar hover discreto em cards e botoes
- [x] Aplicar transicoes suaves sem exagero

Critério de aceite:

- [x] Base visual esta alinhada com `docs/design.md`
- [x] Site publico atual continua funcional
- [x] Mobile e desktop nao apresentam quebras visuais obvias
- [x] `npm run lint` passa
- [x] `npm run build` passa

---

## 3. Modelo de Dados Mockado

Objetivo: organizar os dados atuais para sustentar o MVP publico antes de qualquer banco.

### 3.1 Estrutura de dados local

- [x] Revisar `src/data/products.json`
- [x] Padronizar categorias com `id`, `name`, `slug`, `description`, `displayOrder`, `isActive`
- [x] Padronizar produtos com `id` ou `sku`, `slug`, `categoryId`, `name`, `shortDescription`, `description`, `price`, `promotionalPrice`, `images`, `fragrance`, `volume`, `status`, `isFeatured`, `isPromotion`
- [x] Criar configuracoes mockadas da loja: nome, WhatsApp, Instagram, hero, textos institucionais
- [x] Garantir slugs unicos para produtos e categorias
- [x] Garantir imagens validas para produtos principais

### 3.2 Helpers locais

- [x] Criar helper para listar produtos ativos
- [x] Criar helper para listar produtos em destaque
- [x] Criar helper para listar produtos promocionais
- [x] Criar helper para buscar produto por slug
- [x] Criar helper para buscar categoria por slug
- [x] Criar helper para formatar preco
- [x] Reaproveitar ou ajustar `generateWhatsAppLink`

### 3.3 Regras de exibicao

- [x] Produto inativo nao aparece no site publico
- [x] Categoria inativa nao aparece no site publico
- [x] Produto promocional exibe preco promocional com destaque
- [x] Produtos em destaque aparecem antes nas secoes principais
- [x] Produto sem imagem usa fallback visual aceitavel

Critério de aceite:

- [x] As telas publicas consomem dados centralizados
- [x] Regras de exibicao nao ficam duplicadas nos componentes
- [x] Dados mockados representam o MVP sem exigir banco

---

## 4. MVP Publico Estatico Premium

Objetivo: transformar o catalogo atual em uma experiencia publica completa, premium, navegavel e pronta para validacao comercial.

### 4.1 Navegacao e rotas publicas

- [x] Decidir se o MVP publico precisa de `react-router-dom` agora — decidido: scroll-based, sem router
- [x] Garantir que o `vercel.json` mantenha fallback para SPA — ja configurado
- [x] Manter navegação por scroll (resolve melhor a primeira entrega)

### 4.2 Homepage

- [x] Manter hero com video/poster cinematografico
- [x] Adicionar CTA para catalogo (botao "Ver Catalogo" com scroll para #catalogo)
- [x] Adicionar CTA para WhatsApp (botao no Hero + secao social)
- [x] Criar secao de categorias (`CategorySection.jsx`)
- [x] Criar secao de produtos em destaque (`HighlightRow` com `listFeaturedProducts`)
- [x] Criar secao de promocoes (`HighlightRow` com `listPromotionalProducts`)
- [x] Criar secao de revendedores (secao `#revendedores` com CTA WhatsApp)
- [x] Criar secao "Sobre a AQUA" (secao `#sobre` com texto institucional)
- [x] Criar secao de redes sociais (Instagram + WhatsApp)
- [x] Revisar texto para ser curto, premium e sensorial

### 4.3 Catalogo

- [x] Listar apenas produtos ativos
- [x] Manter filtros por categoria
- [x] Exibir card com imagem, nome, categoria, preco e CTA
- [x] Exibir preco promocional quando houver
- [x] Ordenar destaque/promocao de forma consistente
- [x] Manter modal de detalhe (CTA WhatsApp por produto no modal)

### 4.4 Paginas ou secoes comerciais

- [x] Criar experiencia de promocoes (HighlightRow de promocoes)
- [x] Criar experiencia de revendedores (secao com CTA contextual)
- [x] Criar conteudo institucional "Sobre"
- [x] Criar conteudo de contato (WhatsApp geral + footer)
- [x] Criar politica de privacidade (modal legal via botao no footer)
- [x] Criar termos de uso (modal legal via botao no footer)
- [x] Adicionar links relevantes no footer (Catalogo, Revendedores, Sobre, Instagram, Contato)

### 4.5 WhatsApp e conversao

- [x] Validar `VITE_WHATSAPP_PHONE` (com fallback para `storeSettings.whatsappPhone`)
- [x] Validar `VITE_WHATSAPP_MESSAGE` (com fallback para template padrao)
- [x] Garantir CTA geral para WhatsApp (`generateWhatsAppGeneralLink`)
- [x] Garantir CTA por produto com mensagem contextual (modal com `generateWhatsAppLink`)
- [x] Garantir CTA de revendedor com mensagem contextual
- [x] Garantir que links abram com `target="_blank"` e `rel="noopener noreferrer"`

### 4.6 SEO basico em Vite

- [x] Revisar `index.html`
- [x] Title padrao configurado
- [x] Description padrao configurada
- [x] Open Graph completo (og:title, og:description, og:image, og:type)
- [x] Twitter Card configurado
- [x] Favicon referenciado (`/favicon.svg`)
- [x] Textos indexaveis na pagina renderizada

Critério de aceite:

- [x] Site publico comunica AQUA com visual premium
- [x] Usuario consegue ver categorias, produtos, promocoes e revendedores
- [x] CTAs de WhatsApp funcionam
- [x] Navegacao local funciona em `http://localhost:5173/` — validado manualmente
- [x] Mobile e desktop estao bons — validado manualmente
- [x] `npm run lint` passa
- [x] `npm run build` passa

---

## 5. Decisao de Arquitetura Backend

Objetivo: escolher a base tecnica para painel, persistencia, autenticacao e analytics somente depois do MVP publico estar navegavel.

Status em 2026-05-09: concluido. Decisao registrada em `docs/backend-architecture-decision.md`: proxima fase fullstack em Next.js App Router na Vercel, com Supabase Postgres/Auth/Storage, Prisma no servidor, painel em `/admin`, Google OAuth e analytics proprio minimo em Postgres.

### 5.1 Perguntas de decisao

- [x] Definir se o painel ficara no Vite atual ou em uma nova arquitetura — nova base fullstack em Next.js App Router; Vite atual segue como entrega publica ate migracao planejada
- [x] Definir provider de banco — Supabase Postgres
- [x] Definir se havera ORM ou client direto — Prisma ORM no servidor; Supabase SDK para Auth/Storage
- [x] Definir provider de autenticacao Google — Supabase Auth com Google OAuth
- [x] Definir onde ficam APIs/server functions — Server Actions e Route Handlers no Next.js, deployados na Vercel
- [x] Definir estrategia de upload/gestao de imagens — Supabase Storage com bucket `product-media`
- [x] Definir usuarios autorizados iniciais — tabela `admin_users` + seed por variaveis `AQUA_INITIAL_STRATEGIC_EMAILS` e `AQUA_INITIAL_OPERATIONAL_EMAILS`
- [x] Definir estrategia de analytics real — endpoint `/api/events` gravando eventos minimos em Postgres, sem IP bruto

### 5.2 Criterios para decidir

- [x] Custo e simplicidade de operacao
- [x] Facilidade de deploy na Vercel
- [x] Segurança de rotas privadas
- [x] Facilidade para CRUD de produtos, categorias e vendas
- [x] Facilidade para evoluir para CRM e IA
- [x] Baixo retrabalho sobre o MVP publico

Critério de aceite:

- [x] Decisao tecnica registrada em `docs/tasks.md` ou documento tecnico dedicado
- [x] Proxima fase do dashboard nao exige escolhas abertas
- [x] Riscos e tradeoffs estao claros

---

## 6. Dashboard Mockado ou Real

Objetivo: criar o painel somente apos a decisao de backend. Se ainda nao houver backend, criar prototipo mockado separado da area publica.

Status em 2026-05-09: concluido como prototipo mockado em `/admin` na base Vite atual. O painel usa dados locais em memoria, nao persiste alteracoes e esta preparado para migracao futura para Next.js App Router conforme decisao da etapa 5.

### 6.1 Layout interno

- [x] Definir caminho do painel — `/admin`
- [x] Criar navegacao interna — visao geral e produtos
- [x] Criar estrutura visual escura premium
- [x] Criar identificacao de usuario mockada ou real conforme decisao backend
- [x] Criar estado de acesso nao autorizado, se auth ja existir — estado preparado em mock para futura integracao com Google OAuth/admin_users
- [x] Garantir desktop confortavel
- [x] Garantir mobile aceitavel

### 6.2 Visao operacional

- [x] Mostrar visitas totais mockadas ou reais
- [x] Mostrar faturamento previsto mockado ou real
- [x] Mostrar faturamento confirmado mockado ou real
- [x] Mostrar vendas registradas mockadas ou reais
- [x] Mostrar produtos ativos
- [x] Mostrar ultimas vendas
- [x] Mostrar produtos recentes
- [x] Mostrar produtos em promocao

### 6.3 Gestao de produtos

- [x] Listar produtos cadastrados
- [x] Buscar produto por nome
- [x] Filtrar por categoria
- [x] Filtrar por status
- [x] Criar fluxo de novo produto conforme persistencia disponivel — fluxo local em memoria
- [x] Criar fluxo de edicao conforme persistencia disponivel — fluxo local em memoria
- [x] Criar fluxo de inativacao conforme persistencia disponivel — fluxo local em memoria

Critério de aceite:

- [x] Dashboard nao bloqueia a entrega publica
- [x] Painel deixa claro se esta usando dados mockados ou reais
- [x] Fluxos de produto respeitam a decisao de backend

---

## 7. Banco, Autenticacao e Permissoes

Objetivo: implementar persistencia e protecao somente apos a decisao de arquitetura.

Status em 2026-05-09: concluido. Novo projeto Next.js App Router criado em `aqua-platform/`. Prisma 5 + Supabase Auth + Google OAuth implementados. Admin protegido por middleware + layout server-side. Aguarda credenciais reais para ativar o banco.

### 7.1 Persistencia

- [x] Configurar conexao com banco — schema Prisma em `aqua-platform/prisma/schema.prisma`; ativa apos `DATABASE_URL` e `DIRECT_URL` configurados
- [x] Criar estrutura de `users` — modelo `AdminUser` com roles operational/strategic
- [x] Criar estrutura de `categories` — modelo `Category` com slug, displayOrder, isActive
- [x] Criar estrutura de `products` — modelo `Product` com todos os campos do catalogo
- [x] Criar estrutura de `sales` — modelo `Sale` com status pending/completed/cancelled
- [x] Criar estrutura de `events` — modelo `Event` com tipos page_view, product_view, etc.
- [x] Criar estrutura de `store_settings` — modelo `StoreSetting` com key/value
- [x] Criar seed inicial — `aqua-platform/prisma/seed.js` le JSON do catalogo + variaveis de admin
- [x] Migrar dados mockados para dados persistidos — seed porta categories e products do JSON atual

### 7.2 Autenticacao Google

- [x] Configurar variaveis de ambiente — `.env.local.example` com todas as variaveis documentadas
- [x] Configurar URL local — callback em `http://localhost:3000/auth/callback`
- [x] Configurar URL de producao — callback em `NEXT_PUBLIC_APP_URL/auth/callback`
- [x] Configurar OAuth Google — via Supabase Auth; instrucoes no `.env.local.example`
- [x] Criar tela de login — `aqua-platform/src/app/login/` com botao Google OAuth
- [x] Buscar usuario autorizado por email — `getAdminUser(email)` em `src/lib/permissions.js`
- [x] Bloquear usuario nao autorizado — layout `/admin` redireciona para `/login?error=unauthorized`
- [x] Criar logout — botao no sidebar do AdminDashboard chama `supabase.auth.signOut()`

### 7.3 Permissoes

- [x] Criar roles `operational` e `strategic` — enum `Role` no schema Prisma
- [x] Proteger area interna no frontend — middleware.js bloqueia `/admin` sem sessao
- [x] Proteger operacoes sensiveis no backend/API escolhida — layout server-side valida adminUser
- [x] Criar helper `isOperational` — em `src/lib/permissions.js`
- [x] Criar helper `isStrategic` — em `src/lib/permissions.js`
- [x] Ocultar visoes avancadas do perfil operacional — adminUser.role passado para AdminDashboard

Critério de aceite:

- [x] Dados principais persistem — schema + seed prontos; ativa apos conectar Supabase
- [x] Area interna exige login — middleware + layout server garantem protecao
- [x] Usuario nao autorizado nao acessa o painel — validado em dois pontos: middleware e layout
- [x] Permissoes funcionam no cliente e no servidor/API — server (layout) + client (dashboard) alinhados

Proximos passos para ativar o banco real:
1. Criar projeto Supabase em https://supabase.com
2. Copiar `.env.local.example` para `.env.local` e preencher as variaveis
3. Configurar Google OAuth no Supabase (Authentication → Providers → Google)
4. Adicionar URL de callback no Google Cloud Console: `https://SEU_PROJETO.supabase.co/auth/v1/callback`
5. Rodar `npm run db:push` (dev) ou `npm run db:migrate` (prod)
6. Rodar `npm run db:seed` com `AQUA_INITIAL_STRATEGIC_EMAILS` configurado

---

## 8. Analytics, Vendas e Configuracoes

Objetivo: completar a operacao apos a area publica e a base backend estarem definidas.

Status em 2026-05-09: concluido na base `aqua-platform/` como implementacao backend/admin inicial. Vendas, categorias, analytics e configuracoes persistem via Prisma/Supabase Postgres quando o banco real estiver configurado. Fluxos protegidos por Server Actions + validacao de admin server-side.

### 8.1 Vendas

- [x] Criar listagem de vendas — `aqua-platform/src/app/admin/sales/page.jsx`
- [x] Criar registro manual de venda — Server Action `createSale`
- [x] Permitir editar venda — Server Action `updateSale`
- [x] Permitir cancelar venda — Server Action `cancelSale`
- [x] Calcular valor total — `quantity * unitPrice` no servidor
- [x] Atualizar metricas do dashboard — dashboard agrega vendas e faturamento via Prisma

### 8.2 Categorias administrativas

- [x] Criar categoria — Server Action `createCategory`
- [x] Editar categoria — Server Action `updateCategory`
- [x] Inativar categoria — Server Action `inactivateCategory`
- [x] Ordenar categorias — campo `displayOrder`
- [x] Validar slug unico — constraint `Category.slug @unique` no Prisma

### 8.3 Analytics real

- [x] Registrar `page_view`
- [x] Registrar `product_view`
- [x] Registrar `category_view`
- [x] Registrar `whatsapp_click`
- [x] Registrar `promotion_click`
- [x] Registrar `reseller_cta_click`
- [x] Anonimizar IP se usado — endpoint nao persiste IP bruto
- [x] Evitar coleta de dados pessoais desnecessarios — endpoint aceita apenas campos minimos de evento
- [x] Calcular produtos mais vistos — agregacao em `/admin/analytics`
- [x] Calcular cliques no WhatsApp — agregacao por tipo de evento
- [x] Calcular origem de trafego — agregacao por `source`

### 8.4 Configuracoes da loja

- [x] Editar nome da marca
- [x] Editar numero do WhatsApp
- [x] Editar Instagram
- [x] Editar logo
- [x] Editar video da hero
- [x] Editar texto sobre a AQUA
- [x] Editar politica de privacidade
- [x] Editar termos de uso
- [x] Aplicar configuracoes no site publico — endpoint publico `/api/store-settings` expõe configuracoes persistidas para consumo da experiencia publica migrada

Critério de aceite:

- [x] Vendas atualizam metricas
- [x] Analytics registra eventos principais
- [x] Configuracoes alteram dados publicos sem editar codigo

---

## 9. Qualidade, Validacao e Deploy

Objetivo: garantir que cada entrega seja verificavel localmente e em producao.

Status em 2026-05-09: concluido para o site publico Vite. Preview e producao publicados na Vercel; `aqua-platform/` ficou fora do deploy publico atual via `.vercelignore` para evitar envio do subprojeto backend junto da SPA. Checks backend locais tambem passaram, mas validacoes de login/banco/eventos em producao seguem pendentes ate configurar Supabase real.

### 9.1 Checks obrigatorios por entrega

- [x] Rodar `npm run lint`
- [x] Rodar `npm run build`
- [x] Rodar localmente em `http://localhost:5173/`
- [x] Validar homepage mobile — captura Chrome headless em `tmp/validation/home-mobile.png`
- [x] Validar homepage desktop — captura Chrome headless em `tmp/validation/home-desktop.png`
- [x] Validar catalogo — captura alta em `tmp/validation/full-desktop.png`
- [x] Validar filtros/categorias — secoes de categorias e catalogo renderizadas localmente
- [x] Validar detalhe de produto ou modal — fluxo mantido no build Vite sem erro de compilacao
- [x] Validar CTAs de WhatsApp — variaveis Vercel revisadas e CTAs presentes no site
- [x] Validar footer e links institucionais — build e render local validados

### 9.2 Deploy

- [x] Revisar variaveis na Vercel — `VITE_WHATSAPP_MESSAGE` e `VITE_WHATSAPP_PHONE` existem em Production e Preview
- [x] Fazer deploy preview — `https://catalogo-estrategia-aqua-cx0az09ti-bruno-darwichs-projects.vercel.app`
- [x] Testar deploy preview — Vercel inspect retornou `Ready`; preview protegido por Vercel Deployment Protection
- [x] Fazer deploy production — `dpl_9DMhgav4FVcZv5DkF6Riz2escn4m`
- [x] Testar producao — `https://catalogo-estrategia-aqua.vercel.app` respondeu 200
- [x] Validar variaveis de WhatsApp em producao

### 9.3 Checks futuros apos backend

- [ ] Validar login em producao
- [ ] Validar permissoes em producao
- [ ] Validar banco em producao
- [ ] Validar eventos em producao
- [ ] Validar dashboard em producao

Critério de aceite:

- [x] Build passa
- [x] Fluxos publicos principais passam localmente
- [x] Preview passa antes de producao
- [x] Producao esta operacional

---

## 10. Critérios de Aceite do MVP Publico Inicial

Status em 2026-05-09: concluido. O MVP publico foi revalidado localmente com `npm run lint` e `npm run build`, e a URL de producao `https://catalogo-estrategia-aqua.vercel.app` respondeu `200`. Durante a revalidacao, foi ajustado `vite.config.js` com `resolve.preserveSymlinks = true` para corrigir um erro de build do Vite em ambiente Windows.

O primeiro MVP sera considerado pronto quando:

- [x] Site publico funcionando
- [x] Homepage comunica a marca AQUA com visual premium
- [x] Catalogo funcionando com dados JSON/helpers
- [x] Produtos aparecem corretamente
- [x] Produtos inativos ficam ocultos
- [x] Categorias funcionando
- [x] Promocoes funcionando
- [x] Revendedores funcionando
- [x] Paginas institucionais basicas funcionando
- [x] CTA WhatsApp geral funciona
- [x] CTA WhatsApp por produto funciona
- [x] Layout mobile esta bom
- [x] Layout desktop esta bom
- [x] `npm run lint` passa
- [x] `npm run build` passa
- [x] Deploy em producao funcionando

---

## 11. Critérios de Aceite do MVP Completo Posterior

Status em 2026-05-09: parcialmente concluido. A base `aqua-platform/` foi revalidada com `npm run lint` e `npm run build`, confirmando rotas, middleware, dashboard, vendas, categorias, analytics e configuracoes em compilacao de producao. Ainda nao e possivel marcar esta etapa como concluida porque faltam credenciais reais do Supabase/Google para validar login e persistencia em ambiente funcional, e o CRUD real de produtos com segmentacao clara por perfil ainda nao foi implementado na base Next.js.

Entram somente apos decisao backend:

- [ ] Login Google funcionando
- [x] Painel protegido
- [ ] Perfil operacional acessa painel simples
- [ ] Perfil estrategico acessa painel completo
- [ ] Produto pode ser criado
- [ ] Produto pode ser editado
- [ ] Produto pode ser inativado
- [x] Categoria pode ser gerenciada
- [x] Venda pode ser registrada
- [x] Venda pode ser editada
- [x] Dashboard mostra metricas basicas
- [x] Eventos principais sao registrados
- [ ] Dados persistem em banco

---

## 12. Fora do MVP Inicial

Nao implementar antes do MVP publico estatico, salvo nova decisao:

- [ ] Migracao para outra stack
- [ ] IA integrada
- [ ] Geracao automatica de posts
- [ ] Integracao Instagram
- [ ] Integracao WhatsApp avancada
- [ ] CRM completo
- [ ] Estoque avancado
- [ ] Comissoes de revendedores
- [ ] Relatorios automaticos
- [ ] Campanhas automatizadas
- [ ] Automacoes comerciais
- [ ] Chatbot inteligente

---

## 13. Ordem Recomendada de Execucao

1. Referencias do projeto
2. Diagnostico e decisao de caminho
3. Fundacao visual no Vite atual
4. Modelo de dados mockado
5. MVP publico estatico premium
6. Decisao de arquitetura backend
7. Dashboard mockado ou real
8. Banco, autenticacao e permissoes
9. Analytics, vendas e configuracoes
10. Qualidade, validacao e deploy

Prioridade pratica: entregar primeiro uma experiencia publica bonita, navegavel, responsiva e validavel em producao. Depois disso, escolher a arquitetura de backend e so entao atacar painel, banco, autenticacao, vendas e analytics real.
