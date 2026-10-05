document.addEventListener('DOMContentLoaded', () => {
    // Generador de Campo de Estrellas
    const starField = document.getElementById('starField');
    const starCount = 150;

    if (starField) {
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Posición aleatoria
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Tamaño aleatorio (entre 1px y 3px)
            const size = Math.random() * 2 + 1;
            
            // Duración de parpadeo aleatoria
            const duration = Math.random() * 3 + 2;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--duration', `${duration}s`);
            
            starField.appendChild(star);
        }
    }

    // Smooth Scroll para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset por navbar fija
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto simple de aparición al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar estado inicial y observar elementos clave
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .split-layout');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});