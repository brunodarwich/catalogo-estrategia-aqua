# AQUA — Tasks 2: Acabamento para Projeto Redondo

Versao: 0.1  
Status: Backlog detalhado pos-diagnostico  
Ultima atualizacao: 2026-05-10

Status em 2026-05-10: execucao iniciada pela Prioridade 1. SEO basico da raiz iniciado com `canonical`, `robots.txt` e `sitemap.xml`; `index.html` revisado e `og:image` validado como acessivel em producao; `robots.txt` e `sitemap.xml` validados em preview local apos ajuste de roteamento da Vercel; Lighthouse local registrado com 68/95/100/100 (performance/acessibilidade/best practices/SEO), LCP em 7,8 s e TBT em 0 ms; fluxo comercial desktop revalidado em preview local com 18 produtos ativos visiveis, 4 categorias ativas, destaque/promocao coerentes, modal abrindo/fechando e CTAs de WhatsApp em nova aba com mensagem correta; testes do catalogo expandidos para ordenacao e fallback de imagem; checklist tecnico da raiz revalidado com `test`, `lint`, `build` e `audit`; encontrado bug em producao no CTA de WhatsApp do modal usando mensagem fixa de outro produto, com correcao local aplicada e validada em preview local, ainda pendente de redeploy/revalidacao em producao; performance mapeada com `hero-video.mp4` local em ~10,5 MB e 17 produtos ainda apontando para imagens externas; identificado que `robots.txt` e `sitemap.xml` em producao atual caem no fallback da SPA, com ajuste de roteamento da Vercel aplicado localmente e pendente de deploy; em `aqua-platform`, gate tecnico local (`test`, `lint`, `build`, `audit`) validado, testes unitarios de preco promocional, venda (status e produto opcional) e eventos (payload/origin) expandidos, e iniciada a Prioridade 2 com preflight local de ativacao para validar envs antes de migracao/seed e documentacao do seed idempotente.

---

## 0. Direcao Geral

Objetivo: transformar o projeto de "MVP funcional + plataforma preparada" em uma operacao redonda, segura, validada e pronta para evolucao comercial.

Decisoes de base:

- [x] Manter a producao atual como catalogo Vite na raiz.
- [x] Tratar `aqua-platform/` como proxima fase fullstack.
- [x] Nao expor `aqua-platform/` em producao antes de validar Supabase, Google OAuth, Storage, permissoes e dados reais.
- [x] Usar `docs/operacao-producao-e-plataforma.md` como guia operacional.

Critério de aceite:

- [ ] Existe uma ordem clara de execucao para estabilizar o projeto.
- [ ] Cada item tem resultado esperado e nao depende de decisoes abertas.
- [ ] O projeto pode ser entregue, operado e evoluido sem depender de memoria informal.

---

## 1. Fechamento da Producao Atual Vite

Objetivo: garantir que o catalogo publico atual continue bonito, rapido, seguro e facil de publicar enquanto a plataforma Next.js amadurece.

### 1.1 Validacao visual e comercial

- [ ] Revalidar a home em desktop, tablet e mobile.
- [ ] Revalidar o hero com video e poster em conexao rapida e lenta.
- [x] Conferir se todos os produtos ativos aparecem no catalogo.
- [x] Conferir se produtos inativos nao aparecem.
- [x] Conferir se categorias inativas nao aparecem.
- [x] Conferir se promocoes exibem preco promocional corretamente.
- [x] Conferir se os produtos em destaque aparecem antes quando esperado.
- [x] Conferir se o modal de produto abre, fecha e mantem CTA correto.
- [x] Conferir se todos os CTAs de WhatsApp abrem em nova aba com mensagem correta.
- [x] Conferir se o CTA de revendedor tem mensagem diferente do CTA geral.
- [x] Conferir se links de Instagram, politicas e termos funcionam.

Critério de aceite:

- [ ] Fluxo principal "ver produto -> abrir modal -> chamar WhatsApp" funciona em desktop e mobile.
- [ ] Nao ha quebra visual perceptivel em largura pequena.
- [ ] Produto sem imagem usa fallback aceitavel.

Observacao: na validacao manual de 2026-05-10, a home abriu em producao e o modal exibiu o produto correto, mas o CTA de WhatsApp do modal estava usando uma mensagem fixa com outro SKU. O codigo local foi endurecido para ignorar templates sem `{productName}` e `{productSku}`; o preview local voltou a gerar o link correto por produto, mas ainda falta novo deploy e revalidacao do fluxo em producao.

Observacao local: no preview da raiz em 2026-05-10, o catalogo exibiu 18 produtos ativos e 4 categorias ativas, sem vazamento de itens inativos; os 6 primeiros cards do catalogo coincidiram com a lista de destaque; a secao de ofertas exibiu preco base e promocional nos 3 produtos em promocao; hero, CTA geral, CTA de revendedor, CTA do modal e links de contato abriram `wa.me` em nova aba com `noopener noreferrer`. A revalidacao de layout em tablet/mobile real e do hero em rede lenta continua pendente.

### 1.2 SEO, compartilhamento e performance

- [x] Revisar `index.html` com titulo, descricao, Open Graph e Twitter Card finais.
- [x] Validar se `og:image` aponta para imagem publica acessivel em producao.
- [x] Adicionar `canonical` se a URL final oficial ja estiver decidida.
- [x] Criar ou validar `robots.txt`.
- [x] Criar ou validar `sitemap.xml` mesmo que seja simples.
- [x] Rodar Lighthouse ou equivalente e registrar pontuacoes.
- [ ] Otimizar imagens grandes que prejudiquem LCP.
- [x] Avaliar se `hero-video.mp4` precisa de versao menor para mobile.
- [ ] Validar carregamento sem imagens externas, quando possivel.

Observacao: `canonical`, `og:image`, `robots.txt` e `sitemap.xml` apontam para a URL atual de producao `https://catalogo-estrategia-aqua.vercel.app/`. Se houver dominio proprio, atualizar tudo no mesmo bloco.

Observacao de roteamento: a producao atual responde `robots.txt` e `sitemap.xml` com a home por causa do fallback global da SPA. O ajuste local no `vercel.json` passou a priorizar `filesystem` e os dois endpoints responderam corretamente no preview local; apos o proximo deploy, revalidar os dois endpoints em producao.

Observacao de performance: no Lighthouse local de 2026-05-10, a home registrou performance 68, acessibilidade 95, best practices 100 e SEO 100, com LCP em 7,8 s, Speed Index em 4,2 s e TBT em 0 ms. `public/hero-video.mp4` mede aproximadamente 10,5 MB, o que justifica preparar uma versao menor para mobile antes de considerar a home otimizada. O catalogo tambem ainda usa 17 imagens externas em `products.json`, entao a dependencia externa segue como risco de carregamento e consistencia visual.

Critério de aceite:

- [ ] Link compartilhado no WhatsApp/Instagram mostra titulo, descricao e imagem corretos.
- [ ] Performance mobile nao tem gargalo obvio causado por assets pesados.
- [ ] Site e indexavel como catalogo institucional simples.

### 1.3 Operacao de deploy da raiz

- [x] Confirmar que `.vercelignore` continua excluindo `aqua-platform/`, `tmp/`, `logs/` e `.claude/`.
- [ ] Confirmar variaveis `VITE_WHATSAPP_PHONE` e `VITE_WHATSAPP_MESSAGE` em Production e Preview.
- [x] Documentar URL oficial de producao e ultimo deploy validado.
- [x] Rodar antes de deploy: `npm run test`, `npm run lint`, `npm run build`, `npm audit --omit=dev`.
- [x] Registrar procedimento de rollback simples na Vercel.

Observacao: a validacao manual em producao indica que `VITE_WHATSAPP_MESSAGE` precisa ser conferida no painel da Vercel. Se estiver fixa sem placeholders, o codigo novo agora faz fallback para a mensagem dinamica por produto.

Critério de aceite:

- [ ] Qualquer deploy da raiz pode ser feito com checklist claro.
- [ ] Preview e producao nao incluem a plataforma backend por acidente.

---

## 2. Ativacao Real da `aqua-platform`

Objetivo: tirar a plataforma Next.js do estado "compila localmente" para "ambiente real validado com banco, auth, storage e permissoes".

### 2.1 Supabase e banco

- [ ] Criar ou confirmar projeto Supabase oficial da AQUA.
- [ ] Configurar `DATABASE_URL` com pooler recomendado para runtime.
- [ ] Configurar `DIRECT_URL` para migracoes e operacoes diretas.
- [ ] Rodar `npm run db:migrate` em ambiente real.
- [ ] Rodar `npm run db:seed` com emails administrativos configurados.
- [ ] Confirmar tabelas criadas: `admin_users`, `categories`, `products`, `sales`, `events`, `store_settings`.
- [ ] Conferir se categorias e produtos do catalogo foram importados.
- [ ] Conferir se pelo menos um usuario `strategic` foi criado.
- [x] Documentar como repetir seed sem destruir dados reais.

Observacao local de 2026-05-10: o comando `npm run activation:preflight` foi adicionado em `aqua-platform/` para validar placeholders e formato de env antes de ativar o ambiente real. Na configuracao local atual, `DIRECT_URL` ainda aponta para host pooler do Supabase na porta `6543` com `pgbouncer=true`, entao este valor ainda precisa ser trocado por conexao direta antes de rodar `db:migrate` ou `db:seed` contra banco duravel.

Critério de aceite:

- [ ] `npm run db:migrate` conclui sem erro no banco real.
- [ ] `npm run db:seed` cria dados iniciais esperados.
- [ ] Prisma consegue ler e escrever em ambiente real.

### 2.2 Google OAuth e login

- [ ] Configurar provider Google no Supabase Auth.
- [ ] Configurar credenciais OAuth no Google Cloud Console.
- [ ] Adicionar callback do Supabase no Google Cloud Console.
- [ ] Validar login local em `http://localhost:3000`.
- [ ] Validar login em preview da Vercel, se a plataforma for deployada separadamente.
- [ ] Validar login em producao somente quando a plataforma estiver liberada.
- [ ] Validar usuario autorizado com email strategic.
- [ ] Validar usuario autorizado com email operational.
- [ ] Validar usuario Google autenticado, mas nao autorizado.
- [ ] Validar logout e retorno para tela de login.

Critério de aceite:

- [ ] Usuario autorizado acessa `/admin`.
- [ ] Usuario nao autorizado nao acessa `/admin`.
- [ ] Callback OAuth nao permite redirecionamento externo.

### 2.3 Storage de imagens

- [ ] Criar bucket `product-media`.
- [ ] Definir bucket publico apenas para leitura.
- [ ] Restringir escrita a usuarios autenticados.
- [ ] Testar upload de JPG menor que 5 MB.
- [ ] Testar upload de PNG menor que 5 MB.
- [ ] Testar upload de WebP menor que 5 MB.
- [ ] Testar rejeicao de GIF, PDF e arquivo acima de 5 MB.
- [ ] Confirmar URL publica gerada e renderizada no produto.
- [ ] Documentar politica de limpeza de imagens antigas nao usadas.

Critério de aceite:

- [ ] Upload funciona apenas logado.
- [ ] Arquivos invalidos sao rejeitados antes do envio.
- [ ] Imagens aparecem corretamente no admin e no futuro site publico migrado.

---

## 3. Permissoes e UX do Admin

Objetivo: deixar o painel confiavel para uso real por perfis operational e strategic.

### 3.1 Perfil operational

- [ ] Definir exatamente quais telas operational pode acessar.
- [ ] Garantir que operational acesse dashboard operacional.
- [ ] Garantir que operational acesse vendas.
- [ ] Garantir que operational nao acesse produtos, categorias, analytics estrategico e configuracoes.
- [ ] Garantir que Server Actions sensiveis rejeitam operational, mesmo se a UI esconder botoes.
- [ ] Mostrar mensagem amigavel quando um usuario tenta acessar area sem permissao.

Critério de aceite:

- [ ] Operational consegue trabalhar sem ver opcoes proibidas.
- [ ] Operational nao consegue executar mutacoes estrategicas via request manual.

### 3.2 Perfil strategic

- [ ] Validar acesso completo a produtos.
- [ ] Validar acesso completo a categorias.
- [ ] Validar acesso completo a configuracoes.
- [ ] Validar acesso completo a analytics.
- [ ] Validar acesso a vendas e dashboard.
- [ ] Criar ou revisar tela de gestao de administradores, se necessario.
- [ ] Permitir ativar/inativar administradores, se entrar no escopo.
- [ ] Permitir trocar role de administrador, se entrar no escopo.

Critério de aceite:

- [ ] Strategic consegue administrar catalogo, configuracoes e dados comerciais.
- [ ] Mudancas sensiveis ficam protegidas por validacao server-side.

### 3.3 UX de formularios

- [ ] Trocar erros brutos de Server Actions por mensagens visiveis na tela.
- [ ] Mostrar estado de carregamento ao salvar formularios.
- [ ] Mostrar confirmacao ao criar, editar ou inativar registros.
- [ ] Adicionar confirmacao antes de inativar produto ou categoria.
- [ ] Destacar campos obrigatorios.
- [ ] Exibir mensagens claras para SKU duplicado, slug duplicado e registro inexistente.
- [ ] Evitar perda acidental de dados em formularios longos.
- [ ] Melhorar layout de edicao inline de produtos para muitos itens.

Critério de aceite:

- [ ] Usuario entende o que aconteceu apos cada acao.
- [ ] Erros esperados nao aparecem como stack trace ou tela quebrada.

---

## 4. Dados, Regras de Negocio e Integridade

Objetivo: proteger o banco contra dados ruins e deixar as regras comerciais explicitas.

### 4.1 Produtos

- [ ] Validar nome obrigatorio.
- [ ] Validar SKU obrigatorio e unico.
- [ ] Validar slug obrigatorio e unico.
- [ ] Validar categoria obrigatoria e existente.
- [ ] Validar preco base maior ou igual a zero.
- [ ] Validar preco promocional menor que preco base, se essa for a regra comercial.
- [ ] Definir se produto em promocao exige preco promocional.
- [ ] Definir se produto ativo exige pelo menos uma imagem.
- [ ] Definir limite maximo de imagens por produto.
- [ ] Definir regra para produto com vendas vinculadas.

Critério de aceite:

- [ ] Produto publicado tem dados suficientes para aparecer bem no catalogo.
- [ ] Duplicidades e referencias invalidas sao bloqueadas com mensagem clara.

### 4.2 Categorias

- [ ] Validar nome obrigatorio.
- [ ] Validar slug obrigatorio e unico.
- [ ] Definir comportamento ao inativar categoria com produtos ativos.
- [ ] Definir se `id` da categoria pode mudar ou deve ser imutavel.
- [ ] Validar ordenacao por `displayOrder`.
- [ ] Criar teste para categoria inativa esconder produtos no publico futuro.

Critério de aceite:

- [ ] Categoria inativa nao quebra produtos existentes.
- [ ] Ordenacao do catalogo e previsivel.

### 4.3 Vendas

- [ ] Validar quantidade minima 1.
- [ ] Validar preco unitario maior ou igual a zero.
- [ ] Definir se venda pode existir sem produto vinculado.
- [ ] Definir canais aceitos: WhatsApp, Instagram, presencial, outro.
- [ ] Definir se venda cancelada entra ou nao em metricas.
- [ ] Definir se venda pendente entra em previsao de faturamento.
- [ ] Criar historico simples de alteracao de status, se necessario.

Critério de aceite:

- [ ] Dashboard calcula faturamento de forma coerente com status.
- [ ] Vendas manuais nao geram totais negativos ou inconsistentes.

### 4.4 Configuracoes da loja

- [ ] Validar WhatsApp em formato internacional.
- [ ] Validar URL do Instagram.
- [ ] Validar URLs de logo, hero video e poster.
- [ ] Definir fallback quando configuracao publica estiver vazia.
- [ ] Definir quais configuracoes podem ser publicas.
- [ ] Evitar salvar dados sensiveis em `store_settings`.

Critério de aceite:

- [ ] Configuracoes invalidas nao quebram a experiencia publica.
- [ ] Dados publicos expostos por `/api/store-settings` sao intencionais.

---

## 5. Analytics e Privacidade

Objetivo: transformar o endpoint de eventos em uma base confiavel de metricas de negocio sem coletar dados pessoais desnecessarios.

### 5.1 Coleta de eventos

- [ ] Integrar tracking real no site publico atual ou na futura migracao Next.
- [ ] Registrar `page_view` ao carregar a home.
- [ ] Registrar `category_view` ao selecionar categoria.
- [ ] Registrar `product_view` ao abrir modal/detalhe.
- [ ] Registrar `whatsapp_click` em CTA geral e CTA de produto.
- [ ] Registrar `promotion_click` em area de promocoes.
- [ ] Registrar `reseller_cta_click` no CTA de revendedores.
- [ ] Evitar eventos duplicados por renderizacao repetida.
- [ ] Definir `source` padrao para trafego sem UTM.

Critério de aceite:

- [ ] Eventos aparecem no banco com tipos corretos.
- [ ] Nenhum evento armazena IP bruto ou dados pessoais desnecessarios.

### 5.2 Qualidade dos dados

- [ ] Criar rotina de agregacao por periodo.
- [ ] Criar filtros por data no dashboard de analytics.
- [ ] Criar ranking de produtos mais vistos.
- [ ] Criar ranking de produtos com mais cliques no WhatsApp.
- [ ] Criar taxa simples de conversao: product view -> WhatsApp click.
- [ ] Separar origem de trafego por `source`.
- [ ] Definir politica de retencao de eventos antigos.

Critério de aceite:

- [ ] Dashboard responde perguntas comerciais reais.
- [ ] Eventos antigos nao crescem sem controle.

### 5.3 Privacidade e LGPD

- [ ] Revisar texto de privacidade atual.
- [ ] Declarar que eventos sao anonimos e usados para metricas de negocio.
- [ ] Confirmar que nenhum dado pessoal e enviado no `metadata`.
- [ ] Documentar base legal e finalidade em linguagem simples.
- [ ] Adicionar opt-out se a estrategia futura exigir cookies ou identificadores persistentes.

Critério de aceite:

- [ ] Politica publica condiz com o que o sistema realmente coleta.
- [ ] Analytics permanece minimalista e proporcional.

---

## 6. Migracao do Publico para Next.js

Objetivo: decidir e executar, no momento certo, a migracao do catalogo publico Vite para `aqua-platform`, para que catalogo e admin usem os mesmos dados.

### 6.1 Decisao de corte

- [ ] Definir se o catalogo publico deve continuar Vite por mais tempo ou migrar para Next.
- [ ] Definir URL final da plataforma: mesma URL atual ou subdominio separado.
- [ ] Definir estrategia de transicao sem queda: preview, teste, producao.
- [ ] Definir se Vite vira legado/arquivo depois da migracao.

Critério de aceite:

- [ ] A equipe sabe quando o Vite deixa de ser a fonte publica.
- [ ] Nao ha duas fontes de verdade para produto em producao.

### 6.2 Portar experiencia publica

- [ ] Portar layout visual do Vite para Next sem regressao estetica.
- [ ] Reaproveitar textos, secoes e estrutura de catalogo.
- [ ] Trocar leitura de `products.json` por consultas Prisma.
- [ ] Respeitar regras de produto ativo e categoria ativa.
- [ ] Implementar pagina ou rota para produto individual, se fizer sentido para SEO.
- [ ] Implementar metadata dinamica por produto/categoria, se houver rotas individuais.
- [ ] Integrar configuracoes de loja vindas de `store_settings`.
- [ ] Integrar analytics real nos CTAs e visualizacoes.

Critério de aceite:

- [ ] O usuario final ve a mesma qualidade visual ou melhor.
- [ ] Mudanca feita no admin aparece no site publico sem editar codigo.

### 6.3 Compatibilidade e redirecionamentos

- [ ] Mapear URLs atuais.
- [ ] Garantir que links antigos continuem funcionando.
- [ ] Configurar redirects se criar rotas novas.
- [ ] Validar Open Graph no novo ambiente.
- [ ] Validar WhatsApp e Instagram apos migracao.

Critério de aceite:

- [ ] Migracao nao quebra compartilhamentos existentes.
- [ ] SEO nao regride por erro de URL ou metadata.

---

## 7. Testes Automatizados e QA

Objetivo: sair de confianca manual para uma rede minima de seguranca automatizada.

### 7.1 Testes unitarios atuais

- [x] Criar testes para contrato de catalogo/WhatsApp na raiz.
- [x] Criar testes de seguranca e validacao em `aqua-platform`.
- [x] Expandir testes de helpers de catalogo para ordenacao e fallback de imagem.
- [x] Expandir testes de validacao de produto para preco promocional.
- [x] Expandir testes de validacao de venda para status e produto opcional.
- [x] Expandir testes de eventos para limite de payload e origem ausente.

Critério de aceite:

- [ ] `npm run test` cobre regras criticas de dados e seguranca.
- [ ] Bugs comuns sao pegos antes do build.

### 7.2 Testes de integracao

- [ ] Criar ambiente de teste com banco isolado ou mock controlado.
- [ ] Testar create/update/inactivate de produto contra banco.
- [ ] Testar create/update/cancel de venda contra banco.
- [ ] Testar create/update/inactivate de categoria contra banco.
- [ ] Testar `/api/events` gravando evento valido.
- [ ] Testar `/api/events` rejeitando origem invalida.
- [ ] Testar `/api/store-settings` retornando somente configuracao publica.

Critério de aceite:

- [ ] Fluxos principais do admin sao testados fora do browser.
- [ ] Endpoints publicos tem cobertura de sucesso e erro.

### 7.3 Testes end-to-end

- [ ] Escolher ferramenta: Playwright ou alternativa equivalente.
- [ ] Criar teste do catalogo publico: abrir home, filtrar categoria, abrir produto, clicar WhatsApp.
- [ ] Criar teste de login admin com estrategia segura para ambiente de teste.
- [ ] Criar teste de CRUD de produto no admin.
- [ ] Criar teste de upload com arquivo pequeno.
- [ ] Criar teste de permissao operational vs strategic.
- [ ] Rodar E2E em preview antes de producao.

Critério de aceite:

- [ ] Fluxos mais importantes sao validados como usuario real.
- [ ] Preview reprovado bloqueia deploy de producao.

---

## 8. Observabilidade e Rotina Operacional

Objetivo: saber quando algo quebrou, onde quebrou e como recuperar.

### 8.1 Logs e erros

- [ ] Definir ferramenta de observabilidade: Vercel logs, Sentry ou equivalente.
- [ ] Capturar erros de Server Actions.
- [ ] Capturar erros de Route Handlers.
- [ ] Capturar falhas de upload.
- [ ] Evitar logar dados sensiveis.
- [ ] Criar formato minimo de logs para eventos criticos.

Critério de aceite:

- [ ] Erros de producao podem ser investigados sem reproduzir no escuro.
- [ ] Logs nao vazam secrets ou dados pessoais.

### 8.2 Backup e recuperacao

- [ ] Confirmar politica de backup do Supabase.
- [ ] Documentar como restaurar backup.
- [ ] Exportar catalogo periodicamente, se necessario.
- [ ] Definir responsavel por verificar backup.
- [ ] Testar restauracao em ambiente separado.

Critério de aceite:

- [ ] Existe caminho realista para recuperar dados apos erro humano.
- [ ] Restauracao foi testada pelo menos uma vez.

### 8.3 Rotina de manutencao

- [ ] Rodar `npm audit --omit=dev` periodicamente.
- [ ] Revisar updates de Next, React, Supabase e Prisma.
- [ ] Verificar expiracao/rotacao de chaves.
- [ ] Remover imagens sem uso no Storage.
- [ ] Revisar usuarios admin ativos mensalmente.
- [ ] Revisar eventos e crescimento de banco mensalmente.

Critério de aceite:

- [ ] Projeto tem rotina simples de manutencao preventiva.
- [ ] Acesso administrativo nao fica esquecido.

---

## 9. Produto, Conteudo e Crescimento

Objetivo: deixar a AQUA mais vendavel, nao apenas tecnicamente correta.

### 9.1 Catalogo e conversao

- [ ] Revisar nomes, descricoes curtas e descricoes completas dos produtos.
- [ ] Trocar imagens externas temporarias por imagens proprietarias.
- [ ] Padronizar enquadramento e proporcao das imagens.
- [ ] Adicionar selos comerciais: novidade, promocao, destaque, mais vendido.
- [ ] Avaliar busca por nome/fragrancia.
- [ ] Avaliar filtros por categoria, volume, faixa de preco e promocao.
- [ ] Avaliar pagina individual de produto para compartilhamento.
- [ ] Criar CTA de encomenda mais claro no produto.

Critério de aceite:

- [ ] Catalogo transmite confianca e desejo.
- [ ] Usuario encontra rapidamente o produto certo.

### 9.2 Revendedores

- [ ] Definir informacoes minimas para lead de revendedor.
- [ ] Criar formulario ou fluxo WhatsApp estruturado para revendedor.
- [ ] Registrar evento de clique de revendedor.
- [ ] Criar pagina/secao mais forte para proposta de revenda.
- [ ] Definir se leads serao salvos em banco na proxima fase.

Critério de aceite:

- [ ] Interesse em revenda vira contato rastreavel.
- [ ] Mensagem de revendedor chega com contexto claro.

### 9.3 Conteudo institucional

- [ ] Revisar texto "Sobre a AQUA".
- [ ] Adicionar diferenciais de produto.
- [ ] Adicionar orientacoes de uso e cuidado.
- [ ] Adicionar FAQ simples.
- [ ] Adicionar politica de troca/atendimento, se existir.
- [ ] Revisar termos sobre fragrancias inspiradas para reduzir risco juridico/comercial.

Critério de aceite:

- [ ] Site responde duvidas basicas antes do WhatsApp.
- [ ] Linguagem comercial fica consistente com marca premium.

---

## 10. Segurança Final Antes de Expor a Plataforma

Objetivo: criar um gate objetivo antes de publicar `aqua-platform`.

### 10.1 Checklist tecnico

- [x] `npm run test` passa na raiz.
- [x] `npm run lint` passa na raiz.
- [x] `npm run build` passa na raiz.
- [x] `npm audit --omit=dev` passa na raiz.
- [x] `npm run test` passa em `aqua-platform`.
- [x] `npm run lint` passa em `aqua-platform`.
- [x] `npm run build` passa em `aqua-platform`.
- [x] `npm audit --omit=dev` passa em `aqua-platform`.
- [ ] Todas as variaveis de ambiente foram revisadas.
- [ ] Nenhum `.env` real esta rastreado no Git.
- [ ] Secrets foram configurados apenas no provedor correto.

Critério de aceite:

- [ ] Plataforma nao e publicada com falha conhecida de build, lint, teste ou secret.

### 10.2 Checklist de acesso

- [ ] Proxy protege `/admin` sem sessao.
- [ ] Layout de admin revalida usuario no servidor.
- [ ] Server Actions revalidam usuario no servidor.
- [ ] Operational nao executa acao strategic.
- [ ] Strategic executa acao strategic.
- [ ] Usuario Google sem cadastro e bloqueado.
- [ ] Logout encerra sessao.
- [x] Callback OAuth aceita somente path relativo.

Critério de aceite:

- [ ] Acesso administrativo nao depende apenas de UI ou proxy.

### 10.3 Checklist de dados publicos

- [ ] `/api/store-settings` nao expoe dados sensiveis.
- [x] `/api/events` valida origem exata.
- [x] `/api/events` limita payload e metadata.
- [x] `/api/events` tem protecao simples contra abuso.
- [ ] Storage permite leitura publica apenas do que deve ser publico.
- [ ] Escrita em Storage exige autenticacao.

Critério de aceite:

- [ ] Superficie publica da plataforma esta minimizada e intencional.

---

## 11. Ordem Recomendada de Execucao

Prioridade 1 — deixar o que ja existe confiavel:

- [ ] Fechar validacao visual/comercial do Vite.
- [ ] Fechar SEO/performance basica.
- [ ] Fechar checklist de deploy da raiz.
- [x] Expandir testes unitarios essenciais.

Prioridade 2 — ativar a plataforma em ambiente real controlado:

- [ ] Configurar Supabase.
- [ ] Rodar migrations e seed.
- [ ] Validar Google OAuth.
- [ ] Validar Storage.
- [ ] Validar roles operational/strategic.

Prioridade 3 — tornar admin usavel por pessoas reais:

- [ ] Melhorar mensagens de erro e sucesso.
- [ ] Melhorar estados de loading.
- [ ] Melhorar formularios grandes.
- [ ] Validar CRUD completo com dados reais.

Prioridade 4 — preparar migracao publica para Next:

- [ ] Decidir corte Vite -> Next.
- [ ] Portar experiencia publica.
- [ ] Conectar catalogo publico ao banco.
- [ ] Integrar analytics real.
- [ ] Validar SEO, redirects e compartilhamento.

Prioridade 5 — operar e crescer:

- [ ] Implantar observabilidade.
- [ ] Definir backup e rotina de manutencao.
- [ ] Melhorar conteudo, imagens e conversao.
- [ ] Evoluir revendedores, CRM e automacoes somente apos a base estar estavel.

---

## 12. Definicao de Projeto Redondo

O projeto pode ser considerado redondo quando:

- [ ] Catalogo publico esta bonito, rapido, responsivo e validado em producao.
- [ ] Admin real funciona com banco, login, permissoes e storage.
- [ ] Produtos, categorias, vendas, configuracoes e eventos persistem corretamente.
- [ ] Erros esperados geram mensagens claras para o usuario.
- [ ] Testes cobrem regras criticas de dados, seguranca e conversao.
- [ ] Deploy tem checklist e rollback conhecidos.
- [ ] Backups e acessos administrativos tem rotina de revisao.
- [ ] Nao ha duas fontes de verdade para catalogo em producao.
- [ ] A documentacao permite que outra pessoa opere o projeto sem depender de contexto oral.
