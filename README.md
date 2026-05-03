# Catálogo AQUA

Catálogo digital interativo para a marca AQUA, focado em uma experiência premium e conversão direta via WhatsApp.

## 🚀 Como Rodar o Projeto

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Renomeie o arquivo `.env.example` para `.env` e preencha com seus dados.

3. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```

## 📂 Estrutura

- `src/`: Código fonte (React + Vite).
- `public/`: Ativos estáticos (vídeo, imagens).
- `docs/`: Documentação estratégica e técnica (sanitizada para GitHub).

## 🔒 Segurança e Variáveis de Ambiente

Para proteger dados sensíveis (como números de telefone), este projeto utiliza variáveis de ambiente.

### Localmente:
1. Renomeie `.env.example` para `.env`.
2. Preencha os campos com seus dados reais.

### Na Vercel:
Ao realizar o deploy, configure as seguintes **Environment Variables** no painel da Vercel:
- `VITE_WHATSAPP_PHONE`: Seu número (ex: 5511999999999).
- `VITE_WHATSAPP_MESSAGE`: Modelo da mensagem (pode usar os placeholders `{productName}` e `{productSku}`).


## 📦 Deploy

Configurado para deploy automático na **Vercel**. 
As configurações de roteamento e segurança estão no arquivo `vercel.json`.

---
Projeto desenvolvido para **AQUA Perfumaria**.
