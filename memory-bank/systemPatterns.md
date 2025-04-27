# System Patterns: Checkout Free Fire

## 1. Arquitetura

- **Frontend:** Aplicação web estática composta por arquivos HTML, CSS e JavaScript, servida a partir do diretório `public`.
- **Backend (Parcial/Inferido):** Um servidor (Node.js/Express inferido pelo `server.js` no root, não analisado) que serve os arquivos estáticos e expõe endpoints de API para funcionalidades específicas (geração de PIX, verificação de status).
- **Serviços Externos:** O frontend utiliza scripts de terceiros (Utmify para tracking, Zippify para botões de pagamento - parcialmente removido, `g1-noticia.net` para buscar dados do usuário - função incerta).

## 2. Padrões de Navegação

- **Links HTML:** Navegação básica entre páginas usando tags `<a>` com `href`.
- **JavaScript `window.location.href`:** Usado para redirecionamentos programáticos (ex: após clique em botão, após confirmação de pagamento).
- **Manipulação do Histórico (`history.pushState`, `onpopstate`):** Utilizado na Etapa 01 para tentar controlar o comportamento do botão "Voltar" do navegador, redirecionando para `checkout03.html`.
- **Caminhos Relativos:** A navegação entre diretórios (`etapa01`, `etapa02`, diretório raiz `public`) depende do uso correto de caminhos relativos (`../`).

## 3. Fluxo de Dados

- **Entrada do Usuário:** IDs e dados pessoais (Nome, CPF) são coletados via formulários HTML.
- **Comunicação Frontend-Backend:** O JavaScript do frontend (`script03.js`) faz requisições `fetch` para a API local (`/api/criar-pix`, `/api/check-status/:id`) enviando dados em JSON.
- **Comunicação com Serviços Externos:**
    - Scripts externos (Utmify, Zippify) podem enviar dados de tracking/eventos para seus próprios servidores.
    - Fetch para `g1-noticia.net` (na Etapa 01) busca dados associados a um CPF passado por parâmetro de URL.

## 4. Gerenciamento de Estado (Simples)

- O estado é gerenciado principalmente no lado do cliente dentro de cada página (variáveis JavaScript).
- O ID da transação PIX (`currentTransactionId` em `script03.js`) é mantido em memória enquanto a página `checkout03.html` está ativa.
- Parâmetros de URL (`utm_`*, `sck`, `document`) são usados para passar informações entre páginas ou para scripts externos. 