# AQUA — Design Oficial da Vitrine e Plataforma

Versao: 1.0  
Status: Diretriz visual oficial  
Data: 2026-05-10

## 1. Diretriz Visual Oficial

O catalogo Vite antigo e a referencia principal da vitrine publica final. Ele nao deve ser tratado como inspiracao solta, moodboard ou ponto de partida descartavel. A nova vitrine em Next.js deve preservar sua identidade com alta fidelidade.

A AQUA deve continuar transmitindo sofisticacao, sensorialidade, leveza, elegancia, modernidade silenciosa e percepcao premium.

A vitrine publica nao deve parecer:

- dashboard;
- ERP;
- ecommerce generico;
- template pronto;
- tela administrativa simples;
- pagina tecnica criada apenas para provar conexao com banco.

## 2. Principios de UX

- A vitrine deve vender por atmosfera, desejo e clareza.
- A navegacao deve ser simples, com poucos caminhos e CTAs objetivos.
- O mobile deve ser tratado como experiencia principal.
- O usuario deve entender rapidamente categorias, destaques, promocoes e contato.
- A conversao principal e o WhatsApp.
- O painel administrativo pode ser mais funcional, mas nao deve abandonar a identidade premium.

## 3. Qualidades do Catalogo Antigo a Preservar

O catalogo Vite antigo tem valor por:

- hero cinematografico com imagem/video forte;
- fundo escuro sofisticado;
- contraste elegante entre ivory, dourado e aqua;
- sensacao editorial;
- cards de produto com foco em imagem e respiro;
- filtros discretos;
- destaques e promocoes em secoes proprias;
- modal de produto com CTA direto;
- secoes institucionais enxutas;
- linguagem visual sensorial, sem excesso de texto.

Essas qualidades devem ser mantidas mesmo que a implementacao mude para Next.js, Server Components, Prisma e dados dinamicos.

## 4. Definicao de Alta Fidelidade

Alta fidelidade significa que uma pessoa que conhece o catalogo antigo deve reconhecer a nova vitrine como a mesma experiencia evoluida, nao como outro produto.

Na pratica, isso exige preservar:

- sensacao premium e cinematografica;
- hierarquia visual;
- ritmo de scroll;
- atmosfera escura;
- uso contido de dourado e aqua;
- tipografia editorial nos titulos;
- imagens grandes e desejaveis;
- cards elegantes;
- filtros e CTAs discretos;
- experiencia mobile confortavel.

Alta fidelidade nao exige copiar cada linha de CSS literalmente. Exige manter percepcao, comportamento, composicao e identidade.

## 5. Partes Obrigatorias do Layout Publico

A vitrine final deve manter ou adaptar com grande proximidade:

- hero com poster/video, overlay escuro, headline curta, subtitulo e CTAs;
- secao de categorias ativas;
- secao de produtos em destaque;
- secao de promocoes;
- catalogo filtravel por categoria;
- cards com imagem, nome, categoria, preco, promocao/destaque e acao;
- modal ou detalhe de produto com CTA WhatsApp contextual;
- secao de revendedores;
- secao "Sobre a AQUA";
- secao social;
- footer com links, contato e conteudo legal.

## 6. Adaptacao ao Novo Stack

A migracao para Next.js deve alterar a base tecnica, nao a identidade da experiencia.

Diretrizes:

- portar a estrutura visual do Vite como base inicial;
- substituir dados locais por queries server-side ao banco;
- preservar classes, tokens e composicoes quando isso acelerar fidelidade;
- refatorar componentes apenas depois que a experiencia estiver visualmente validada;
- manter o admin separado visualmente da vitrine, mas dentro da mesma identidade de marca.

## 7. Comportamento Desktop e Mobile

### Desktop

- Hero deve ter presenca forte na primeira dobra.
- Secoes devem ter respiro e hierarquia clara.
- Cards podem formar grid amplo, com imagens dominantes.
- Filtros devem ser acessiveis e discretos.
- CTA WhatsApp deve ser visivel sem competir com a experiencia visual.

### Mobile

- Imagens devem continuar grandes e legiveis.
- Scroll deve ser fluido e confortavel.
- Filtros devem quebrar linha sem apertar texto.
- Cards devem evitar excesso de informacao.
- CTAs devem ter area de toque adequada.
- Modal/detalhe deve ocupar bem a tela sem sobrepor conteudo de forma confusa.

## 8. Tom de Marca

A comunicacao deve ser:

- premium;
- sensorial;
- elegante;
- direta;
- acolhedora;
- comercial sem parecer agressiva.

Evitar jargoes tecnicos, textos longos demais e linguagem fria de sistema.

## 9. Hierarquia Visual

- Hero comunica marca e promessa.
- Categorias orientam exploracao.
- Destaques e promocoes criam desejo.
- Catalogo permite escolha.
- Modal/detalhe aprofunda informacao.
- WhatsApp converte.
- Institucional reforca confianca.

## 10. Tipografia

- Titulos devem manter sensacao editorial, com fonte serifada ou equivalente a diretriz anterior.
- Textos de interface devem usar fonte limpa e altamente legivel.
- Titulos em cards e paineis compactos nao devem usar escala de hero.
- Evitar letter spacing negativo.
- Evitar textos que estourem botoes, filtros ou cards.

## 11. Cores

Paleta oficial preservada:

- Deep Charcoal: `#111315`;
- Soft Black: `#1A1D21`;
- Warm Ivory: `#F4F0EA`;
- Mist Beige: `#D8CFC3`;
- Aqua Gold: `#C9A86A`;
- Soft Aqua: `#7FBFC7`.

Uso recomendado:

- fundos escuros como base dominante;
- ivory/beige para leitura;
- dourado para CTAs e destaques premium;
- aqua para detalhes sensoriais e contraste pontual.

## 12. Hero

O hero deve ser cinematografico e marcar a identidade no primeiro viewport. Deve usar poster ou video real do universo da marca/produto, com overlay escuro e texto sobre a imagem.

Nao substituir por layout administrativo, card lateral, bloco generico ou fundo puramente decorativo.

## 13. Cards, CTAs, Modal e Filtros

- Cards devem priorizar imagem, nome, categoria e preco.
- Promocao e destaque devem ser perceptiveis sem poluir.
- CTAs devem ser claros, elegantes e consistentes.
- Filtros devem funcionar como navegacao leve por categoria.
- Modal/detalhe deve preservar foco no produto e facilitar WhatsApp.

## 14. Secoes Institucionais

Revendedores, sobre, social e footer devem permanecer enxutos, elegantes e comerciais. Essas secoes nao devem virar blocos longos de explicacao institucional.

## 15. Regras para Nao Descaracterizar

Nao fazer:

- trocar a vitrine por uma lista simples conectada ao banco;
- usar a home publica atual da `aqua-platform` como experiencia final;
- remover hero cinematografico;
- reduzir cards a tabelas ou blocos administrativos;
- abandonar paleta e tipografia do catalogo antigo;
- criar uma experiencia generica de loja online;
- manter Vite em producao como justificativa para preservar visual.

Fazer:

- migrar o visual antigo para o novo stack;
- validar desktop e mobile contra o catalogo original;
- priorizar fidelidade antes de refatoracao;
- tratar o design antigo como patrimonio do projeto.
