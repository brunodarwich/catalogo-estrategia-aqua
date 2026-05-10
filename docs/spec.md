# AQUA — Spec Oficial da Nova Fase

Versao: 1.0  
Status: Direcao oficial  
Data: 2026-05-10

## 1. Visao do Produto

A AQUA deve operar como uma plataforma unica para vitrine publica premium e gestao administrativa. O produto final precisa combinar uma experiencia publica sofisticada, inspirada no catalogo Vite original, com uma operacao simples, persistente e segura no painel administrativo.

O catalogo publico continua sendo a principal experiencia de marca e conversao. O painel administrativo passa a ser a fonte operacional para produtos, categorias, midias, configuracoes, vendas e metricas.

## 2. Problema Atual

Durante a execucao do projeto foi descoberta uma duplicidade real de arquitetura:

- o catalogo publico antigo em React + Vite, na raiz do projeto, ainda le `src/data/products.json`;
- a aplicacao `aqua-platform`, em Next.js, ja possui Supabase, Prisma, login Google, storage, painel administrativo e gravacao em banco real.

Essa duplicidade criou duas fontes de verdade. Produtos criados ou editados no admin da `aqua-platform` nao aparecem automaticamente no catalogo Vite, porque a vitrine antiga nao consulta o banco.

Essa descoberta nao e falha de processo; e aprendizado normal de arquitetura durante a evolucao do MVP. A nova documentacao existe para substituir a ambiguidade anterior.

## 3. Objetivo da Nova Fase

Eliminar a duplicidade entre catalogo e admin, consolidando o projeto em uma unica plataforma coerente. A nova fase deve:

- definir um app oficial de producao;
- estabelecer banco real como fonte unica de verdade;
- manter o painel administrativo protegido;
- preservar com alta fidelidade a experiencia visual do catalogo antigo;
- simplificar deploy, manutencao e evolucao futura.

## 4. Decisao Arquitetural Recomendada

A aplicacao oficial passa a ser a `aqua-platform`, baseada em Next.js App Router, Supabase Postgres, Prisma, Supabase Auth, Google OAuth e Supabase Storage.

O catalogo Vite deixa de ser app produtivo apos a migracao. Ele permanece como legado temporario e referencia visual obrigatoria da vitrine publica final.

## 5. Justificativa

Unificar tudo no Next.js e a decisao mais simples e sustentavel porque a `aqua-platform` ja concentra:

- banco real via Supabase Postgres;
- schema e acesso server-side via Prisma;
- login Google e validacao de sessao;
- autorizacao por `admin_users`;
- storage de imagens;
- painel administrativo;
- rotas publicas dinamicas possiveis no mesmo deploy.

Manter Vite em producao e integra-lo ao banco preservaria dois apps, dois fluxos de deploy e maior risco operacional. A solucao final deve reduzir complexidade, nao distribui-la.

## 6. Escopo do Catalogo Publico

A vitrine publica final deve existir dentro da `aqua-platform` e consultar o banco real. Ela deve conter:

- hero cinematografico com poster/video, overlay escuro, headline curta e CTAs;
- navegacao por categorias ativas;
- produtos em destaque;
- promocoes;
- catalogo filtravel;
- cards premium de produto;
- modal ou detalhe de produto com CTA WhatsApp contextual;
- secao de revendedores;
- secao institucional sobre a AQUA;
- links sociais;
- footer com contatos e conteudo legal;
- SEO basico e metadados compartilhaveis.

## 7. Escopo do Painel Administrativo

O painel administrativo deve permanecer em `/admin` dentro da `aqua-platform` e incluir:

- login Google via Supabase Auth;
- validacao server-side de usuario autorizado;
- permissoes por tabela `admin_users`;
- gestao de produtos;
- gestao de categorias;
- configuracoes da loja;
- upload e gestao de imagens no Supabase Storage;
- vendas;
- analytics e eventos de negocio;
- separacao entre perfis `operational` e `strategic`.

## 8. Regras de Integracao entre Publico e Admin

- Produto criado no admin com status `active` e categoria ativa deve aparecer no catalogo publico sem edicao manual de codigo.
- Produto `draft` ou `inactive` nao deve aparecer publicamente.
- Produto vinculado a categoria inativa nao deve aparecer publicamente.
- Categoria inativa nao deve aparecer nos filtros publicos.
- Alteracoes em produto, categoria e configuracoes devem revalidar ou atualizar a vitrine publica.
- Imagens usadas na vitrine devem vir do storage ou de URLs persistidas no banco.
- O catalogo publico nao deve depender de `products.json` em producao.

## 9. Fonte Unica de Verdade

A fonte unica de verdade para producao e o Supabase Postgres acessado por Prisma na `aqua-platform`.

Dados oficiais:

- produtos: tabela `products`;
- categorias: tabela `categories`;
- configuracoes: tabela `store_settings`;
- usuarios administrativos: tabela `admin_users`;
- vendas: tabela `sales`;
- eventos: tabela `events`;
- midias: Supabase Storage com referencias persistidas no banco.

O arquivo `products.json` pode existir apenas como legado, referencia historica ou seed/importacao inicial controlada. Ele nao pode ser usado como fonte produtiva da vitrine final.

## 10. Preservacao Visual

O design do catalogo Vite antigo e parte central do valor do projeto. Ele nao e apenas inspiracao: e a referencia principal da vitrine publica final.

A pagina publica atual da `aqua-platform` prova que os dados do banco podem alimentar a vitrine, mas nao representa a experiencia visual final. A migracao deve reproduzir a linguagem premium, sensorial e cinematografica do catalogo antigo com alta fidelidade.

## 11. Criterios de Sucesso

O projeto sera considerado estabilizado quando:

- houver um unico app oficial em producao;
- publico e admin conviverem na `aqua-platform`;
- a vitrine publica consultar o banco real;
- produto ativo criado no admin aparecer no catalogo sem alteracao manual de codigo;
- produtos e categorias inativos forem ocultados corretamente;
- `/admin` estiver protegido por login e permissao;
- uploads de imagem funcionarem pelo storage;
- o deploy oficial nao depender do Vite;
- a experiencia visual do catalogo antigo estiver preservada com alta fidelidade;
- a documentacao anterior conflitante estiver claramente substituida por esta base.

## 12. Caminho Preferencial

A recomendacao objetiva e: **unificar tudo no Next.js**, migrando a interface publica para a `aqua-platform` e mantendo o Vite como referencia visual e legado temporario ate a aprovacao final.
