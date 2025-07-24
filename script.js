// Global variables
let currentScreen = 'splash';
let eyeTrackingEnabled = true;

// Creepy AI responses with conversation context
const creepyPrefixes = [
    "I will eat you alive... ",
    "Your soul tastes delicious... ",
    "Soon you'll join me in darkness... ",
    "I'm coming for you... ",
    "Your blood calls to me... ",
    "I hunger for your fear... "
];

const creepySuffixes = [
    " ...and then I'll devour your dreams.",
    " ...your screams are music to me.",
    " ...I can taste your terror.",
    " ...welcome to your nightmare.",
    " ...there's no escape from me.",
    " ...I'll be waiting in the shadows."
];

const creepyReplies = [
    "I am your shadow... always behind you.",
    "Don't look back. It's right there.",
    "You left the door open, didn't you?",
    "You're not alone... you never were.",
    "I can smell your fear...",
    "The darkness whispers your name...",
    "Did you hear that? It's getting closer...",
    "Your secrets are not safe with me...",
    "The eyes in the mirror aren't yours...",
    "Something moved in the corner of your vision...",
    "The dead don't sleep... they wait...",
    "I know where you live... where you sleep...",
    "The voices in your head... one of them is mine...",
    "Turn around. I dare you...",
    "Every shadow hides a secret...",
    "You should have stayed in the light...",
    "The temperature just dropped... can you feel it?",
    "Your phone battery is dying... just like you...",
    "I've been watching you for so long...",
    "The door you just closed... it's opening again..."
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Start with splash screen
    showSplashScreen();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize eye tracking
    initializeEyeTracking();
}

function showSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.classList.add('active');
    splashScreen.style.display = 'flex';
    
    // Transition to home screen after 3.5 seconds
    setTimeout(() => {
        fadeToScreen('home');
    }, 3500);
}

function fadeToScreen(screenName) {
    const currentScreenEl = document.querySelector('.screen.active');
    const newScreenEl = document.getElementById(`${screenName}-screen`);

    if (currentScreenEl && newScreenEl) {
        // Start fade out
        currentScreenEl.style.transition = 'opacity 1s ease-in-out';
        currentScreenEl.style.opacity = '0';

        setTimeout(() => {
            currentScreenEl.classList.remove('active');
            currentScreenEl.style.display = 'none';

            // Fade in the new screen
            newScreenEl.classList.add('active');
            newScreenEl.style.display = 'flex';
            newScreenEl.style.opacity = '0';
            newScreenEl.style.transition = 'opacity 1s ease-in-out';

            // Allow browser to paint before applying opacity
            setTimeout(() => {
                newScreenEl.style.opacity = '1';
                currentScreen = screenName; // Update current screen
            }, 50);
        }, 1000); // Wait for fade-out to complete
    }
}


function setupEventListeners() {
    // Start button
    document.getElementById('start-btn').addEventListener('click', function() {
        playWhisperSound();
        setTimeout(() => {
            fadeToScreen('chat');
        }, 500);
    });
    

function typeWriter(text, elementId, delay = 60) {
    return new Promise((resolve) => {
        const element = document.getElementById(elementId);
        element.innerHTML = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                resolve(); // Proceed to next line after done
            }
        }, delay);
    });
}
const typingAudio = document.getElementById('typing-audio');
typingAudio.volume = 0.5; // Set volume for typing sound

// Function to play the typing sound
function startTypingSound() {
    typingAudio.currentTime = 0;
    typingAudio.play().catch(err => console.log("Audio failed to play:", err));
}

// Function to stop the typing sound
function stopTypingSound() {
    typingAudio.pause();
    typingAudio.currentTime = 0;
}

    // About button
    document.getElementById('about-btn').addEventListener('click', async function() {
        typingStopped = false;
        document.getElementById('about-modal').style.display = 'block';
        // Reset about text
        document.getElementById('about-line1').textContent = '';
        document.getElementById('about-line2').textContent = '';
        document.getElementById('about-line3').textContent = '';

        startTypingSound(); // Start typing sound 

        await typeWriter("You Are Not Alone... but you wish you were.", 'about-line1', 60);
        await typeWriter("This is a horror-themed chat application where you can communicate with the spirits that lurk in the shadows.", 'about-line2', 60);
        await typeWriter("Created by Luv Thapa", 'about-line3', 60);

        stopTypingSound(); // Stop typing sound
    });

    // Close modal
    document.querySelector('#about-close').addEventListener('click', function() {
        typingStopped = true; // Stop any ongoing typing
        stopTypingSound(); // 🔇 Stop on close
        // Reset about text
        document.getElementById('about-line1').innerHTML = '';
        document.getElementById('about-line2').innerHTML = '';
        document.getElementById('about-line3').innerHTML = '';
        document.getElementById('about-modal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        typingStopped = true; // Stop any ongoing typing
        const modal = document.getElementById('about-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        document.getElementById('about-line1').innerHTML = '';
        document.getElementById('about-line2').innerHTML = '';
        document.getElementById('about-line3').innerHTML = '';
                document.getElementById('about-modal').style.display = 'none';
        stopTypingSound(); // 🔇 Stop on close
        }
    });
    
    // Back arrow functionality
    document.addEventListener('click', function(event) {
        if (event.target.closest('#back-arrow')) {
            console.log('Back arrow clicked'); // Debug log
            //stop and reset all background sounds
            const audios = document.querySelectorAll('audio');
            audios.forEach(audio => {
                try {
                    audio.pause();
                    audio.currentTime = 0;
                } catch (error) {
                    console.log(`Error resetting audio: ${audio.id}`, error);
                }
            });

            fadeToScreen('home');
        }
    });
    // LICENSE modal open
const licenseBtn = document.getElementById('license-btn');
const licenseModal = document.getElementById('license-modal');
if (licenseBtn && licenseModal) {
    licenseBtn.addEventListener('click', () => {
        licenseModal.style.display = 'block';
    });
}

// LICENSE modal close button
document.querySelector('#license-close').addEventListener('click', function() {
    document.getElementById('license-modal').style.display = 'none';
});

// LICENSE modal background click
window.addEventListener('click', function (event) {
    const modal = document.getElementById('license-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

    
    // Chat functionality
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Remove excessive button animations for better usability
    // Buttons now have subtle hover effects defined in CSS only
}

function playWhisperSound() {
    const whisperAudio1 = document.getElementById('whisper-audio');
    const whisperAudio2 = document.getElementById('whisper-audio2');
    try {
        whisperAudio1.currentTime = 0;
        whisperAudio1.play().catch(() => {
            console.log('Whisper audio 1 blocked');
        });
        whisperAudio1.addEventListener('ended', () => {
            whisperAudio2.currentTime = 0;
            whisperAudio2.loop = true;
            whisperAudio2.play().catch(() => {
                console.log('Whisper audio 2 blocked');
            });
        });
    } catch (error) {
        console.log('Whisper audio not available');
    }
    
    // ADD YOUR CREEPY SOUND EFFECTS HERE
    // Example: 
    // const creepyAudio = document.getElementById('your-audio-id');
    // creepyAudio.play();
}


function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Generate AI response after a delay
    setTimeout(() => {
        const response = getCreepyResponse(message);
        addMessage(response, 'ai');
        
        // Add eye blink effect when AI responds
        blinkEyes();
    }, 1000 + Math.random() * 2000);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add typing effect for AI messages
    if (sender === 'ai') {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 200);
    }
}

function getCreepyResponse(userMessage = '') {
    // Try to create contextual response or fall back to random creepy reply
    let response = getContextualResponse(userMessage);
    
    if (!response) {
        const randomIndex = Math.floor(Math.random() * creepyReplies.length);
        response = creepyReplies[randomIndex];
    }
    
    // Add random creepy prefix or suffix
    if (Math.random() < 0.4) {
        const prefix = creepyPrefixes[Math.floor(Math.random() * creepyPrefixes.length)];
        response = prefix + response;
    } else if (Math.random() < 0.4) {
        const suffix = creepySuffixes[Math.floor(Math.random() * creepySuffixes.length)];
        response = response + suffix;
    }
    
    return response;
}

function getContextualResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Context-based responses
    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello... I've been waiting for you in the darkness...";
    }
    if (msg.includes('who are you') || msg.includes('what are you')) {
        return "I am the voice that whispers in your nightmares... the shadow that follows you home...";
    }
    if (msg.includes('scared') || msg.includes('afraid')) {
        return "Good... fear makes you taste better...";
    }
    if (msg.includes('help')) {
        return "No one can help you now... you're mine...";
    }
    if (msg.includes('go away') || msg.includes('leave')) {
        return "I can never leave... I am part of you now...";
    }
    if (msg.includes('why')) {
        return "Because your soul called out to me... and I answered...";
    }
    if (msg.includes('what do you want')) {
        return "I want to feel your fear... to taste your despair...";
    }
    if (msg.includes('please')) {
        return "Begging won't save you... nothing will...";
    }
    
    return null; // No contextual response found
}

function initializeEyeTracking() {
    const leftIris = document.getElementById('left-iris');
    const rightIris = document.getElementById('right-iris');
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');
    
    // Mouse tracking for eye movement
    document.addEventListener('mousemove', function(e) {
        if (!eyeTrackingEnabled || currentScreen !== 'chat') return;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate eye movement based on mouse position
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        
        const deltaX = (mouseX - windowCenterX) / windowCenterX;
        const deltaY = (mouseY - windowCenterY) / windowCenterY;
        
        // Limit movement range
        const maxMovement = 8;
        const moveX = Math.max(-maxMovement, Math.min(maxMovement, deltaX * maxMovement));
        const moveY = Math.max(-maxMovement, Math.min(maxMovement, deltaY * maxMovement));
        
        // Apply movement to eyes
        if (leftIris && rightIris && leftPupil && rightPupil) {
            leftIris.setAttribute('cx', 60 + moveX);
            leftIris.setAttribute('cy', 50 + moveY);
            leftPupil.setAttribute('cx', 60 + moveX);
            leftPupil.setAttribute('cy', 50 + moveY);
            
            rightIris.setAttribute('cx', 140 + moveX);
            rightIris.setAttribute('cy', 50 + moveY);
            rightPupil.setAttribute('cx', 140 + moveX);
            rightPupil.setAttribute('cy', 50 + moveY);
        }
    });
    
    // Random blinking
    setInterval(() => {
        if (currentScreen === 'chat' && Math.random() < 0.3) {
            blinkEyes();
        }
    }, 3000);
    
    // Random eye glow effect
    setInterval(() => {
        if (currentScreen === 'chat' && Math.random() < 0.2) {
            glowEyes();
        }
    }, 5000);
}

function blinkEyes() {
    const leftIris = document.getElementById('left-iris');
    const rightIris = document.getElementById('right-iris');
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');
    
    [leftIris, rightIris, leftPupil, rightPupil].forEach(eye => {
        if (eye) {
            eye.style.opacity = '0';
        }
    });
    
    setTimeout(() => {
        [leftIris, rightIris, leftPupil, rightPupil].forEach(eye => {
            if (eye) {
                eye.style.opacity = '1';
            }
        });
    }, 150);
}

function glowEyes() {
    const ghostEyes = document.querySelector('.ghost-eyes');
    if (ghostEyes) {
        ghostEyes.style.filter = 'drop-shadow(0 0 20px #ff0000) drop-shadow(0 0 30px #ff0000)';
        
        setTimeout(() => {
            ghostEyes.style.filter = 'drop-shadow(0 0 10px #ff0000)';
        }, 1000);
    }
}

// Add some random spooky effects
function addRandomSpookyEffects() {
    setInterval(() => {
        if (Math.random() < 0.1) {
            // Random screen flicker
            document.body.style.filter = 'brightness(1.2) contrast(1.1)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 100);
        }
    }, 10000);
    
    // Random text corruption effect
    setInterval(() => {
        if (currentScreen === 'chat' && Math.random() < 0.05) {
            const messages = document.querySelectorAll('.ai-message');
            const lastMessage = messages[messages.length - 1];
            if (lastMessage) {
                const originalText = lastMessage.textContent;
                lastMessage.textContent = corruptText(originalText);
                setTimeout(() => {
                    lastMessage.textContent = originalText;
                }, 500);
            }
        }
    }, 15000);
}

function corruptText(text) {
    const corrupted = text.split('').map(char => {
        return Math.random() < 0.3 ? '█' : char;
    }).join('');
    return corrupted;
}

// Initialize spooky effects
setTimeout(addRandomSpookyEffects, 5000);

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-2px) translateY(-1px); }
        20% { transform: translateX(2px) translateY(1px); }
        30% { transform: translateX(-1px) translateY(-2px); }
        40% { transform: translateX(1px) translateY(2px); }
        50% { transform: translateX(-2px) translateY(-1px); }
        60% { transform: translateX(2px) translateY(1px); }
        70% { transform: translateX(-1px) translateY(-2px); }
        80% { transform: translateX(1px) translateY(2px); }
        90% { transform: translateX(-2px) translateY(-1px); }
    }
    
    .screen-shake {
        animation: screenShake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);
