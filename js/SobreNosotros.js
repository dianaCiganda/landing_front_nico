// ===== MENÚ MÓVIL =====
document.addEventListener('DOMContentLoaded', function() {
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

    // ===== FUNCIÓN PARA CREAR CARRUSEL =====
    function createCarousel(slidesId, prevId, nextId, dotsId) {
        const slides = document.getElementById(slidesId);
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);
        const dotsContainer = document.getElementById(dotsId);
        
        if (!slides) return;
        
        const slideItems = slides.querySelectorAll('.carousel-gallery-slide');
        const totalSlides = slideItems.length;
        let currentIndex = 0;
        let autoPlayInterval;

        // Crear dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.className = 'carousel-gallery-dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.dataset.index));
                    resetAutoPlay();
                });
                dotsContainer.appendChild(dot);
            }
        }

        const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-gallery-dot') : [];

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 3500);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        function resetAutoPlay() {
            startAutoPlay();
        }

        // Event listeners para botones
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetAutoPlay();
            });
        }

        // Pausar al hacer hover
        const container = slides.closest('.carousel-gallery-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
        }

        // Touch support para móviles
        let touchStartX = 0;
        let touchEndX = 0;

        if (container) {
            container.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            container.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    resetAutoPlay();
                }
            }, { passive: true });
        }

        // Iniciar autoplay
        startAutoPlay();

        // Retornar funciones para control externo si es necesario
        return {
            goToSlide,
            nextSlide,
            prevSlide,
            startAutoPlay,
            stopAutoPlay
        };
    }

    // ===== INICIALIZAR CARRUSELES =====
    // Carrusel 1 - Trabajos de Agustina
    createCarousel('carouselAgus', 'prevAgus', 'nextAgus', 'dotsAgus');

    // Carrusel 2 - Trabajos de Nicolás
    createCarousel('carouselNico', 'prevNico', 'nextNico', 'dotsNico');

    // Carrusel 3 - Nuestros Mejores Momentos
    createCarousel('carouselMejores', 'prevMejores', 'nextMejores', 'dotsMejores');

});