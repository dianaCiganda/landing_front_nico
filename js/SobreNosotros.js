// ===== ANIMACIONES PARA SOBRE NOSOTROS =====
document.addEventListener('DOMContentLoaded', function() {

    // ===== MENÚ MÓVIL =====
    const toggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('#mobile-menu a, #mobile-menu button').forEach(element => {
            element.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ===== ANIMACIÓN DE CARDS AL HACER SCROLL =====
    const photoCards = document.querySelectorAll('.photo-card');
    
    // Observador de intersección para animar al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Configurar estado inicial de las cards
    photoCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ===== EFECTO 3D EN LAS CARDS AL MOVER EL MOUSE =====
    photoCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

});