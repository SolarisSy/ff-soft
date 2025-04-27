# Product Context: Checkout Free Fire

## 1. Problema

Jogadores de Free Fire precisam de um processo claro e direto para adquirir itens ou resolver pendências relacionadas às suas contas, como validação de ID ou taxas associadas a serviços específicos (como prioridade em filas).

## 2. Solução Proposta

Um fluxo de checkout web multi-etapas que:
- Coleta e valida o ID do jogador.
- Informa sobre problemas (ID inválido, sobrecarga) e oferece soluções (pagamento de taxas).
- Processa pagamentos (inicialmente PIX) para essas taxas ou serviços ("Garena Tax", "Garena Reserve").
- Fornece feedback sobre o status do pedido/pagamento.

## 3. Experiência do Usuário

- **Clareza:** O usuário deve entender em qual etapa do processo está e qual ação é necessária.
- **Feedback:** Informações visuais sobre carregamento, validação, sucesso ou erro são importantes.
- **Simplicidade:** Apesar das múltiplas etapas, cada uma deve solicitar informações mínimas e ter um objetivo claro.
- **Tratamento de Erros:** Mensagens de erro devem ser informativas e guiar o usuário sobre como proceder (ex: ID inválido -> pagar taxa).

## 4. Fluxo Principal (Ideal)

1.  Usuário acessa a Etapa 01.
2.  Insere o ID do Free Fire.
3.  **Cenário A (ID Válido - Não Implementado/Visto):** (Suposição) Procede para a compra/resgate principal.
4.  **Cenário B (ID Inválido):**
    a. Pop-up informa sobre ID inválido e a necessidade de pagar "Garena Tax".
    b. Usuário clica em "PAGAR GARENA TAX" e é redirecionado para Checkout 03.
5.  Usuário preenche dados (Nome, CPF) no Checkout 03.
6.  Gera e paga o PIX de R$ 9,92 ("Garena Reserve"? ou "Garena Tax"?).
7.  Após confirmação (manual ou automática), é redirecionado para Etapa 02.
8.  Etapa 02 mostra "Pagamento Concluído" mas "Servidor Sobrecarregado".
9.  Usuário clica em "Resolver problema".
10. Vê informações sobre fila e a opção "Garena Reserve" para prioridade.
11. Clica em "Garena Reserve" e é redirecionado novamente para Checkout 03 (para pagar novamente? Ou um valor diferente?). 