# Tech Context: Checkout Free Fire

## 1. Tecnologias Principais

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend (Inferido):** Node.js, Express.js (baseado na existência de `server.js`, `package.json` - não analisados)
- **API:** RESTful API local para gerar PIX e verificar status.

## 2. Dependências Externas (Frontend)

- **Utmify (`cdn.utmify.com.br`):** Script para tracking de UTMs.
- **Zippify (`app.zippify.com.br`):** Script para funcionalidade "one-click" em botões (parcialmente removido/substituído).
- **`g1-noticia.net`:** Endpoint externo acessado via `fetch` na Etapa 01 para buscar dados do usuário por CPF (origem e confiabilidade desconhecidas).
- **Fontes Google Fonts:** `Inter`.
- **Ícones:** `Font Awesome`, `Material Symbols Outlined`.

## 3. Ferramentas de Desenvolvimento

- **Servidor Local:** Executado via `node server.js` (padrão) ou `bun run start`.
- **Navegador Web:** Para teste e depuração do frontend.
- **Editor de Código:** (Cursor, no seu caso).
- **Gerenciador de Pacotes/Runtime:** `npm` (para inicialização/gerenciamento de dependências), `bun` (para execução).

## 4. Configuração do Ambiente

- Requer Node.js e npm (ou yarn) instalados para rodar o servidor backend (suposição).
- O frontend é composto por arquivos estáticos que podem ser abertos diretamente no navegador, mas a funcionalidade completa (APIs) depende do servidor rodando.

## 5. Considerações Técnicas

- **Segurança:** A busca de dados do usuário via CPF em um endpoint externo (`g1-noticia.net`) levanta questões de segurança e privacidade. A validação e tratamento de dados de entrada (IDs, CPF) no frontend e backend são cruciais.
- **Tratamento de Erros:** Implementação de tratamento de erros para chamadas `fetch` (API local e externa) e interações do usuário.
- **Performance:** O carregamento de múltiplos scripts externos pode impactar o tempo de carregamento inicial da página.
- **Manutenibilidade:** O código JavaScript está distribuído em arquivos específicos por página (`script03.js`, `js/text.js`, `js/scripts.js`) e também inline em tags `<script>` dentro dos HTMLs. A organização poderia ser melhorada. 