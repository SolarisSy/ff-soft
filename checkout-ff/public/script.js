document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const precoParam = urlParams.get('preco');
    const diamantesParam = urlParams.get('diamantes');
    const ofertasParam = urlParams.get('ofertas');

    const finalPriceElement = document.querySelector('.final-price span:last-child');
    const totalDiamondsElement = document.querySelector('.total-diamonds span:last-child');
    const offersListContainer = document.getElementById('special-offers-list');

    if (precoParam && finalPriceElement) {
        const precoFormatado = parseFloat(precoParam).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        finalPriceElement.textContent = precoFormatado;
    }

    if (diamantesParam && totalDiamondsElement) {
        const diamantesFormatado = parseInt(diamantesParam).toLocaleString('pt-BR');
        const diamondIcon = totalDiamondsElement.querySelector('img');
        totalDiamondsElement.textContent = ` ${diamantesFormatado}`;
        if (diamondIcon) {
            totalDiamondsElement.insertBefore(diamondIcon, totalDiamondsElement.firstChild);
        }
    }

    if (ofertasParam && offersListContainer) {
        try {
            const decodedOffers = decodeURIComponent(ofertasParam);
            const offers = JSON.parse(decodedOffers);

            if (Array.isArray(offers) && offers.length > 0) {
                offersListContainer.innerHTML = '';

                offers.forEach(offer => {
                    const offerDiv = document.createElement('div');
                    offerDiv.classList.add('special-offer-item');

                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = `+ ${offer.name}`;

                    const priceSpan = document.createElement('span');
                    const priceFormatted = offer.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    priceSpan.textContent = priceFormatted;

                    offerDiv.appendChild(nameSpan);
                    offerDiv.appendChild(priceSpan);
                    offersListContainer.appendChild(offerDiv);
                });
            } else {
                 offersListContainer.innerHTML = '';
            }
        } catch (e) {
            console.error('Erro ao processar ofertas especiais:', e);
            offersListContainer.innerHTML = '<p class="error">Erro ao carregar ofertas.</p>';
        }
    }

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
    const displayPlayerName = document.getElementById('display-player-name');
    const playerNameInput = document.getElementById('player-name');

    let currentTransactionId = null;
    let pollingIntervalId = null;
    let loadingIntervalId = null;
    let currentMessageIndex = 0;
    const loadingMessages = [
        "Conectando com nossos servidores...",
        "Validando suas informações...",
        "Reservando seus diamantes...",
        "Gerando seu código PIX seguro...",
        "Quase pronto!",
        "Só mais um instante..."
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

    if (playerNameInput && displayPlayerName) {
        playerNameInput.addEventListener('input', (e) => {
            displayPlayerName.textContent = e.target.value || '';
        });
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        stopPolling();
        clearPixDisplay();
        statusMessage.textContent = '';
        statusMessage.className = '';

        startLoadingAnimation();

        const playerName = document.getElementById('player-name').value;
        const fullName = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        const dob = document.getElementById('dob').value;
        const phone = document.getElementById('phone').value.replace(/\D/g, '');
        const promoCode = document.getElementById('promo').value;

        const fixedAmount = 3600;

        const customerData = {
            name: fullName,
            email: email,
            document: {
                type: 'cpf',
                number: cpf
            },
            phone: phone
        };

        const itemsData = [
            {
                title: '5600 + 1120 Diamantes Bônus Free Fire',
                quantity: 1,
                unitPrice: fixedAmount,
                tangible: false
            }
        ];

        const payload = {
            amount: fixedAmount,
            items: itemsData,
            customer: customerData,
            metadata: {
                playerName: playerName,
                dateOfBirth: dob,
                promoCodeApplied: promoCode
            }
        };

        try {
            const response = await fetch('/api/criar-pix', {
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

    checkPaymentButton.addEventListener('click', () => {
        if (currentTransactionId) {
            console.log(`Simulando verificação de status para transação: ${currentTransactionId}`);
            checkPaymentStatus(currentTransactionId);
        } else {
            console.log('Nenhuma transação PIX ativa para verificar.');
            alert('Gere um PIX primeiro para verificar o status.');
        }
    });

    alreadyPaidButton.addEventListener('click', () => {
        console.log('Botão "Já Paguei" clicado. Redirecionando para confirmação...');
        stopPolling();
        window.location.href = '/pagamento-confirmado.html';
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
    }

    function startPolling(transactionId) {
        stopPolling();
        console.log(`Iniciando polling para transação: ${transactionId}`);
        statusMessage.textContent = 'Aguardando confirmação de pagamento...';
        statusMessage.className = 'info';

        pollingIntervalId = setInterval(() => {
            checkPaymentStatus(transactionId);
        }, 5000);
    }

    function stopPolling() {
        if (pollingIntervalId) {
            console.log('Parando polling.');
            clearInterval(pollingIntervalId);
            pollingIntervalId = null;
        }
    }

    async function checkPaymentStatus(transactionId) {
        if (!transactionId) return;
        console.log(`Verificando status para ${transactionId}...`);
        try {
            const response = await fetch(`/api/check-status/${transactionId}`);
            if (!response.ok) {
                console.warn(`Erro ao verificar status (${response.status}), continuando polling.`);
                if(statusMessage.className !== 'success' && statusMessage.className !== 'error') {
                     statusMessage.textContent = 'Verificando confirmação...';
                     statusMessage.className = 'info';
                }
                return;
            }

            const data = await response.json();
            console.log('Status recebido:', data.status);
            statusMessage.textContent = `Status: ${data.status}`;
            statusMessage.className = 'info';

            if (data.status === 'paid' || data.status === 'approved') {
                console.log('Pagamento confirmado!');
                statusMessage.textContent = 'Pagamento confirmado! Redirecionando...';
                statusMessage.className = 'success';
                stopPolling();
                setTimeout(() => {
                    window.location.href = '/pagamento-confirmado.html';
                }, 2000);
            } else if (['refused', 'cancelled', 'chargeback', 'refunded'].includes(data.status)) {
                console.log('Pagamento falhou ou foi cancelado.');
                statusMessage.textContent = `Pagamento ${data.status}. Tente novamente.`;
                statusMessage.className = 'error';
                stopPolling();
            }

        } catch (error) {
            console.error('Erro durante o polling:', error);
            statusMessage.textContent = 'Erro ao verificar status.';
            statusMessage.className = 'error';
        }
    }
}); 