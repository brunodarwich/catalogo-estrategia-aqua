# requirements.md
# AQUA — MVP Requirements

Versão: 0.1  
Status: MVP Requirements Definition

---

# 1. Objetivo

Este documento define os requisitos funcionais e não funcionais do MVP da plataforma AQUA.

O MVP terá como objetivo:

- apresentar os produtos da marca,
- permitir gestão operacional básica,
- organizar informações do negócio,
- acompanhar métricas principais,
- centralizar a operação inicial.

---

# 2. Objetivos do MVP

## Objetivos principais

- Criar catálogo premium online.
- Permitir gestão simples de produtos.
- Permitir visualização de métricas básicas.
- Permitir acompanhamento simples de vendas.
- Validar fluxo operacional.
- Estruturar base do sistema futuro.

---

# 3. Escopo do MVP

O MVP será dividido em:

## Área pública
- homepage,
- catálogo,
- categorias,
- promoções,
- página de revendedores,
- páginas institucionais.

## Área privada
- dashboard operacional,
- dashboard estratégico,
- gestão de produtos,
- controle simples de vendas,
- analytics básicos.

---

# 4. Requisitos Funcionais

# RF-001 — Homepage pública

O sistema deve possuir homepage pública contendo:

- hero com vídeo,
- categorias,
- produtos em destaque,
- promoções,
- seção de revendedores,
- seção institucional,
- footer com contatos e políticas.

---

# RF-002 — Catálogo de produtos

O sistema deve permitir:

- listar produtos,
- visualizar produtos individuais,
- filtrar produtos por categoria,
- visualizar promoções,
- acessar produtos em destaque.

---

# RF-003 — Página de produto

Cada produto deve possuir:

- nome,
- descrição,
- imagens,
- preço,
- fragrância,
- categoria,
- botão de contato via WhatsApp.

---

# RF-004 — Página de categorias

O sistema deve permitir:

- visualizar categorias,
- navegar entre categorias,
- listar produtos por categoria.

---

# RF-005 — Página de revendedores

O sistema deve possuir página específica para revendedores contendo:

- explicação resumida,
- benefícios,
- CTA para WhatsApp.

---

# RF-006 — Login Google

O sistema deve permitir autenticação utilizando Google OAuth.

---

# RF-007 — Controle de acesso

O sistema deve possuir níveis diferentes de acesso:

## operational
- painel simplificado.

## strategic
- painel completo.

---

# RF-008 — Dashboard operacional

O dashboard operacional deve permitir visualizar:

- visitas totais,
- produtos mais vistos,
- faturamento previsto,
- quantidade de vendas,
- produtos ativos,
- promoções ativas.

---

# RF-009 — Dashboard estratégico

O dashboard estratégico deve permitir visualizar:

- métricas completas,
- analytics,
- eventos,
- acessos,
- origem de tráfego,
- produtos mais acessados,
- produtos mais vendidos.

---

# RF-010 — Cadastro de produtos

O sistema deve permitir:

- criar produto,
- editar produto,
- remover produto,
- ativar/desativar produto.

---

# RF-011 — Campos do produto

O produto deve possuir:

- nome,
- slug,
- categoria,
- descrição curta,
- descrição completa,
- imagens,
- preço,
- preço promocional,
- fragrância,
- status,
- destaque,
- promoção.

---

# RF-012 — Gestão de vendas

O sistema deve permitir:

- registrar venda manualmente,
- editar venda,
- visualizar vendas registradas.

---

# RF-013 — Métricas de vendas

O sistema deve calcular:

- faturamento previsto,
- faturamento confirmado,
- quantidade de vendas.

---

# RF-014 — Analytics básicos

O sistema deve registrar:

- visualizações de página,
- visualizações de produtos,
- cliques no WhatsApp,
- visualizações de categorias,
- cliques em promoções.

---

# RF-015 — Gestão de categorias

O sistema deve permitir:

- criar categoria,
- editar categoria,
- remover categoria,
- ordenar categorias.

---

# RF-016 — Configurações da loja

O sistema deve permitir editar:

- logo,
- vídeo da hero,
- links sociais,
- WhatsApp,
- texto institucional.

---

# RF-017 — Responsividade

Toda a plataforma deve funcionar corretamente em:

- mobile,
- tablet,
- desktop.

---

# RF-018 — Política de privacidade

O sistema deve possuir página pública de política de privacidade.

---

# RF-019 — Termos de uso

O sistema deve possuir página pública de termos de uso.

---

# RF-020 — SEO básico

O sistema deve possuir:

- URLs amigáveis,
- meta tags básicas,
- títulos organizados,
- estrutura indexável.

---

# 5. Requisitos Não Funcionais

# RNF-001 — Mobile-first

A plataforma deve priorizar experiência mobile.

---

# RNF-002 — Performance

O sistema deve possuir:

- carregamento rápido,
- imagens otimizadas,
- lazy loading,
- boa pontuação Lighthouse.

---

# RNF-003 — UX simplificada

A interface deve:

- possuir poucos elementos por tela,
- evitar excesso de informação,
- priorizar clareza.

---

# RNF-004 — Visual premium

A interface deve transmitir:

- sofisticação,
- elegância,
- modernidade,
- experiência premium.

---

# RNF-005 — Segurança

O sistema deve possuir:

- autenticação protegida,
- rotas privadas,
- validação backend,
- proteção de acesso.

---

# RNF-006 — Escalabilidade

A arquitetura deve permitir futura expansão para:

- CRM,
- IA,
- automações,
- integrações sociais,
- analytics avançados.

---

# RNF-007 — Baixo atrito operacional

O sistema deve minimizar:

- cliques,
- etapas,
- complexidade operacional.

---

# RNF-008 — Separação de permissões

O sistema deve separar permissões por role.

---

# RNF-009 — Estrutura modular

O sistema deve possuir arquitetura modular para futuras expansões.

---

# 6. Regras de Negócio

# RN-001

Produtos inativos não devem aparecer publicamente.

---

# RN-002

Produtos promocionais devem possuir destaque visual.

---

# RN-003

Usuários sem autorização não podem acessar dashboards.

---

# RN-004

Apenas usuários strategic possuem acesso completo.

---

# RN-005

Faturamento previsto deve considerar:
- pending,
- completed.

---

# RN-006

Faturamento confirmado deve considerar:
- completed.

---

# RN-007

Categorias vazias podem permanecer visíveis apenas se configuradas manualmente.

---

# RN-008

Eventos de analytics devem ser registrados automaticamente.

---

# 7. Funcionalidades Fora do MVP

Não entram inicialmente:

- IA,
- automações avançadas,
- integração Instagram,
- CRM completo,
- gestão de estoque avançada,
- sistema de revendedores avançado,
- geração automática de conteúdo,
- controle financeiro completo,
- chatbot inteligente.

---

# 8. Critérios de Sucesso do MVP

O MVP será considerado validado se:

- o catálogo estiver operacional,
- o painel estiver sendo utilizado,
- os produtos forem gerenciados pelo sistema,
- as métricas forem úteis,
- o fluxo operacional reduzir retrabalho,
- houver uso recorrente da plataforma.

---

# 9. Evolução Pós-MVP

## Fase 2
- CRM,
- clientes,
- histórico,
- relacionamento.

## Fase 3
- analytics avançados,
- comportamento,
- eventos.

## Fase 4
- integrações sociais,
- automações,
- campanhas.

## Fase 5
- inteligência artificial,
- geração de conteúdo,
- insights automáticos,
- automação operacional.