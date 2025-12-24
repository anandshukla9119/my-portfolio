/* ═══════════════════════════════════════════════════════════════
   🔴 STRANGER THINGS PORTFOLIO - COMPLETE JAVASCRIPT
   Author: Anand Prakash Shukla
   Features: Theme Toggle, Notifications, Particles, Typewriter
   Version: 2.0 - With Theme Notifications
═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// 📦 DOM ELEMENTS
// ═══════════════════════════════════════════════════════════════

const body = document.body;
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('themeToggle');
const screenFlicker = document.getElementById('screenFlicker');
const particlesContainer = document.getElementById('particles');
const typewriterElement = document.getElementById('typewriter');
const navLinks = document.querySelectorAll('.nav-link');
const skillItems = document.querySelectorAll('.skill-item');
const timelineItems = document.querySelectorAll('.timeline-item');
const projectCards = document.querySelectorAll('.project-card');
const aboutCards = document.querySelectorAll('.about-card');
const contactForm = document.getElementById('contactForm');

// ═══════════════════════════════════════════════════════════════
// 🔔 THEME NOTIFICATION SYSTEM
// ═══════════════════════════════════════════════════════════════

class ThemeNotification {
    constructor() {
        this.currentNotification = null;
    }

    show(type) {
        // Remove any existing notification
        this.remove();

        const config = this.getConfig(type);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `theme-notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${config.icon}</span>
            <div class="notification-content">
                <span class="notification-title">${config.title}</span>
                <span class="notification-text">${config.text}</span>
            </div>
            <button class="close-btn" aria-label="Close">&times;</button>
        `;

        // Add to DOM
        document.body.appendChild(notification);
        this.currentNotification = notification;

        // Close button handler
        notification.querySelector('.close-btn').addEventListener('click', () => {
            this.remove();
        });

        // Auto remove after 4 seconds
        setTimeout(() => {
            this.remove();
        }, 4000);
    }

    getConfig(type) {
        if (type === 'upside-down') {
            return {
                icon: '🌀',
                title: 'ENTERED THE UPSIDE DOWN',
                text: 'The Demogorgon is watching... Stay alert!'
            };
        } else {
            return {
                icon: '🏠',
                title: 'SAFE IN HAWKINS',
                text: 'Welcome back to the normal world!'
            };
        }
    }

    remove() {
        if (this.currentNotification) {
            this.currentNotification.classList.add('hiding');
            setTimeout(() => {
                if (this.currentNotification && this.currentNotification.parentElement) {
                    this.currentNotification.remove();
                }
                this.currentNotification = null;
            }, 500);
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// 🎨 THEME TOGGLE SYSTEM
// ═══════════════════════════════════════════════════════════════

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'hawkins-mode';
        this.toggleBtn = themeToggle;
        this.notification = new ThemeNotification();
        this.isFirstLoad = true;
        this.init();
    }

    init() {
        // Apply saved theme on load (without notification)
        this.applyTheme(this.currentTheme, false);
        
        // Add click listener
        this.toggleBtn.addEventListener('click', () => this.toggle());
        
        // First load complete
        this.isFirstLoad = false;
    }

    applyTheme(theme, showNotification = true) {
        body.classList.remove('hawkins-mode', 'upside-down-mode');
        body.classList.add(theme);
        
        // Update button text
        const toggleText = this.toggleBtn.querySelector('.toggle-text');
        const toggleIcon = this.toggleBtn.querySelector('.toggle-icon');
        
        if (theme === 'hawkins-mode') {
            toggleText.textContent = 'Enter The Gate';
            toggleIcon.textContent = '🌀';
        } else {
            toggleText.textContent = 'Escape to Hawkins';
            toggleIcon.textContent = '🏠';
        }

        // Save to localStorage
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;

        // Generate particles for Upside Down mode
        if (theme === 'upside-down-mode') {
            particleSystem.generate();
        } else {
            particleSystem.clear();
        }

        // Show notification (only after first load)
        if (showNotification && !this.isFirstLoad) {
            const notificationType = theme === 'upside-down-mode' ? 'upside-down' : 'hawkins';
            this.notification.show(notificationType);
        }
    }

    toggle() {
        // Trigger screen flicker effect
        this.triggerFlicker();

        // Toggle theme after flicker starts
        setTimeout(() => {
            const newTheme = this.currentTheme === 'hawkins-mode' 
                ? 'upside-down-mode' 
                : 'hawkins-mode';
            this.applyTheme(newTheme, true);
        }, 200);
    }

    triggerFlicker() {
        screenFlicker.classList.add('active');
        
        // Play sound effect (optional)
        this.playPortalSound();
        
        setTimeout(() => {
            screenFlicker.classList.remove('active');
        }, 500);
    }

    playPortalSound() {
        // Optional: Add portal sound effect
        // Uncomment below if you have an audio file
        /*
        const audio = new Audio('assets/sounds/portal.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
        */
    }

    // Method to manually show notification (for Easter Egg)
    showSecretNotification() {
        this.notification.show('upside-down');
    }
}

// ═══════════════════════════════════════════════════════════════
// 🌫️ PARTICLE SYSTEM (UPSIDE DOWN SPORES)
// ═══════════════════════════════════════════════════════════════

class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
    }

    generate() {
        this.clear();
        
        for (let i = 0; i < this.maxParticles; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 100);
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.2;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            opacity: ${opacity};
            animation: particleFall ${duration}s linear ${delay}s infinite;
        `;

        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    clear() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }
}

// ═══════════════════════════════════════════════════════════════
// ⌨️ TYPEWRITER EFFECT
// ═══════════════════════════════════════════════════════════════

class TypewriterEffect {
    constructor(element, texts, speed = 100, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.pauseTime = pauseTime;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            // Typing characters
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        // Determine next action
        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2; // Delete faster
        }

        // Check if word is complete
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            // Pause before deleting
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            // Move to next text
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ═══════════════════════════════════════════════════════════════
// 🧭 NAVBAR FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════

class NavbarManager {
    constructor() {
        this.navbar = navbar;
        this.hamburger = hamburger;
        this.navMenu = navMenu;
        this.navLinks = navLinks;
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        body.style.overflow = '';
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// 👁️ SCROLL ANIMATION OBSERVER
// ═══════════════════════════════════════════════════════════════

class ScrollAnimator {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };
        this.init();
    }

    init() {
        // Observe skill items
        this.observeElements(skillItems, this.animateSkillBar);
        
        // Observe timeline items
        this.observeElements(timelineItems, this.animateTimelineItem);
        
        // Observe project cards
        this.observeElements(projectCards, this.animateProjectCard);
        
        // Observe about cards
        this.observeElements(aboutCards, this.animateAboutCard);
    }

    observeElements(elements, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        callback(entry.target);
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        elements.forEach(element => observer.observe(element));
    }

    animateSkillBar(element) {
        element.classList.add('visible');
        const progressBar = element.querySelector('.skill-progress');
        if (progressBar) {
            progressBar.classList.add('animated');
        }
    }

    animateTimelineItem(element) {
        element.classList.add('visible');
    }

    animateProjectCard(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    animateAboutCard(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// 🔗 SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// 📧 CONTACT FORM HANDLER
// ═══════════════════════════════════════════════════════════════

class ContactFormHandler {
    constructor(form) {
        this.form = form;
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success feedback
            this.showNotification('Message sent successfully! 📡', 'success');
            this.form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);

        console.log('Form Data:', data);
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 25px',
            background: type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontWeight: '600',
            animation: 'slideInUp 0.5s ease'
        });

        document.body.appendChild(notification);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutDown 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }
}

// ═══════════════════════════════════════════════════════════════
// 🎭 GLITCH EFFECT ON HOVER
// ═══════════════════════════════════════════════════════════════

class GlitchEffect {
    constructor() {
        this.init();
    }

    init() {
        const glitchElements = document.querySelectorAll('.glitch');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (body.classList.contains('upside-down-mode')) {
                    this.triggerGlitch(element);
                }
            });
        });
    }

    triggerGlitch(element) {
        element.style.animation = 'none';
        void element.offsetWidth; // Trigger reflow
        element.style.animation = 'glitch 0.3s ease';
    }
}

// ═══════════════════════════════════════════════════════════════
// 🖼️ IMAGE GLITCH ON HOVER (Profile Image)
// ═══════════════════════════════════════════════════════════════

class ImageGlitchEffect {
    constructor() {
        this.init();
    }

    init() {
        const imageContainer = document.querySelector('.image-container');
        if (!imageContainer) return;

        imageContainer.addEventListener('mouseenter', () => {
            if (body.classList.contains('upside-down-mode')) {
                this.applyGlitch(imageContainer);
            }
        });

        imageContainer.addEventListener('mouseleave', () => {
            this.removeGlitch(imageContainer);
        });
    }

    applyGlitch(container) {
        const img = container.querySelector('.profile-img');
        if (img) {
            img.style.animation = 'glitch 0.1s infinite';
        }
    }

    removeGlitch(container) {
        const img = container.querySelector('.profile-img');
        if (img) {
            img.style.animation = 'none';
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// 🕷️ EASTER EGG - DEMOGORGON & KONAMI CODE
// ═══════════════════════════════════════════════════════════════

class EasterEgg {
    constructor() {
        this.konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        this.konamiIndex = 0;
        this.init();
    }

    init() {
        // Konami code listener
        document.addEventListener('keydown', (e) => this.checkKonami(e));
        
        // Demogorgon click easter egg
        const demogorgon = document.querySelector('.demogorgon-easter-egg');
        if (demogorgon) {
            demogorgon.addEventListener('click', () => this.showDemogorgonMessage());
        }
    }

    checkKonami(e) {
        if (e.code === this.konamiCode[this.konamiIndex]) {
            this.konamiIndex++;
            
            if (this.konamiIndex === this.konamiCode.length) {
                this.activateSecretMode();
                this.konamiIndex = 0;
            }
        } else {
            this.konamiIndex = 0;
        }
    }

    activateSecretMode() {
        // Switch to Upside Down mode if not already
        if (body.classList.contains('hawkins-mode')) {
            themeManager.toggle();
        }
        
        // Show secret message
        this.showSecretMessage();
        
        // Add extra particles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                particleSystem.createParticle();
            }, i * 50);
        }
    }

    showSecretMessage() {
        const message = document.createElement('div');
        message.className = 'secret-modal';
        message.innerHTML = `
            <div class="secret-modal-content">
                <h2>🔴 SECRET UNLOCKED 🔴</h2>
                <p>You've entered the Upside Down...</p>
                <p class="secret-subtext">The Demogorgon is watching.</p>
                <button class="secret-close-btn">Close Portal</button>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .secret-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                animation: fadeIn 0.3s ease;
            }
            .secret-modal-content {
                background: linear-gradient(145deg, #1a1a2e, #0a0a0a);
                border: 3px solid #ff0000;
                padding: 40px 50px;
                border-radius: 20px;
                text-align: center;
                box-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
                animation: neonPulse 2s ease-in-out infinite;
            }
            .secret-modal-content h2 {
                font-family: 'Alfa Slab One', cursive;
                color: #ff0000;
                font-size: 2rem;
                margin-bottom: 15px;
                text-shadow: 0 0 20px #ff0000;
            }
            .secret-modal-content p {
                color: #fff;
                font-size: 1.1rem;
                margin-bottom: 10px;
            }
            .secret-subtext {
                color: #00f0ff !important;
                font-size: 0.95rem !important;
            }
            .secret-close-btn {
                margin-top: 25px;
                padding: 12px 35px;
                background: linear-gradient(135deg, #ff0000, #8b0000);
                color: white;
                border: none;
                border-radius: 30px;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .secret-close-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(message);

        // Close button
        message.querySelector('.secret-close-btn').addEventListener('click', () => {
            message.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => message.remove(), 300);
        });

        // Click outside to close
        message.addEventListener('click', (e) => {
            if (e.target === message) {
                message.style.animation = 'fadeIn 0.3s ease reverse';
                setTimeout(() => message.remove(), 300);
            }
        });
    }

    showDemogorgonMessage() {
        // Create a themed alert
        const modal = document.createElement('div');
        modal.className = 'demogorgon-modal';
        modal.innerHTML = `
            <div class="demogorgon-modal-content">
                <span class="demogorgon-icon">🕷️</span>
                <p>The Demogorgon says:</p>
                <h3>"RRRAAAAAWWWRRR!"</h3>
                <button class="demogorgon-ok-btn">Run Away!</button>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .demogorgon-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                animation: fadeIn 0.3s ease;
            }
            .demogorgon-modal-content {
                background: linear-gradient(145deg, #2a0a0a, #0a0a0a);
                border: 2px solid #ff0000;
                padding: 35px 45px;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 0 40px rgba(255, 0, 0, 0.4);
            }
            .demogorgon-icon {
                font-size: 4rem;
                display: block;
                margin-bottom: 15px;
                animation: float 2s ease-in-out infinite;
            }
            .demogorgon-modal-content p {
                color: #888;
                font-size: 1rem;
                margin-bottom: 5px;
            }
            .demogorgon-modal-content h3 {
                color: #ff0000;
                font-size: 1.8rem;
                font-family: 'Alfa Slab One', cursive;
                text-shadow: 0 0 15px #ff0000;
                margin-bottom: 20px;
                animation: glitch 0.5s infinite;
            }
            .demogorgon-ok-btn {
                padding: 10px 30px;
                background: linear-gradient(135deg, #8b0000, #ff0000);
                color: white;
                border: none;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .demogorgon-ok-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);

        modal.querySelector('.demogorgon-ok-btn').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// ⚡ SKILL PERCENTAGE COUNTER
// ═══════════════════════════════════════════════════════════════

class SkillCounter {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-percent').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 30);
    }
}

// ═══════════════════════════════════════════════════════════════
// 🌟 PARALLAX EFFECT
// ═══════════════════════════════════════════════════════════════

class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleParallax());
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        
        // Hero section parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }

        // Profile image subtle float
        const profileImg = document.querySelector('.image-container');
        if (profileImg && scrolled < window.innerHeight) {
            profileImg.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// 💡 CHRISTMAS LIGHTS RANDOM BLINK
// ═══════════════════════════════════════════════════════════════

class ChristmasLights {
    constructor() {
        this.lights = document.querySelectorAll('.christmas-lights .light, .footer-lights .light');
        this.init();
    }

    init() {
        this.lights.forEach(light => {
            this.randomizeBlink(light);
        });
    }

    randomizeBlink(light) {
        const randomDuration = (Math.random() * 1 + 0.5).toFixed(2);
        const randomDelay = (Math.random() * 2).toFixed(2);
        light.style.animationDuration = `${randomDuration}s`;
        light.style.animationDelay = `${randomDelay}s`;
    }
}

// ═══════════════════════════════════════════════════════════════
// 🔄 LOADING SCREEN (Optional)
// ═══════════════════════════════════════════════════════════════

class LoadingScreen {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.hideLoader();
        });
    }

    hideLoader() {
        const loader = document.querySelector('.loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// 📱 MOBILE DETECTION
// ═══════════════════════════════════════════════════════════════

class MobileOptimizer {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        if (this.isMobile) {
            this.optimizeForMobile();
        }
    }

    optimizeForMobile() {
        // Reduce particles on mobile
        if (particleSystem) {
            particleSystem.maxParticles = 20;
        }
        
        // Disable heavy animations
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
}

// ═══════════════════════════════════════════════════════════════
// 🚀 INITIALIZE ALL MODULES
// ═══════════════════════════════════════════════════════════════

// Create instances
let themeManager;
let particleSystem;
let typewriter;
let navbarManager;
let scrollAnimator;
let smoothScroll;
let contactFormHandler;
let glitchEffect;
let imageGlitchEffect;
let easterEgg;
let skillCounter;
let parallaxEffect;
let christmasLights;
let mobileOptimizer;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔴 Stranger Things Portfolio Initialized');
    console.log('👻 Try the Konami Code for a surprise!');
    console.log('⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️');
    
    // Initialize Particle System first
    particleSystem = new ParticleSystem(particlesContainer);
    
    // Initialize Theme Manager (includes notifications)
    themeManager = new ThemeManager();
    
    // Initialize Typewriter
    const typewriterTexts = [
        'Web Developer',
        'Digital Dimension Explorer',
        'WordPress Specialist',
        'MERN Stack Learner',
        'Python Enthusiast',
        'UI/UX Explorer'
    ];
    
    if (typewriterElement) {
        typewriter = new TypewriterEffect(typewriterElement, typewriterTexts, 100, 2000);
    }
    
    // Initialize Navbar
    navbarManager = new NavbarManager();
    
    // Initialize Scroll Animations
    scrollAnimator = new ScrollAnimator();
    
    // Initialize Smooth Scroll
    smoothScroll = new SmoothScroll();
    
    // Initialize Contact Form
    contactFormHandler = new ContactFormHandler(contactForm);
    
    // Initialize Glitch Effects
    glitchEffect = new GlitchEffect();
    imageGlitchEffect = new ImageGlitchEffect();
    
    // Initialize Easter Egg
    easterEgg = new EasterEgg();
    
    // Initialize Skill Counter
    skillCounter = new SkillCounter();
    
    // Initialize Parallax
    parallaxEffect = new ParallaxEffect();
    
    // Initialize Christmas Lights
    christmasLights = new ChristmasLights();
    
    // Initialize Mobile Optimizer
    mobileOptimizer = new MobileOptimizer();
});

// ═══════════════════════════════════════════════════════════════
// 🎯 UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// Debounce function for performance
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Random number generator
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// ═══════════════════════════════════════════════════════════════
// 📊 CONSOLE BRANDING
// ═══════════════════════════════════════════════════════════════

console.log(`
%c
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🔴 STRANGER THINGS PORTFOLIO 🔴                        ║
║                                                          ║
║   Developer: Anand Prakash Shukla                        ║
║   Location: Kanpur, India                                ║
║                                                          ║
║   "Crafted in the Upside Down"                          ║
║                                                          ║
║   🎮 Easter Egg: Try the Konami Code!                   ║
║   ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️                                    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`, 'color: #ff0000; font-family: monospace; font-size: 12px;');

// ═══════════════════════════════════════════════════════════════
// 🎬 END OF SCRIPT
// ═══════════════════════════════════════════════════════════════