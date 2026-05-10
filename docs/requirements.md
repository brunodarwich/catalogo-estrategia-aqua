# AQUA — Requirements Oficiais da Nova Fase

Versao: 1.0  
Status: Requisitos oficiais  
Data: 2026-05-10

## 1. Objetivo

Este documento define os requisitos funcionais e nao funcionais da nova fase da AQUA. Ele substitui a ambiguidade anterior entre catalogo Vite estatico e plataforma Next.js com banco real.

A prioridade e ter uma unica fonte de verdade, uma operacao simples e uma vitrine publica com alta fidelidade ao design original.

## 2. Requisitos do Catalogo Publico

- O catalogo publico deve existir na `aqua-platform`.
- O catalogo publico deve consultar produtos, categorias e configuracoes no banco real.
- O catalogo publico nao deve ler `products.json` em producao.
- Produto ativo criado no admin deve aparecer no catalogo sem edicao manual de codigo.
- Produto editado no admin deve refletir a alteracao na vitrine publica.
- Produto inativado ou em rascunho nao deve aparecer publicamente.
- Produtos vinculados a categorias inativas nao devem aparecer publicamente.
- Categorias inativas nao devem aparecer nos filtros publicos.
- A vitrine deve manter categorias, destaques, promocoes, catalogo filtravel, CTA WhatsApp, revendedores, sobre, social e footer.
- O detalhe de produto deve permitir contato via WhatsApp com mensagem contextual.
- A experiencia deve funcionar bem em mobile, tablet e desktop.

## 3. Requisitos do Admin

- `/admin` deve continuar protegido por autenticacao.
- O login deve usar Google OAuth via Supabase Auth.
- A autorizacao deve ser validada no servidor por usuario ativo em `admin_users`.
- Usuarios autenticados no Google, mas nao cadastrados como admin ativo, nao podem acessar o painel.
- Perfil `strategic` deve gerenciar produtos, categorias, configuracoes e areas sensiveis.
- Perfil `operational` deve acessar apenas areas operacionais permitidas.
- Mutacoes administrativas devem ocorrer por Server Actions ou endpoints server-side protegidos.
- CRUD de produtos e categorias deve revalidar a vitrine publica.
- O painel deve manter linguagem visual premium, mas pode ser mais operacional e denso que a vitrine.

## 4. Requisitos de Autenticacao e Permissoes

- A sessao deve ser validada no servidor para rotas privadas.
- O proxy/middleware nao pode ser o unico controle de acesso.
- Server Actions sensiveis devem chamar validacao de permissao.
- Usuarios inativos devem perder acesso mesmo que tenham sessao Google valida.
- Rotas publicas nao devem expor informacoes administrativas.

## 5. Requisitos de Banco de Dados

- Supabase Postgres e a fonte unica de verdade em producao.
- Prisma e a camada oficial para schema, migrations e acesso server-side.
- O schema deve continuar cobrindo `Product`, `Category`, `StoreSetting`, `AdminUser`, `Sale` e `Event`.
- `products.json` pode ser usado apenas como legado, referencia ou seed/importacao inicial.
- O sistema deve evitar duas fontes de verdade em producao.
- Slugs de produtos e categorias devem ser unicos.
- Produtos devem ter status suficiente para separar rascunho, ativo e inativo.
- Categorias devem permitir ordenacao e ativacao/inativacao.

## 6. Requisitos de Storage

- Imagens de produto devem usar Supabase Storage ou URLs persistidas administrativamente.
- A escrita no storage deve exigir usuario autenticado e autorizado.
- A leitura de midias da vitrine pode ser publica quando necessario.
- O banco deve guardar referencias das imagens e sua ordem.
- Uploads devem validar tamanho, tipo de arquivo e destino permitido.

## 7. Requisitos de UX

- A vitrine publica deve reproduzir com alta fidelidade a experiencia visual do catalogo Vite antigo.
- A vitrine nao deve parecer ERP, dashboard, template generico ou ecommerce sem identidade.
- O fluxo publico deve priorizar desejo, exploracao e conversao para WhatsApp.
- O admin deve priorizar clareza, poucos passos e baixa friccao operacional.
- Estados vazios devem orientar a acao correta, sem linguagem tecnica excessiva.
- Mobile deve ter scroll confortavel, imagens fortes, filtros acessiveis e CTAs visiveis.

## 8. Requisitos de Consistencia Visual

- A paleta principal deve preservar fundo escuro, ivory, mist beige, aqua gold e soft aqua.
- Tipografia editorial para titulos e fonte limpa para interface devem permanecer como diretriz.
- Hero, cards, filtros, CTAs, secoes institucionais e modal/detalhe devem seguir o catalogo antigo.
- A pagina publica atual da `aqua-platform` nao deve ser considerada destino visual final.
- Refatoracoes visuais so devem acontecer depois de validar fidelidade ao catalogo antigo.

## 9. Requisitos de Performance

- A vitrine deve carregar rapidamente em mobile e desktop.
- Imagens devem ser otimizadas, dimensionadas e carregadas com estrategia adequada.
- Conteudo abaixo da primeira dobra pode usar carregamento progressivo quando fizer sentido.
- Consultas publicas devem buscar apenas dados necessarios para a vitrine.
- Cache e revalidacao devem equilibrar performance e atualizacao apos mudancas no admin.

## 10. Requisitos de Seguranca

- Rotas privadas devem exigir autenticacao e permissao.
- Mutacoes devem validar input no servidor.
- Uploads devem ser restritos por tipo, tamanho e destino.
- Endpoints publicos devem limitar payload e nao expor stack traces.
- Analytics deve coletar apenas dados necessarios ao negocio.
- IP bruto e dados pessoais desnecessarios nao devem ser persistidos.

## 11. Requisitos de Deploy

- O deploy oficial final deve ser unico e baseado na `aqua-platform`.
- Vite deve sair do caminho produtivo apos aceite da migracao.
- Variaveis de ambiente da `aqua-platform` devem cobrir banco, Supabase, Auth, Storage e URLs publicas.
- Deploy deve validar build, lint, testes e preflight de ativacao quando aplicavel.
- Rollback deve ser documentado pela plataforma de deploy oficial.

## 12. Requisitos de Conteudo e SEO

- A vitrine deve ter titulo, descricao, Open Graph e metadados basicos.
- Produtos e categorias devem ter slugs amigaveis.
- Textos institucionais, WhatsApp, Instagram e conteudo legal devem vir de configuracoes persistidas.
- Conteudo publico deve ser indexavel sempre que possivel.
- O sitemap e robots devem refletir a aplicacao oficial apos a migracao.

## 13. Requisitos Nao Funcionais

- O sistema deve ser simples de operar.
- O sistema deve ser sustentavel para evoluir.
- O sistema deve reduzir retrabalho manual.
- A arquitetura deve permitir futuras expansoes para CRM, automacoes e analytics avancado.
- A documentacao oficial deve deixar claro que nao havera dois apps independentes em producao.

## 14. Criterios de Aceite

- Produto ativo criado no admin aparece no catalogo publico.
- Produto inativo ou em rascunho nao aparece no catalogo publico.
- Categoria inativa oculta seus produtos e nao aparece nos filtros.
- Alteracao de configuracao publica aparece na vitrine sem deploy manual de codigo.
- `/admin` bloqueia usuarios sem permissao.
- Upload de imagem funciona e a imagem aparece na vitrine.
- Vitrine final preserva a experiencia visual do catalogo antigo.
- Producao final usa uma unica fonte de verdade.
