# Progress: Checkout Free Fire

## 1. O Que Funciona

- O projeto `checkout-ff` foi inicializado com `npm` (`package.json` criado).
- O servidor pode ser iniciado usando `bun run start` (ou `node server.js`) no diretório `checkout-ff`.
- A navegação básica entre as páginas `etapa01/index.html`, `checkout03.html` e `etapa02/index.html` através dos botões principais ("PAGAR GARENA TAX", "Já Paguei", "Garena Reserve") foi corrigida para usar os caminhos relativos corretos (`../`).
- A lógica de redirecionamento que dependia do script `oneclick.js` da Zippify foi removida e substituída por navegação HTML/JS padrão.
- O redirecionamento do botão "Voltar" do navegador na Etapa 01 (via `onpopstate`) está configurado para levar a `../checkout03.html`.
- A interface básica de cada etapa está definida nos respectivos arquivos HTML/CSS.
- A geração de PIX (QR Code e Copia/Cola) via API local (`/api/criar-pix`) parece estar implementada no `script03.js`.
- A verificação de status do PIX (polling) via API local (`/api/check-status/:id`) está implementada no `script03.js`.

## 2. O Que Falta Construir/Verificar

- **Funcionalidade do Backend:** As APIs `/api/criar-pix` e `/api/check-status/:id` precisam ser verificadas (ou implementadas, se ainda não existirem/funcionarem).
- **Validação de ID:** A lógica real de validação do ID do Free Fire na Etapa 01 não está implementada (atualmente, parece sempre levar ao fluxo de ID inválido).
- **Fluxo de ID Válido:** O que acontece se um ID válido for inserido na Etapa 01? Esse fluxo não está claro ou implementado.
- **Lógica de Pagamento Múltiplo:** O fluxo leva o usuário de volta ao `checkout03.html` a partir da Etapa 02 ("Garena Reserve"). É para pagar o mesmo valor novamente? Ou um valor diferente? A lógica por trás das taxas ("Garena Tax", "Garena Reserve") precisa ser esclarecida.
- **Script `g1-noticia.net`:** Investigar a origem, propósito e necessidade deste script na Etapa 01 que busca dados por CPF. Pode ser um placeholder ou algo a ser removido/substituído.
- **Teste Completo:** Realizar um teste ponta-a-ponta do fluxo, incluindo a interação com as APIs de backend (quando funcionais).

## 3. Status Atual

- O foco principal foi corrigir a navegação quebrada entre as páginas do frontend.
- A estrutura básica do fluxo está montada, mas a lógica central (validação de ID, múltiplos pagamentos, backend) ainda precisa de trabalho ou verificação.

## 4. Problemas Conhecidos

- A funcionalidade do backend (APIs PIX) é desconhecida/não verificada.
- A origem e segurança do script que acessa `g1-noticia.net` são questionáveis.
- A lógica exata e a diferenciação entre "Garena Tax" e "Garena Reserve" não estão claras no fluxo atual.

## 5. Evolução das Decisões

- Decidiu-se remover a dependência do script Zippify para navegação, optando por controle direto via HTML/JS.
- Padronizou-se o uso de caminhos relativos (`../`) para a navegação entre diretórios. 