// Element Seçimleri
const rainButton = document.querySelector('.rain-button');
const explosionMessage = createMessage('explosion-message', 'Seni Çok Seviyorum!', '#FF1493');
const underMessage = createMessage('under-message', 'İyi Ki Varsın!', '#00FF00');

let isBlinking = false;  // Yazıların yanıp sönüp sönmeyeceğini kontrol eden değişken
let isRainActive = true;  // Yağmurun aktif olup olmadığını kontrol eden değişken
let isHeartEffectActive = false;  // Kalp efekti aktif olup olmadığını kontrol eden değişken
let rainInterval, heartInterval;  // Yağmur ve kalp efektlerinin intervali

// Mesaj oluşturma fonksiyonu
function createMessage(className, text, color) {
    const message = document.createElement('div');
    message.classList.add(className);
    message.textContent = text;
    message.style.color = color;
    message.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`;
    document.body.appendChild(message);
    return message;
}

// Yağmur Efekti
function startRain() {
    if (isRainActive) {
        rainInterval = setInterval(() => {
            const rainDrop = document.createElement('div');
            const size = Math.random() * 10 + 5;  // 5px ile 15px arası rastgele boyut
            rainDrop.style.width = `${size}px`;
            rainDrop.style.height = `${size}px`;
            rainDrop.classList.add('rain');
            rainDrop.style.left = `${Math.random() * 100}%`;  // Rastgele yatay konum
            rainDrop.style.animationDuration = `${Math.random() * 2 + 2}s`;  // Rastgele hız
            document.querySelector('.rain-container').appendChild(rainDrop);

            // Yağmur damlasını animasyon tamamlandığında sil
            setTimeout(() => rainDrop.remove(), 4000);
        }, 100);
    }
}

// Kalp Efekti
function startHearts() {
    if (isHeartEffectActive) {
        heartInterval = setInterval(() => {
            const heartDrop = document.createElement('div');
            heartDrop.textContent = '💖';  // Kalp simgesi
            heartDrop.classList.add('heart');
            heartDrop.style.left = `${Math.random() * 100}%`;  // Rastgele yatay konum
            heartDrop.style.animationDuration = `${Math.random() * 2 + 2}s`;  // Rastgele hız
            document.querySelector('.rain-container').appendChild(heartDrop);

            // Kalp damlasını animasyon tamamlandığında sil
            setTimeout(() => heartDrop.remove(), 4000);
        }, 100);
    }
}

// Mesaj animasyonları
function startBlinking() {
    explosionMessage.style.visibility = 'visible';
    underMessage.style.visibility = 'visible';
    explosionMessage.style.animation = 'blink 1s infinite';
    underMessage.style.animation = 'blink 1s infinite';
    isBlinking = true;
}

// Mesajları durdurma
function stopBlinking() {
    explosionMessage.style.animation = 'none';
    underMessage.style.animation = 'none';
    explosionMessage.style.visibility = 'hidden';
    underMessage.style.visibility = 'hidden';
    isBlinking = false;
}

// Butona tıklama olayını dinleyelim
rainButton.addEventListener('click', () => {
    if (!isBlinking) {
        // Yazıların yanıp sönmesini başlat
        startBlinking();

        // Kalp yağmurunu başlat
        isHeartEffectActive = true;
        startHearts();

        // Yağmur duruyor
        isRainActive = false;
        clearInterval(rainInterval);  // Yağmur intervalini durdur
    } else {
        // Yazıların yanıp sönmesini durdur
        stopBlinking();

        // Kalp yağmuru duruyor
        isHeartEffectActive = false;
        clearInterval(heartInterval);  // Kalp yağmuru intervalini durdur

        // Yağmur yağmaya devam etsin
        isRainActive = true;
        startRain();  // Yağmur yağmaya devam etsin
    }
});

// Sayfa yüklendiğinde yağmurun başlamasını sağlamak
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.rain-container')) {
        const rainContainer = document.createElement('div');
        rainContainer.classList.add('rain-container');
        document.body.appendChild(rainContainer);
    }
    startRain();  // Sayfa yüklendiğinde yağmur başlatılır
});
