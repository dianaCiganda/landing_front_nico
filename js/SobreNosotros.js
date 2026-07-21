        // ============================================================
        // MENÚ RESPONSIVE
        // ============================================================
        
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuToggle && mobileMenu) {
            mobileMenu.style.display = 'none';

            menuToggle.addEventListener('click', () => {
                const isOpen = mobileMenu.style.display === 'block';
                mobileMenu.style.display = isOpen ? 'none' : 'block';
            });

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.style.display = 'none';
                });
            });
        }

        // ============================================================
        // CARRUSEL DE AGUS
        // ============================================================
        
        function initCarousel(slidesId, prevId, nextId, dotsId) {
            const slides = document.querySelectorAll(`#${slidesId} .carousel-gallery-slide`);
            const prevBtn = document.getElementById(prevId);
            const nextBtn = document.getElementById(nextId);
            const dotsContainer = document.getElementById(dotsId);
            let currentIndex = 0;

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                updateDots(index);
            }

            function updateDots(index) {
                const dots = dotsContainer.querySelectorAll('.carousel-gallery-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }

            function createDots() {
                dotsContainer.innerHTML = '';
                slides.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.className = 'carousel-gallery-dot' + (i === 0 ? ' active' : '');
                    dot.addEventListener('click', () => {
                        currentIndex = i;
                        showSlide(currentIndex);
                    });
                    dotsContainer.appendChild(dot);
                });
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            }

            if (slides.length > 0) {
                createDots();
                showSlide(0);

                if (prevBtn) prevBtn.addEventListener('click', prevSlide);
                if (nextBtn) nextBtn.addEventListener('click', nextSlide);

                let interval = setInterval(nextSlide, 5000);

                const container = document.getElementById(slidesId).closest('.carousel-gallery-container');
                if (container) {
                    container.addEventListener('mouseenter', () => clearInterval(interval));
                    container.addEventListener('mouseleave', () => {
                        interval = setInterval(nextSlide, 5000);
                    });
                }
            }
        }

        initCarousel('carouselAgus', 'prevAgus', 'nextAgus', 'dotsAgus');
        initCarousel('carouselNico', 'prevNico', 'nextNico', 'dotsNico');
    