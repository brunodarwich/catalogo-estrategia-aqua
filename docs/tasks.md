# AQUA — Tasks Oficiais da Nova Fase

Versao: 1.0  
Status: Plano de execucao oficial  
Data: 2026-05-10

## 1. Diagnostico e Congelamento de Decisao

Status: concluido em documentacao.

Objetivo: registrar a realidade atual e encerrar a ambiguidade entre dois apps produtivos.

Tasks:

- [x] Confirmar que o catalogo Vite na raiz ainda le `src/data/products.json`.
- [x] Confirmar que a `aqua-platform` grava produtos, categorias e configuracoes no banco real via Prisma/Supabase.
- [x] Registrar que a documentacao anterior oscilou entre manter Vite e criar plataforma Next.js.
- [x] Marcar a nova documentacao como fonte oficial de decisao.
- [x] Registrar que a descoberta de arquitetura durante a execucao foi aprendizado normal do projeto.

Dependencias:

- Leitura do estado atual do repositorio.
- Revisao de `docs/spec.md`, `docs/requirements.md` e `docs/design.md`.

Riscos:

- Continuar tratando Vite e Next.js como apps equivalentes.
- Preservar documentacao antiga sem indicar qual direcao e oficial.

Criterio de aceite:

- [x] Existe decisao documentada de que a producao final tera um unico app oficial.
- [x] Nao ha ambiguidade sobre manter dois apps independentes em producao.

## 2. Arquitetura Alvo

Status: concluido como decisao arquitetural oficial.

Objetivo: consolidar a `aqua-platform` como aplicacao oficial.

Tasks:

- [x] Definir `aqua-platform` como app oficial de producao.
- [x] Definir Supabase Postgres como fonte unica de verdade.
- [x] Definir Prisma como camada oficial de schema, migrations e acesso server-side.
- [x] Definir Supabase Auth/Google OAuth como autenticacao oficial.
- [x] Definir Supabase Storage como storage oficial de midias administraveis.
- [x] Definir Vite como legado temporario e referencia visual.

Dependencias:

- Schema Prisma existente.
- Configuracao Supabase e variaveis reais.

Riscos:

- Integrar Vite ao banco e manter dois fluxos de deploy.
- Aumentar complexidade operacional tentando preservar a arquitetura antiga.

Criterio de aceite:

- [x] A arquitetura alvo esta registrada e aponta para Next.js unificado.
- [x] Vite nao e descrito como app produtivo final.

## 3. Migracao Visual da Vitrine Publica

Status: implementacao inicial concluida e validada localmente em desktop/mobile; comparacao final de alta fidelidade ainda depende de aceite visual.

Objetivo: reproduzir a experiencia publica do catalogo Vite dentro da `aqua-platform`.

Tasks:

- [x] Mapear componentes visuais do Vite: hero, categorias, highlights, grid, card, modal, filtros, revendedores, sobre, social e footer.
- [x] Portar ou reproduzir a composicao visual no Next.js.
- [x] Manter paleta, tipografia, atmosfera escura, CTAs e ritmo de scroll.
- [x] Substituir dados estaticos por props vindas de queries ao banco.
- [x] Validar desktop e mobile contra a experiencia antiga.

Mapa inicial:

- [x] Hero: `src/components/Hero.jsx` e `src/components/Hero.css`.
- [x] Categorias: `src/components/CategorySection.jsx` e `src/components/CategorySection.css`.
- [x] Highlights: `src/components/HighlightRow.jsx` e `src/components/HighlightRow.css`.
- [x] Catalogo/grid: `src/components/ProductGrid.jsx` e `src/components/ProductGrid.css`.
- [x] Card: `src/components/ProductCard.jsx` e `src/components/ProductCard.css`.
- [x] Modal/detalhe: `src/components/ProductModal.jsx` e `src/components/ProductModal.css`.
- [x] Filtros: `src/components/FilterBar.jsx` e `src/components/FilterBar.css`.
- [x] Secoes institucionais, social e footer: composicao atual em `src/App.jsx` e `src/App.css`.

Dependencias:

- `docs/design.md` como referencia visual.
- Dados minimos no banco para renderizar a vitrine.

Riscos:

- Usar a home publica atual da `aqua-platform` como destino final.
- Refatorar demais antes de preservar fidelidade.
- Transformar a vitrine em interface administrativa.

Criterio de aceite:

- [ ] A vitrine Next.js e reconhecivel como evolucao fiel do catalogo Vite antigo.
- [x] Hero, cards, filtros, modal/detalhe e secoes institucionais estao presentes.
- [x] Mobile e desktop nao apresentam descaracterizacao visual.

## 4. Migracao de Dados

Objetivo: remover a dependencia produtiva do arquivo estatico.

Tasks:

- [ ] Usar `products.json` apenas como seed/importacao inicial, quando necessario.
- [ ] Garantir que produtos estejam persistidos em `products`.
- [ ] Garantir que categorias estejam persistidas em `categories`.
- [ ] Garantir que configuracoes publicas estejam persistidas em `store_settings`.
- [ ] Revisar slugs, status, destaque, promocao e imagens importadas.
- [ ] Documentar que alteracoes futuras devem acontecer pelo admin ou por scripts controlados.

Dependencias:

- Banco Supabase configurado.
- Migrations Prisma aplicadas.
- Seed revisado.

Riscos:

- Atualizar JSON depois da migracao e esperar reflexo em producao.
- Duplicar dados divergentes entre seed e banco real.

Criterio de aceite:

- [ ] Vitrine publica nao depende de `products.json`.
- [ ] Banco contem dados suficientes para operar o catalogo.
- [ ] `products.json` esta tratado como legado, referencia ou seed.

## 5. Conexao Publico-Admin

Status: conexao funcional implementada na home da `aqua-platform`; aceite final ainda depende de teste com banco real.

Objetivo: garantir que a vitrine publica reflita o que e gerido no admin.

Tasks:

- [x] Fazer a home publica consultar categorias ativas no banco.
- [x] Fazer a home publica consultar produtos `active` em categorias ativas.
- [x] Fazer destaques e promocoes virem dos campos persistidos.
- [x] Fazer configuracoes publicas virem de `store_settings`.
- [x] Revalidar rotas publicas apos criar, editar ou inativar produto.
- [x] Revalidar rotas publicas apos criar, editar ou inativar categoria.
- [x] Revalidar rotas publicas apos alterar configuracoes da loja.

Dependencias:

- Vitrine migrada para Next.js.
- Server Actions administrativas funcionando.

Riscos:

- Mutacao no admin salvar no banco, mas cache publico continuar antigo.
- Produto ativo nao aparecer por regra divergente entre admin e publico.

Criterio de aceite:

- [ ] Produto ativo criado no admin aparece no catalogo sem edicao de codigo.
- [ ] Produto inativado some do catalogo.
- [ ] Categoria inativa some dos filtros e oculta seus produtos.
- [ ] Configuracoes alteradas no admin aparecem na vitrine.

## 6. Validacao de Login, Permissoes e Storage

Objetivo: estabilizar operacao segura do painel.

Tasks:

- [ ] Validar Google OAuth em ambiente local e producao.
- [ ] Validar bloqueio de usuario sem registro em `admin_users`.
- [ ] Validar acesso de usuario `operational`.
- [ ] Validar acesso de usuario `strategic`.
- [ ] Validar protecao server-side das Server Actions.
- [ ] Validar upload de imagem no Supabase Storage.
- [ ] Validar exibicao publica da imagem.
- [ ] Validar restricoes de tipo, tamanho e destino de upload.

Dependencias:

- Variaveis Supabase/Auth configuradas.
- Bucket de storage criado e politicas aplicadas.
- Usuario admin inicial cadastrado.

Riscos:

- Confiar apenas no middleware para protecao.
- Permitir escrita em storage sem autorizacao adequada.
- Usuario autenticado, mas nao autorizado, acessar painel.

Criterio de aceite:

- [ ] `/admin` esta protegido por sessao e permissao.
- [ ] Mutacoes sensiveis exigem usuario autorizado.
- [ ] Upload funciona e imagem aparece corretamente na vitrine.

## 7. Unificacao de Deploy

Objetivo: publicar uma unica aplicacao oficial.

Tasks:

- [ ] Configurar deploy oficial da `aqua-platform`.
- [ ] Revisar variaveis de ambiente de producao.
- [ ] Atualizar documentacao operacional para apontar a `aqua-platform`.
- [ ] Remover Vite do caminho produtivo ou mante-lo apenas arquivado/legado.
- [ ] Validar URL publica e `/admin` no mesmo app.
- [ ] Definir estrategia de rollback no provedor de deploy.

Dependencias:

- Build da `aqua-platform` passando.
- Banco, Auth e Storage configurados em producao.
- Vitrine migrada e validada.

Riscos:

- Deployar Vite e Next.js separadamente e recriar a duplicidade.
- Manter variaveis antigas como fonte de configuracao publica final.

Criterio de aceite:

- [ ] Uma unica URL oficial serve vitrine publica e admin.
- [ ] Vite nao e necessario para operacao produtiva.
- [ ] Deploy final usa banco como fonte unica.

## 8. QA Final

Status: iniciado com validacoes locais da vitrine Next.js; ainda falta QA completo com banco/login/storage em ambiente real.

Objetivo: validar comportamento, seguranca, design e operacao antes de considerar a nova fase concluida.

Tasks:

- [x] Testar catalogo publico em desktop e mobile.
- [x] Testar filtros por categoria.
- [x] Testar destaques e promocoes.
- [x] Testar modal ou detalhe de produto.
- [x] Testar CTA WhatsApp geral e por produto.
- [ ] Testar criacao, edicao e inativacao de produto.
- [ ] Testar criacao, edicao e inativacao de categoria.
- [ ] Testar alteracao de configuracoes publicas.
- [ ] Testar upload e exibicao de imagem.
- [ ] Testar login sem sessao.
- [ ] Testar login com usuario nao autorizado.
- [ ] Testar permissoes `operational` e `strategic`.
- [x] Testar build, lint e suite automatizada existente.
- [ ] Comparar visualmente a vitrine final com o catalogo Vite antigo.

Dependencias:

- Todas as fases anteriores concluidas.

Riscos:

- Validar apenas funcionamento tecnico e ignorar fidelidade visual.
- Validar apenas visual e ignorar fonte unica de verdade.

Criterio de aceite:

- [ ] Sistema opera sem duas fontes de verdade.
- [ ] Admin e publico estao integrados.
- [ ] Design antigo foi preservado com alta fidelidade.
- [ ] Operacao final e simples, coerente e sustentavel.

## 9. Checklist de Aceite Final

- [ ] `aqua-platform` e o app oficial.
- [ ] Vite nao e app produtivo final.
- [ ] Banco Supabase Postgres e fonte unica de verdade.
- [ ] `products.json` nao alimenta a vitrine publica em producao.
- [ ] Produto ativo criado no admin aparece no catalogo.
- [ ] Produto inativo ou rascunho nao aparece no catalogo.
- [ ] Categoria inativa oculta produtos e filtro.
- [ ] Configuracoes publicas vem do banco.
- [ ] Imagens sao geridas por storage ou URLs persistidas.
- [ ] `/admin` exige autenticacao e permissao.
- [ ] Roles `operational` e `strategic` foram validadas.
- [ ] Deploy oficial e unico.
- [ ] SEO basico foi validado.
- [ ] Mobile e desktop foram validados.
- [ ] Experiencia visual do catalogo antigo foi preservada.

## 10. Separacao dos Tipos de Trabalho

### Migracao visual

Portar/reproduzir a vitrine Vite na `aqua-platform`, preservando experiencia, hierarquia e identidade.

### Migracao de dados

Tirar a vitrine do JSON e conecta-la ao banco real, usando seed apenas como apoio inicial.

### Estabilizacao operacional

Validar admin, login, permissoes, storage, deploy, revalidacao e QA final.

## 11. Recomendacao de Caminho Preferencial

Seguir com **unificacao total no Next.js**. Nao manter Vite integrado ao banco como solucao final e nao recomecar a interface do zero. O melhor caminho e migrar a vitrine antiga para a `aqua-platform`, preservando sua identidade e conectando-a ao banco real.
