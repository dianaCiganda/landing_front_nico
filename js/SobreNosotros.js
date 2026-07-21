// ============================================================
// SOBRE NOSOTROS - Carruseles con fade (display:none/block)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ===== MENÚ MÓVIL =====
    var toggleBtn = document.getElementById("menu-toggle");
    var mobileMenu = document.getElementById("mobile-menu");

    if (toggleBtn && mobileMenu) {

        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            mobileMenu.classList.toggle("active");
        });

        var menuLinks = mobileMenu.querySelectorAll("a, button");

        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener("click", function () {
                mobileMenu.classList.remove("active");
            });
        }
    }

    // ==========================================================
    // CARRUSEL CON FADE (display:none/block)
    // ==========================================================

    function createCarousel(slidesId, prevId, nextId, dotsId) {

        var slidesContainer = document.getElementById(slidesId);
        var prevBtn = document.getElementById(prevId);
        var nextBtn = document.getElementById(nextId);
        var dotsContainer = document.getElementById(dotsId);

        if (!slidesContainer) {
            console.warn('❌ Carrusel no encontrado:', slidesId);
            return;
        }

        var slideItems = slidesContainer.querySelectorAll(".carousel-gallery-slide");
        var totalSlides = slideItems.length;

        if (totalSlides === 0) {
            console.warn('❌ No hay slides en:', slidesId);
            return;
        }

        var currentIndex = 0;
        var autoPlayInterval = null;
        var isTransitioning = false;

        // =============================
        // CREAR DOTS
        // =============================

        if (dotsContainer) {
            dotsContainer.innerHTML = "";

            for (var i = 0; i < totalSlides; i++) {
                var dot = document.createElement("span");
                dot.className = "carousel-gallery-dot" + (i === 0 ? " active" : "");
                dot.dataset.index = i;

                (function (index) {
                    dot.addEventListener("click", function () {
                        if (!isTransitioning) {
                            goToSlide(index);
                            resetAutoPlay();
                        }
                    });
                })(i);

                dotsContainer.appendChild(dot);
            }
        }

        var dots = dotsContainer 
            ? dotsContainer.querySelectorAll(".carousel-gallery-dot") 
            : [];

        // =============================
        // IR A SLIDE
        // =============================

        function goToSlide(index) {

            if (isTransitioning) return;

            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }

            if (index === currentIndex) return;

            isTransitioning = true;
            currentIndex = index;

            // Ocultar todos los slides
            for (var i = 0; i < slideItems.length; i++) {
                slideItems[i].classList.remove("active");
            }

            // Mostrar el slide actual
            slideItems[currentIndex].classList.add("active");

            // Actualizar dots
            for (var j = 0; j < dots.length; j++) {
                dots[j].classList.toggle("active", j === currentIndex);
            }

            // Permitir transiciones después de la animación
            setTimeout(function () {
                isTransitioning = false;
            }, 400);
        }

        function nextSlide() {
            if (!isTransitioning) {
                goToSlide(currentIndex + 1);
            }
        }

        function prevSlide() {
            if (!isTransitioning) {
                goToSlide(currentIndex - 1);
            }
        }

        // =============================
        // AUTOPLAY
        // =============================

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 4000);
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

        // =============================
        // BOTONES
        // =============================

        if (prevBtn) {
            prevBtn.addEventListener("click", function (e) {
                e.preventDefault();
                prevSlide();
                resetAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", function (e) {
                e.preventDefault();
                nextSlide();
                resetAutoPlay();
            });
        }

        // =============================
        // HOVER - Pausar autoplay
        // =============================

        var container = slidesContainer.closest(".carousel-gallery-container");

        if (container) {
            container.addEventListener("mouseenter", stopAutoPlay);
            container.addEventListener("mouseleave", startAutoPlay);
        }

        // =============================
        // TOUCH - Swipe
        // =============================

        var touchStartX = 0;
        var touchEndX = 0;

        if (container) {
            container.addEventListener("touchstart", function (e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            container.addEventListener("touchend", function (e) {
                touchEndX = e.changedTouches[0].screenX;
                var diff = touchStartX - touchEndX;

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

        // =============================
        // INICIAR
        // =============================

        // Asegurar que solo el primer slide esté visible
        for (var k = 0; k < slideItems.length; k++) {
            slideItems[k].classList.toggle("active", k === 0);
        }

        // Actualizar dots
        for (var l = 0; l < dots.length; l++) {
            dots[l].classList.toggle("active", l === 0);
        }

        // Iniciar autoplay
        startAutoPlay();

        console.log('✅ Carrusel iniciado:', slidesId, 'con', totalSlides, 'slides');

        // Retornar funciones para debug
        return {
            goToSlide: goToSlide,
            next: nextSlide,
            prev: prevSlide,
            destroy: stopAutoPlay
        };
    }

    // ==========================================================
    // INICIALIZAR CARRUSELES
    // ==========================================================

    console.log('🚀 Inicializando carruseles...');

    var carrusel1 = createCarousel("carouselAgus", "prevAgus", "nextAgus", "dotsAgus");
    var carrusel2 = createCarousel("carouselNico", "prevNico", "nextNico", "dotsNico");
    var carrusel3 = createCarousel("carouselMejores", "prevMejores", "nextMejores", "dotsMejores");

    console.log('✅ Sobre Nosotros - Listo');

});