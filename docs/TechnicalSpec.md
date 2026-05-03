# Especificação Técnica - Catálogo AQUA

Este documento define a arquitetura, stack tecnológica e estratégias de integração para o projeto AQUA.

## 1. Stack Tecnológica

| Camada | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Performance extrema, SPA (Single Page Application) fluida para mobile. |
| **Linguagem** | JavaScript (ES6+) | Simplicidade e rapidez de desenvolvimento para o MVP. |
| **Estilização** | Vanilla CSS | Máxima flexibilidade para implementar a estética **Quiet Luxury** sem restrições de frameworks de utilitários. |
| **Dados** | JSON Estático | Baixa complexidade, alta performance e fácil manutenção inicial. |
| **Hospedagem** | Vercel / Netlify | Deploy contínuo e CDN global para carregamento rápido de assets. |

## 2. Arquitetura do Sistema
O sistema será uma aplicação de página única (SPA) composta por:
- **Data Layer:** Módulo de leitura do `products.json`.
- **Component Layer:** Componentes React baseados no `DesignSystem.md`.
- **State Management:** React Context ou Hooks simples para gerenciar filtros e modais.
- **Integration Layer:** Gerador de links dinâmicos para WhatsApp.

## 3. Integrações e Automação (Foco IA)

### 3.1. Gerador de Links WhatsApp
- **API:** `https://wa.me/SEU_NUMERO?text=[MENSAGEM_ENCODED]`
- **Regra:** Codificar dinamicamente o nome e SKU do produto.

### 3.2. Pesquisa Técnica: MCP para Marketing (Pós-MVP)
- **Meta Ads MCP:** Avaliar integração para criação automatizada de anúncios a partir dos dados do catálogo.
- **Google Shopping MCP:** Sincronização automatizada do `products.json` com o Merchant Center.

## 4. Estados Principais da Aplicação
- **Hydration:** Carregamento inicial dos dados e assets (vídeo hero).
- **Filtering:** Re-renderização eficiente do grid ao selecionar categorias.
- **Interaction:** Abertura e fechamento de modais com animações CSS (transform/opacity).

## 5. Estratégia de Testes
- **Visual Regression:** Garantir que o design premium não quebre em diferentes viewports (Mobile-First).
- **Functional Testing:** Validar se todos os links de WhatsApp geram a mensagem correta.
- **Performance:** Manter Score Lighthouse > 90 (Foco em LCP - Largest Contentful Paint devido ao vídeo Hero).

## 6. Riscos Técnicos
- **Tamanho do Vídeo Hero:** Pode impactar o carregamento inicial. Solução: Usar compressão agressiva e lazy loading.
- **Manutenção de Dados:** Atualizar o JSON manualmente pode gerar erros de sintaxe. Solução: Validar via script antes do deploy.
