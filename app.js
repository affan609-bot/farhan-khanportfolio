// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';

        // Stagger reveal hero elements
        const heroReveals = document.querySelectorAll('.hero [data-reveal]');
        heroReveals.forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 150);
        });

        // Init other animations
        setTimeout(() => {
            initScrollReveal();
            initCounters();
            initParallax();
            initLogoAnimation();
            initSmoothHover();
            initCardGlow();
        }, 300);
    }, 2200);
});

document.body.style.overflow = 'hidden';

// ==================== SMOOTH HOVER EFFECTS ====================
function initSmoothHover() {
    // Magnetic buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .header-cv').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // Work card tilt
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            this.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;

            // Update glow position
            const glowX = ((e.clientX - rect.left) / rect.width) * 100;
            const glowY = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.setProperty('--mouse-x', `${glowX}%`);
            this.style.setProperty('--mouse-y', `${glowY}%`);
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
        });
    });

    // Skill tags
    document.querySelectorAll('.skill-tags span').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact cards
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-card-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-card-icon');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
    });
}

// ==================== CARD GLOW EFFECT ====================
function initCardGlow() {
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.setProperty('--mouse-x', `${x}%`);
            this.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

// ==================== ROTATING TEXT ANIMATION ====================
const roles = [
    'Frontend Developer',
    'AI Developer',
    'Problem Solver',
    'React.js Developer',
    'UI/UX Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    const rotatingText = document.getElementById('rotatingText');

    if (!rotatingText) return;

    if (isDeleting) {
        rotatingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        rotatingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing animation
setTimeout(typeRole, 2500);

// ==================== PARTICLE CANVAS ====================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '196, 169, 106' : '107, 143, 94';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.x -= dx * force * 0.01;
                this.y -= dy * force * 0.01;
            }

            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(196, 169, 106, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

// Init particles on load
window.addEventListener('load', () => {
    setTimeout(initParticles, 500);
});

// ==================== LOGO CLICK ANIMATION ====================
function initLogoAnimation() {
    const logo = document.getElementById('logo');
    const logoMark = logo.querySelector('.logo-mark');

    logo.addEventListener('click', (e) => {
        e.preventDefault();

        // Add click animation class
        logoMark.style.animation = 'none';
        logoMark.offsetHeight; // Trigger reflow
        logoMark.style.animation = 'logoClick 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'logo-ripple';
        logo.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // Smooth scroll to top with delay
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

        // Add page flash effect
        const flash = document.createElement('div');
        flash.className = 'page-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.classList.add('active'), 10);
        setTimeout(() => {
            flash.classList.remove('active');
            setTimeout(() => flash.remove(), 500);
        }, 200);
    });

    // Magnetic effect on logo
    logo.addEventListener('mousemove', (e) => {
        const rect = logo.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        logoMark.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    logo.addEventListener('mouseleave', () => {
        logoMark.style.transform = 'translate(0, 0)';
        logoMark.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    });
}

// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('scrolled', currentScroll > 50);

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// ==================== ACTIVE NAV ====================
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const sections = document.querySelectorAll('section');

function updateNav() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateNav);

// ==================== MOBILE MENU ====================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    if (mobileMenu.classList.contains('active')) {
        const links = mobileMenu.querySelectorAll('.mobile-nav-link');
        links.forEach((link, i) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(30px)';
            setTimeout(() => {
                link.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 + i * 80);
        });
    }
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateValue(counter, 0, target, 2000);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

function animateValue(el, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + range * eased);
        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end;
        }
    }
    requestAnimationFrame(update);
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (hero && scrolled < window.innerHeight) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }
    });
}

// ==================== MAGNETIC BUTTONS ====================
document.querySelectorAll('.btn-primary, .header-cv').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        this.style.transition = 'transform 0.1s ease';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
        this.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    });
});

// ==================== WORK CARD TILT ====================
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        this.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px) scale(1.02)`;
        this.style.transition = 'transform 0.1s ease';

        const img = this.querySelector('.work-card-img img');
        if (img) {
            img.style.transform = `scale(1.08) translate(${x * 10}px, ${y * 10}px)`;
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0) scale(1)';
        this.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';

        const img = this.querySelector('.work-card-img img');
        if (img) {
            img.style.transform = 'scale(1)';
            img.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        }
    });
});

// ==================== SKILL TAG HOVER ====================
document.querySelectorAll('.skill-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== CONTACT CARD HOVER ====================
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-card-icon');
        if (icon) {
            icon.style.transform = 'rotate(10deg) scale(1.1)';
            icon.style.background = 'rgba(196, 169, 106, 0.2)';
        }
    });
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-card-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
            icon.style.background = 'rgba(196, 169, 106, 0.1)';
        }
    });
});

// ==================== TEXT SCRAMBLE EFFECT ====================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

// Apply scramble to hero title on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, i) => {
            const text = line.textContent;
            const scrambler = new TextScramble(line);
            setTimeout(() => {
                scrambler.setText(text);
            }, i * 200);
        });
    }, 2400);
});

// ==================== CURSOR FOLLOWER ====================
const cursor = document.createElement('div');
cursor.className = 'cursor-follower';
document.body.appendChild(cursor);

let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
});

function animateCursor() {
    followerX += (cursorX - followerX) * 0.08;
    followerY += (cursorY - followerY) * 0.08;
    cursor.style.transform = `translate(-50%, -50%) translate(${followerX - cursorX}px, ${followerY - cursorY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverElements = document.querySelectorAll('a, button, .work-card, .skill-tags span, .contact-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ==================== TILT EFFECT FOR ALL CARDS ====================
function addTiltEffect(selector) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            this.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });
}

addTiltEffect('.skill-group');
addTiltEffect('.stat');
addTiltEffect('.cert-item');

// ==================== SECTION TITLE ANIMATION ====================
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title = entry.target;
            const text = title.textContent;
            title.style.opacity = '1';

            // Animate each letter
            title.innerHTML = '';
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.03}s`;
                title.appendChild(span);

                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 50);
            });

            titleObserver.unobserve(title);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// ==================== SMOOTH CURSOR TRAIL ====================
const trail = [];
const trailLength = 8;

for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.opacity = (1 - i / trailLength) * 0.5;
    dot.style.transform = `scale(${1 - i / trailLength})`;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
}

let trailCursorX = 0, trailCursorY = 0;

document.addEventListener('mousemove', (e) => {
    trailCursorX = e.clientX;
    trailCursorY = e.clientY;
});

function animateTrail() {
    let x = trailCursorX;
    let y = trailCursorY;

    trail.forEach((dot, i) => {
        const nextDot = trail[i + 1] || trail[0];

        dot.x = x;
        dot.y = y;
        dot.el.style.left = dot.x + 'px';
        dot.el.style.top = dot.y + 'px';

        x += (nextDot.x - dot.x) * 0.35;
        y += (nextDot.y - dot.y) * 0.35;
    });

    requestAnimationFrame(animateTrail);
}
animateTrail();

// ==================== KEYBOARD NAV ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ==================== SMOOTH SECTION TRANSITIONS ====================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));

// ==================== NAV LINK CLICK RIPPLE ====================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'nav-ripple';
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== INIT ====================
console.log('%c[Farhan Khan] Portfolio loaded ✨', 'color:#c4a96a; font-weight:bold; font-size:12px');
