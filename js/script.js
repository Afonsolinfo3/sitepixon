// Animações de fade-in ao rolar (mantido)
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.feature, .card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});

// Smooth scroll para links internos (mantido)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Função para criar pagamento via Mercado Pago
async function createPayment(serviceName, price) {
    const accessToken = 'APP_USR-2873100517695045-081414-09480b504d4f981b2f86bb8c8efda709-1892616728'; // Seu token (proteja em produção!)

    const preference = {
        items: [
            {
                title: serviceName,
                quantity: 1,
                unit_price: price,
                currency_id: 'BRL'
            }
        ],
        back_urls: {
            success: 'https://wa.me/5511999999999', // Redireciona para WhatsApp após sucesso
            failure: window.location.href,
            pending: window.location.href
        },
        auto_return: 'approved'
    };

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(preference)
        });

        const data = await response.json();
        if (data.init_point) {
            window.location.href = data.init_point; // Redireciona para o checkout do Mercado Pago
        } else {
            alert('Erro ao criar pagamento. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro na API do Mercado Pago:', error);
        alert('Erro de conexão. Verifique sua internet.');
    }
}