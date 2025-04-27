# Project Brief: Checkout Free Fire (ff-soft)

## 1. Visão Geral

Este projeto implementa um fluxo de checkout multi-etapas, aparentemente relacionado à compra ou resgate de itens (diamantes?) para o jogo Free Fire (Garena). O fluxo envolve a validação de ID do jogador e diferentes etapas de pagamento ou resolução de problemas.

## 2. Objetivos Principais

- Criar um fluxo de checkout funcional que guie o usuário desde a entrada inicial até a confirmação (ou tratamento de erro).
- Validar o ID do jogador Free Fire.
- Processar pagamentos (inicialmente via PIX, com menções a "Garena Tax" e "Garena Reserve").
- Lidar com cenários de erro, como ID inválido ou sobrecarga no servidor.

## 3. Escopo

- **Etapa 01 (`etapa01/index.html`):**
    - Coleta e validação inicial do ID do jogador.
    - Exibe pop-up em caso de ID inválido, solicitando pagamento de "Garena Tax".
    - Redireciona para `checkout03.html` (seja pelo botão "PAGAR GARENA TAX" ou pelo botão Voltar do navegador após o pop-up).
- **Checkout 03 (`checkout03.html`):**
    - Coleta dados do usuário (Nome, CPF).
    - Gera um PIX para pagamento (valor fixo de R$ 9,92, denominado "Garena Reserve"?).
    - Verifica o status do pagamento PIX.
    - Redireciona para `etapa02/index.html` após clique em "Já Paguei" ou confirmação automática do pagamento.
- **Etapa 02 (`etapa02/index.html`):**
    - Exibe status do pedido (Pagamento concluído, Servidor Sobrecarregado).
    - Apresenta um botão para "Resolver problema" (sobrecarga).
    - Mostra informações sobre fila de espera e a opção de pagar "Garena Reserve" para prioridade.
    - Redireciona para `checkout03.html` ao clicar em "Garena Reserve".

## 4. Fora do Escopo (Inicial)

- Implementação detalhada da lógica de validação de ID real com a Garena.
- Integração real com sistemas de pagamento além da geração de PIX via API (`/api/criar-pix`).
- Funcionalidade completa do backend (APIs `/api/criar-pix`, `/api/check-status/:id`).
- Lógica exata por trás de "Garena Tax" vs "Garena Reserve".
- Autenticação de usuário. 