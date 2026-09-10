// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 2200);
});

document.body.style.overflow = 'hidden';

// ==================== ROTATING TEXT ====================
const roles = ['Frontend Developer', 'AI Developer', 'Problem Solver', 'React.js Developer', 'UI/UX Enthusiast'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeRole() {
    const el = document.getElementById('rotatingText');
    if (!el) return;
    const current = roles[roleIndex];

    if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }

    setTimeout(typeRole, speed);
}
setTimeout(typeRole, 2500);

// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    header.classList.toggle('scrolled', cur > 50);
    if (cur > lastScroll && cur > 100) header.style.transform = 'translateY(-100%)';
    else header.style.transform = 'translateY(0)';
    lastScroll = cur;
});

// ==================== ACTIVE NAV ====================
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const sections = document.querySelectorAll('section');

function updateNav() {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
    navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('data-section') === current) l.classList.add('active');
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
});

document.querySelectorAll('.mobile-nav-link').forEach(l => {
    l.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) {
            const top = t.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ==================== COUNTER ANIMATION ====================
function initCounters() {
    document.querySelectorAll('[data-count]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let done = false;
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !done) {
                done = true;
                const start = performance.now();
                function update(now) {
                    const progress = Math.min((now - start) / 2000, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(target * eased);
                    if (progress < 1) requestAnimationFrame(update);
                    else counter.textContent = target;
                }
                requestAnimationFrame(update);
                obs.disconnect();
            }
        }, { threshold: 0.5 });
        obs.observe(counter);
    });
}
initCounters();

// ==================== MAGNETIC BUTTONS ====================
document.querySelectorAll('.btn-primary, .btn-secondary, .header-cv').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ==================== WORK CARD TILT ====================
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        this.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });
});

// ==================== SKILL TAG HOVER ====================
document.querySelectorAll('.skill-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px) scale(1.05)'; });
    tag.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
});

// ==================== CURSOR FOLLOWER ====================
if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let cx = 0, cy = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; });

    function animateCursor() {
        fx += (cx - fx) * 0.08;
        fy += (cy - fy) * 0.08;
        cursor.style.transform = `translate(-50%, -50%) translate(${fx - cx}px, ${fy - cy}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .work-card, .skill-tags span, .contact-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ==================== PARTICLES ====================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
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

    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function connect() {
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
        particles.forEach(p => { p.update(); p.draw(); });
        connect();
        requestAnimationFrame(animate);
    }
    animate();
}
setTimeout(initParticles, 500);

// ==================== KEYBOARD NAV ====================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

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

// ==================== SCROLL REVEAL SECTIONS ====================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section').forEach(s => sectionObserver.observe(s));

// Footer reveal
const footer = document.querySelector('.footer');
if (footer) {
    const footerObs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            footer.classList.add('visible');
            footerObs.disconnect();
        }
    }, { threshold: 0.1 });
    footerObs.observe(footer);
}

// ==================== LOGO CLICK ====================
document.getElementById('logo').addEventListener('click', (e) => {
    e.preventDefault();
    const mark = document.querySelector('.logo-mark');
    mark.style.animation = 'none';
    mark.offsetHeight;
    mark.style.animation = 'logoClick 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
});

// ==================== WORK CARD GLOW ====================
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty('--mouse-x', x + '%');
        this.style.setProperty('--mouse-y', y + '%');
    });
});
