// ============================================
// HERO SECTION - EFEITOS INTERATIVOS
// ============================================

// Efeito de movimento do mouse no e-book 3D
document.addEventListener('mousemove', (e) => {
    const visual = document.querySelector('.hero__visual');
    if (!visual) return;

    const rect = visual.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateX = ((mouseY - centerY) / centerY) * 15;
    const rotateY = ((mouseX - centerX) / centerX) * -15;

    const wrapper = document.querySelector('.hero__ebook-wrapper');
    if (wrapper) {
        wrapper.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(50px)
        `;
    }
});

// Reset ao sair da área
document.addEventListener('mouseleave', () => {
    const wrapper = document.querySelector('.hero__ebook-wrapper');
    if (wrapper) {
        wrapper.style.transform = '';
    }
});

// Efeito de scroll parallax
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.hero__orb');
    
    orbs.forEach((orb, index) => {
        orb.style.transform = `translateY(${scrollY * (0.3 + index * 0.1)}px)`;
    });
});

// Animação do botão CTA
const ctaButton = document.querySelector('.hero__button--primary');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Adicionar efeito de ripple
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = ctaButton.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (ctaButton.clientWidth - size) / 2 + 'px';
        ripple.style.top = (ctaButton.clientHeight - size) / 2 + 'px';
        
        ctaButton.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Adicionar animação de ripple ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Observador de Interseção para animações ao aparecer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.hero__content, .hero__visual').forEach(el => {
    observer.observe(el);
});

// ============================================
// PROBLEM SECTION - EFEITOS INTERATIVOS
// ============================================

// Efeito hover nas cards de problemas com glow
document.querySelectorAll('.problem__card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Contador animado para stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Trigger das animações de stats ao scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            const statNumbers = entry.target.querySelectorAll('.problem__stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const numericValue = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                
                if (numericValue > 0) {
                    animateCounter(stat, numericValue, 1500);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.problem__stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efeito parallax na section de problemas
window.addEventListener('scroll', () => {
    const problemSection = document.querySelector('.problem');
    if (!problemSection) return;

    const rect = problemSection.getBoundingClientRect();
    const scrollProgress = 1 - (rect.top / window.innerHeight);
    
    if (scrollProgress >= 0 && scrollProgress <= 1) {
        const orb = document.querySelector('.problem__orb--1');
        if (orb) {
            orb.style.transform = `translateY(${scrollProgress * 50}px)`;
        }
    }
});

// Efeito de hover nos benefícios
document.querySelectorAll('.hero__benefit').forEach(benefit => {
    benefit.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    benefit.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Efeito de hover no social proof
const socialProof = document.querySelector('.hero__social-proof');
if (socialProof) {
    socialProof.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.2)';
    });
    
    socialProof.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ripple effect em todos os botões CTA
document.querySelectorAll('.problem__button, .hero__button--primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// SOLUTION SECTION - EFEITOS INTERATIVOS
// ============================================

// Efeito hover nas cards de soluções
document.querySelectorAll('.solution__card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Animação de contadores na seção de comparação
function animateSolutionCounter(element, target, duration = 2000) {
    const currentText = element.textContent;
    const startValue = parseInt(currentText.replace(/[^0-9]/g, '')) || 0;
    const targetValue = target;
    let current = startValue;
    
    const increment = (targetValue - startValue) / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        
        // Manter o formato original (com %)
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('h')) {
            element.textContent = Math.floor(current / 60) + 'h ' + Math.floor(current % 60) + 'min';
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Trigger das animações de comparação ao scroll
const comparisonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            // Animar valores da coluna "depois"
            const afterValues = entry.target.querySelectorAll('.solution__comparison-header--after + .solution__comparison-item .solution__comparison-value');
            afterValues.forEach((value, index) => {
                const text = value.textContent;
                let targetValue = 0;
                
                if (text.includes('+')) {
                    targetValue = parseInt(text.replace(/[^0-9]/g, ''));
                    setTimeout(() => {
                        animateSolutionCounter(value, targetValue, 1500);
                    }, index * 100);
                }
            });
        }
    });
}, { threshold: 0.5 });

const comparisonSection = document.querySelector('.solution__comparison');
if (comparisonSection) {
    comparisonObserver.observe(comparisonSection);
}

// Efeito parallax na section de soluções
window.addEventListener('scroll', () => {
    const solutionSection = document.querySelector('.solution');
    if (!solutionSection) return;

    const rect = solutionSection.getBoundingClientRect();
    const scrollProgress = 1 - (rect.top / window.innerHeight);
    
    if (scrollProgress >= 0 && scrollProgress <= 1) {
        const orb = document.querySelector('.solution__orb--1');
        if (orb) {
            orb.style.transform = `translateY(${scrollProgress * 50}px)`;
        }
    }
});

// Ripple effect no botão da solução
document.querySelectorAll('.solution__button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// RECEIVE SECTION - EFEITOS INTERATIVOS
// ============================================

// Efeito hover nas items de receive
document.querySelectorAll('.receive__item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Efeito hover na seção de bônus
const bonusSection = document.querySelector('.receive__bonus');
if (bonusSection) {
    bonusSection.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(212, 175, 55, 0.15)';
        this.style.transform = 'scale(1.01)';
    });
    
    bonusSection.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
        this.style.transform = 'scale(1)';
    });
}

// Efeito parallax na section de receive
window.addEventListener('scroll', () => {
    const receiveSection = document.querySelector('.receive');
    if (!receiveSection) return;

    const rect = receiveSection.getBoundingClientRect();
    const scrollProgress = 1 - (rect.top / window.innerHeight);
    
    if (scrollProgress >= 0 && scrollProgress <= 1) {
        const orb = document.querySelector('.receive__orb--1');
        if (orb) {
            orb.style.transform = `translateY(${scrollProgress * -50}px)`;
        }
    }
});

// Ripple effect no botão da seção receive
const receiveButton = document.querySelector('.receive__button');
if (receiveButton) {
    receiveButton.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// Contador regressivo visual para bônus (efeito entrance)
const bonusItems = document.querySelectorAll('.receive__bonus-item');
const bonusObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            entry.target.style.animation = `slideInLeft 0.6s ease-out ${index * 0.1}s backwards`;
        }
    });
}, { threshold: 0.5 });

bonusItems.forEach(item => bonusObserver.observe(item));

console.log('✨ Landing Page carregada com sucesso!');
document.querySelectorAll('.faq_question').forEach(button => {

    button.addEventListener('click', () => {

        const item = button.parentElement;

        item.classList.toggle('active');

    });

});