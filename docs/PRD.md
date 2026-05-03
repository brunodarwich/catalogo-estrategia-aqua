# Product Requirements Document (PRD) - Catálogo AQUA

## 1. Visão do Produto
Um catálogo digital web, mobile-first, focado em alta estética ("Quiet Luxury") para exibição dos produtos da AQUA e conversão direta para vendas via WhatsApp.

## 2. Personas e Dores
- **Máissara Suzana Darwich da Rocha (Proprietária):** Otimização de tempo. Precisa de ferramentas que gerem resultados (vendas/posts) de forma automatizada e eficiente.
- **Cliente Premium:** Busca exclusividade. Quer um site que passe confiança e elegância imediata.

## 3. Requisitos Funcionais (RF)

| ID | Requisito | Descrição | Prioridade |
| :--- | :--- | :--- | :--- |
| RF01 | Galeria de Produtos | Exibir produtos em um grid minimalista com foco em fotos lifestyle. | P0 |
| RF02 | Categorização Específica | Filtros para: **Colônias, Automotivo, Tecidos e Bruma Capilar**. | P0 |
| RF03 | Detalhes com Notas Olfativas | Exibir descrição, preço, ml e "Inspiração/Notas" (ex: La Vie Est Belle). | P0 |
| RF04 | Botão de Venda (WhatsApp) | CTA "Solicitar no WhatsApp" com mensagem contendo Cód. Produto e Nome. | P0 |
| RF05 | **Gerador de Post (Admin/Bot)** | Botão "Gerar Post" (para uso da proprietária) que exporta um card elegante do produto. | P1 |
| RF06 | Hero dinâmico | Seção inicial com vídeo em loop (alta qualidade) ou slides conceituais. | P1 |
| RF07 | Busca por Inspiração | Barra de busca que encontra produtos por inspiração (ex: "J'adore"). | P2 |

## 4. Requisitos Não Funcionais (RNF)

| ID | Requisito | Descrição |
| :--- | :--- | :--- |
| RNF01 | Design System | Paleta: Marrom cafezal, bege, creme. Tipografia serifada (Luxo). |
| RNF02 | Otimização de Assets | Imagens em WebP com lazy loading para performance mobile extrema. |
| RNF03 | Mobile-First | Navegação otimizada para "uma mão" (fácil alcance do polegar). |
| RNF04 | SEO Regional | Palavras-chave focadas em "Perfumaria artesanal Mogi das Cruzes". |

## 5. Especificações de Dados (Input PDF)
O sistema deve ler ou ter pré-carregado os seguintes campos:
- **ID/Cód:** (ex: 1225)
- **Nome:** (ex: Atena)
- **Categoria:** (ex: Colônia Feminina)
- **Preço:** (ex: R$ 130)
- **Tamanho:** (ex: 100ml)
- **Notas:** (ex: Íris Pallida)

## 6. Fluxo de Conversão
1. Usuário acessa -> Vê o vídeo Hero (Desejo).
2. Filtra por "Automotivo" -> Escolhe "Spirit Silver".
3. Vê os detalhes e o preço -> Clica em "Solicitar".
4. WhatsApp abre com: *"Olá, AQUA! Gostaria de encomendar o Spirit Silver (Cód. 1334). Poderia me passar os detalhes de entrega?"*
