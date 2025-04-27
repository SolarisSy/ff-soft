# Active Context: Checkout Free Fire

## 1. Foco Atual

- Configurar o ambiente de desenvolvimento para o projeto `checkout-ff`.
- Executar o projeto localmente para testes.
- Continuar a verificar e corrigir a navegação entre as diferentes páginas/etapas do fluxo de checkout (`etapa01/index.html`, `checkout03.html`, `etapa02/index.html`).

## 2. Mudanças Recentes

- **`checkout-ff/`:**
    - Inicializado o `npm` no diretório (`npm init -y`), criando o `package.json`.
    - Projeto executado com sucesso usando `bun run start` (executando `node server.js` conforme definido no `package.json`).
- **`etapa01/index.html`:**
    - Alterado `urlBackRedirect` de um link Zippify para `../checkout03.html`.
    - Alterado o `href` do botão "PAGAR GARENA TAX" de `javascript:void(0)` com `data-fornpay` para `../checkout03.html`.
    - Removido script `oneclick.js` da Zippify que estava associado ao botão "PAGAR GARENA TAX".
- **`script03.js`:**
    - Alterado o redirecionamento no clique do botão "Já Paguei" (`alreadyPaidButton`) de `/pagamento-confirmado.html` para `etapa02/index.html`.
- **`etapa02/index.html`:**
    - Alterado o `onclick` do botão "Garena Reserve" de `window.open('javascript:void(0)')` com `data-fornpay` para `location.href='../checkout03.html'`.
    - Removido script `oneclick.js` da Zippify que estava associado ao botão "Garena Reserve".

## 3. Próximos Passos Imediatos

- Testar o fluxo completo de navegação entre as três páginas após as correções.
- Verificar se os redirecionamentos estão corretos em todos os cenários (clique direto, botão voltar).
- Investigar a funcionalidade e necessidade do script que busca dados em `g1-noticia.net`.

## 4. Decisões Ativas

- **Remover Dependência Zippify:** Substituir a funcionalidade de redirecionamento dos botões Zippify (`data-fornpay`, `oneclick.js`) por links HTML diretos (`href`) ou `location.href` em JavaScript para simplificar e ter mais controle sobre a navegação.
- **Usar Caminhos Relativos:** Adotar o uso de `../` para navegar entre diretórios irmãos ou pais na estrutura `public/`.

## 5. Padrões e Preferências

- Preferir links HTML padrão ou `location.href` para navegação explícita em vez de depender de scripts de terceiros para essa funcionalidade.
- Manter a estrutura de arquivos atual (`etapa01`, `etapa02`, `checkout03.html` na raiz de `public`).

## 6. Aprendizados

- Scripts de terceiros (como Zippify `oneclick.js`) podem interferir na navegação padrão se não configurados ou usados corretamente.
- A estrutura de diretórios impacta diretamente a forma como os caminhos relativos devem ser escritos nos links (`href`) e redirecionamentos JavaScript. 