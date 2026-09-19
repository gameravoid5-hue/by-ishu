// --- 1. GIFT OPENING LOGIC ---
function openGift() {
    const giftScreen = document.getElementById('gift-screen');
    const mainContent = document.getElementById('main-content');
    
    // Animate out gift screen
    giftScreen.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    giftScreen.style.opacity = "0";
    giftScreen.style.transform = "scale(1.1)";
    
    setTimeout(() => {
        giftScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0);
        startGame(); // Initialize mini game early
    }, 800);
}

// --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Do not unobserve if you want it to fade in every time it's scrolled,
            // but standard behavior is to unobserve after first reveal for performance.
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observe major sections
document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
});

// Observe individual text paragraphs for cinematic scroll
document.querySelectorAll('.scroll-fade').forEach(p => {
    observer.observe(p);
});

// --- CARD TOGGLE LOGIC ---
function toggleCard(card) {
    card.classList.toggle('flipped');
}

// --- MOOD BOOSTER ---
const moodMessages = [
    "Bas breathe karo Aaku... slowly.",
    "Aaj ka din bad ho sakta hai, but tum bad nahi ho.",
    "Thoda rest kar lo, baaki baad mein.",
    "Tumhe sab kuch ek saath solve karne ki zarurat nahi hai.",
    "Your Ishu is rooting for you. ❤️",
    "Ab ek chhoti si smile please. 🥺"
];

function showMoodMessage() {
    const outputDiv = document.getElementById('mood-output');
    const randomMsg = moodMessages[Math.floor(Math.random() * moodMessages.length)];
    outputDiv.innerText = randomMsg;
    outputDiv.style.display = 'block';
}

// --- DAILY MESSAGE ---
const dailyMessages = [
    "Tum kar sakti ho. Bas khud ko thoda time do.",
    "Don't overthink everything, Aaku.",
    "Paani piyo. Rest karo. Baaki baad mein. 😭",
    "You are appreciated.",
    "Tumhe har waqt strong banne ki zarurat nahi hai.",
    "Ek bad day ka matlab bad life nahi hota.",
    "Your Ishu is cheering for you.",
    "Smile please... warna main complain karunga. 😂",
    "Tumhari smile duniya ki best cheez hai.",
    "Gussa kam kiya karo, you look cute anyway. 😡❤️"
];

function showDailyMessage() {
    const outputDiv = document.getElementById('daily-output');
    const randomMsg = dailyMessages[Math.floor(Math.random() * dailyMessages.length)];
    outputDiv.innerText = randomMsg;
    outputDiv.style.display = 'block';
}

// --- OPEN WHEN MODALS ---
const openWhenMessages = {
    sad: "Jab tum sad hoti ho toh mujhe bilkul achha nahi lagta. Bas yaad rakhna main hamesha tumhare saath hoon. 🫂",
    angry: "I know main bahut pareshan karta hoon, but sorry na. Please gussa chhod do 🥺❤️",
    miss: "Main bhi tumhe bahut miss kar raha hoon! Jaldi se call kar lo ya msg drop karo. 🥰",
    motivation: "Aaku, tum jitni strong ho utna tum khud bhi nahi jaanti. Take one step at a time, you got this! 💪",
    sleep: "Phone side rakho, aankhein band karo, aur kisi achhi memory ke baare mein socho... goodnight. 🌙",
    happy: "Tumhari khushi dekh kar meri life waise hi better ho jaati hai. Keep smiling always! 😊"
};

function openModal(type) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');
    modalText.innerText = openWhenMessages[type];
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

// --- ROMANTIC CHOICES ---
const choiceResponses = {
    hug: "Main smile karta hoon aur bolta hoon:\n'Bas... ab mood thoda better hona chahiye. ❤️'",
    compliment: "Main bolta hoon:\n'Waise Aaku... tum aaj genuinely bahut cute lag rahi ho.'\n\nAaku: 'Tum aaj kuch zyada hi sweet ban rahe ho. 😂'",
    tease: "Main:\n'Aaj tumhe thoda pareshan karne ka mann hai. 😌'\n\nAaku:\n'Bilkul nahi.'\n\nIshu:\n'Too late. 😂'"
};

function showChoice(choice) {
    const outputDiv = document.getElementById('choice-output');
    outputDiv.innerText = choiceResponses[choice];
    outputDiv.style.display = 'block';
}

// --- CUSTOM AUDIO PLAYER ---
const audio = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const albumArt = document.querySelector('.album-art');

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '⏸️ Pause';
        albumArt.classList.add('playing');
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '▶️ Play';
        albumArt.classList.remove('playing');
    }
}

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;
});

function seekAudio() {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// --- SECRET PASSWORD ---
function checkPassword() {
    const passInput = document.getElementById('secretPass').value;
    const errorMsg = document.getElementById('password-error');
    const lockScreen = document.getElementById('lock-screen');
    const secretContent = document.getElementById('secret-content');

    if (passInput === '143') {
        lockScreen.style.display = 'none';
        secretContent.classList.remove('hidden');
    } else {
        errorMsg.style.display = 'block';
    }
}

// --- MINI GAME: CATCH THE HEARTS ---
let score = 0;
const totalHeartsToWin = 5;
let gameInterval;

function startGame() {
    const gameArea = document.getElementById('game-area');
    
    gameInterval = setInterval(() => {
        if(score >= totalHeartsToWin) {
            clearInterval(gameInterval);
            return;
        }

        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = ['❤️', '🤍', '💖', '💕'][Math.floor(Math.random() * 4)];
        
        // Random horizontal position
        heart.style.left = Math.random() * 80 + '%';
        // Random animation duration
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        heart.onclick = () => catchHeart(heart);
        
        gameArea.appendChild(heart);

        // Remove heart if missed
        setTimeout(() => {
            if(heart.parentElement) heart.remove();
        }, 5000);

    }, 1000);
}

function catchHeart(heartElement) {
    if (score >= totalHeartsToWin) return;
    
    heartElement.remove();
    score++;
    document.getElementById('heart-score').innerText = score;

    if (score === totalHeartsToWin) {
        document.getElementById('game-area').style.display = 'none';
        document.getElementById('game-won').classList.remove('hidden');
    }
}

function scrollToFinal() {
    document.getElementById('final-message').scrollIntoView({ behavior: 'smooth' });
}