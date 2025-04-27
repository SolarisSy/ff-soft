document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    const pixSection = document.getElementById('pix-section');
    const qrCodeContainer = document.getElementById('qrcode-container');
    const pixCopiaCola = document.getElementById('pix-copia-cola');
    const expirationInfo = document.getElementById('expiration-info');
    const statusMessage = document.getElementById('status-message');
    const copyButton = document.getElementById('copy-button');
    const checkPaymentButton = document.getElementById('check-payment-button');
    const alreadyPaidButton = document.getElementById('already-paid-button');
    const loadingIndicator = document.getElementById('loading-indicator');
    const submitButton = form.querySelector('button[type="submit"]');

    let currentTransactionId = null;
    let pollingIntervalId = null;

    // --- Lógica para mensagens de loading dinâmicas (reutilizada) ---
    let loadingIntervalId = null;
    let currentMessageIndex = 0;
    const loadingMessages = [
        "Conectando com nossos servidores...",
        "Validando suas informações...",
        "Processando sua reserva...", // Mensagem adaptada
        "Gerando seu código PIX seguro...",
        "Quase pronto!",
        "Finalizando..."
    ];

    function startLoadingAnimation() {
        currentMessageIndex = 0;
        loadingIndicator.textContent = loadingMessages[currentMessageIndex];
        loadingIndicator.classList.remove('hidden');
        submitButton.disabled = true;
        if (loadingIntervalId) clearInterval(loadingIntervalId);
        loadingIntervalId = setInterval(() => {
            currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
            loadingIndicator.textContent = loadingMessages[currentMessageIndex];
        }, 2000);
    }

    function stopLoadingAnimation() {
        if (loadingIntervalId) {
            clearInterval(loadingIntervalId);
            loadingIntervalId = null;
        }
        loadingIndicator.classList.add('hidden');
        submitButton.disabled = false;
    }
    // --- Fim da lógica de loading ---


    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        stopPolling();
        clearPixDisplay();
        statusMessage.textContent = '';
        statusMessage.className = '';

        startLoadingAnimation();

        // --- Coleta dados do formulário SIMPLIFICADO ---
        const fullName = document.getElementById('name').value;
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        // -----------------------------------------------

        // --- Dados Fixos e para API SharkPay (CHECKOUT 03) ---
        const fixedAmount = 992; // Valor Garena Reserve em centavos

        const customerData = {
            name: fullName,
            document: {
                type: 'cpf',
                number: cpf
            }
        };

        const itemsData = [
            {
                title: 'Garena Reserve', // Título do item
                quantity: 1,
                unitPrice: fixedAmount,
                tangible: false
            }
        ];

        const payload = {
            amount: fixedAmount,
            items: itemsData,
            customer: customerData
            // metadata: { product: 'Garena Reserve' }
        };
        // -------------------------------------------

        try {
            const response = await fetch('/api/criar-pix', { // Chama o mesmo endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.qrCodeString) {
                currentTransactionId = data.transactionId;
                displayPix(data.qrCodeString, data.qrCodeImageDataUrl, data.expirationDate);
                statusMessage.textContent = 'PIX gerado! Aguardando pagamento...';
                statusMessage.className = 'info';
                form.classList.add('hidden');
                startPolling(currentTransactionId);
            } else {
                console.error('Erro do servidor:', data);
                statusMessage.textContent = `Erro ao gerar PIX: ${data.error || 'Tente novamente.'}`;
                statusMessage.className = 'error';
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            statusMessage.textContent = 'Erro de comunicação ao gerar PIX. Verifique sua conexão.';
            statusMessage.className = 'error';
        } finally {
            stopLoadingAnimation();
        }
    });

    // Funções copyButton, displayPix, clearPixDisplay (reutilizadas) ...

    copyButton.addEventListener('click', () => {
        pixCopiaCola.select();
        try {
            document.execCommand('copy');
            copyButton.textContent = 'Copiado!';
            setTimeout(() => { copyButton.textContent = 'Copiar Código'; }, 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    });

    function displayPix(qrCodeString, qrCodeImageDataUrl, expirationDate) {
        qrCodeContainer.innerHTML = '';
        pixCopiaCola.value = qrCodeString;
        if (qrCodeImageDataUrl) {
            const img = document.createElement('img');
            img.src = qrCodeImageDataUrl;
            img.alt = 'QR Code PIX';
            qrCodeContainer.appendChild(img);
        } else {
            qrCodeContainer.innerHTML = "<p class='error'>Não foi possível carregar a imagem do QR Code.</p>";
        }
        if (expirationDate) {
            const date = new Date(expirationDate);
            try {
                expirationInfo.textContent = `Pagar até: ${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`;
            } catch(e) {
                 expirationInfo.textContent = `Pagar até: ${expirationDate}`;
                 console.error("Erro ao formatar data: ", e);
            }
        } else {
            expirationInfo.textContent = 'Pague o quanto antes.';
        }
        pixSection.classList.remove('hidden');
        checkPaymentButton.classList.remove('hidden');
        alreadyPaidButton.classList.remove('hidden');
    }

    function clearPixDisplay() {
        pixSection.classList.add('hidden');
        qrCodeContainer.innerHTML = '';
        pixCopiaCola.value = '';
        expirationInfo.textContent = '';
        statusMessage.textContent = '';
        statusMessage.className = '';
        if (loadingIntervalId) {
             stopLoadingAnimation();
        } else {
             if(loadingIndicator) loadingIndicator.classList.add('hidden');
        }
        checkPaymentButton.classList.add('hidden');
        alreadyPaidButton.classList.add('hidden');
        stopPolling();
        currentTransactionId = null;
        form.classList.remove('hidden'); // Reexibe o formulário ao limpar
    }

    checkPaymentButton.addEventListener('click', () => {
        if (currentTransactionId) {
            console.log(`(03) Verificando status para transação: ${currentTransactionId}`);
            checkPaymentStatus(currentTransactionId);
        } else {
            alert('(03) Gere um PIX primeiro.');
        }
    });

    alreadyPaidButton.addEventListener('click', () => {
        console.log('(03) Botão "Já Paguei" clicado. Redirecionando...');
        stopPolling();
        window.location.href = 'etapa02/index.html';
    });

    function startPolling(transactionId) {
        stopPolling();
        console.log(`(03) Iniciando polling para transação: ${transactionId}`);
        statusMessage.textContent = 'Aguardando confirmação de pagamento...';
        statusMessage.className = 'info';
        pollingIntervalId = setInterval(() => {
            checkPaymentStatus(transactionId);
        }, 5000);
    }

    function stopPolling() {
        if (pollingIntervalId) {
            console.log('(03) Parando polling.');
            clearInterval(pollingIntervalId);
            pollingIntervalId = null;
        }
    }

    async function checkPaymentStatus(transactionId) {
        if (!transactionId) return;
        console.log(`(03) Verificando status para ${transactionId}...`);
        try {
            const response = await fetch(`/api/check-status/${transactionId}`);
            if (!response.ok) {
                console.warn(`(03) Erro ao verificar status (${response.status}), continuando polling.`);
                if(statusMessage.className !== 'success' && statusMessage.className !== 'error') {
                     statusMessage.textContent = 'Verificando confirmação...';
                     statusMessage.className = 'info';
                }
                return;
            }
            const data = await response.json();
            console.log('(03) Status recebido:', data.status);
            statusMessage.textContent = `Status: ${data.status}`;
            statusMessage.className = 'info';
            if (data.status === 'paid' || data.status === 'approved') {
                console.log('(03) Pagamento confirmado!');
                statusMessage.textContent = 'Pagamento confirmado! Redirecionando...';
                statusMessage.className = 'success';
                stopPolling();
                setTimeout(() => {
                    window.location.href = '/pagamento-confirmado.html';
                }, 2000);
            } else if (['refused', 'cancelled', 'chargeback', 'refunded'].includes(data.status)) {
                console.log('(03) Pagamento falhou ou foi cancelado.');
                statusMessage.textContent = `Pagamento ${data.status}. Tente novamente.`;
                statusMessage.className = 'error';
                stopPolling();
            }
        } catch (error) {
            console.error('(03) Erro durante o polling:', error);
            statusMessage.textContent = 'Erro ao verificar status.';
            statusMessage.className = 'error';
        }
    }
}); 