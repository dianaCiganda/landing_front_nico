// ============================================
// CARRUSEL
// ============================================

let slideIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    
    slides.forEach((slide, i) => {
        slide.style.transform = 'translateX(' + (-slideIndex * 100) + '%)';
    });
    
    dots.forEach((dot, i) => {
        if (i === slideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// ============================================
// VER GALERIA
// ============================================

function verGaleria() {
    Swal.fire({
        title: 'Galeria de Trabajos',
        html: `
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:12px;">
                <img src="./assets/producciones/aa.jpeg" style="width:100%; height:120px; object-fit:cover; border-radius:12px;">
                <img src="./assets/tres.jpeg" style="width:100%; height:120px; object-fit:cover; border-radius:12px;">
                <img src="./assets/diez.jpeg" style="width:100%; height:120px; object-fit:cover; border-radius:12px;">
            </div>
            <p style="margin-top:16px; font-size:14px; color:#6b7280;">
                Descubri mas de nuestro trabajo en Instagram
            </p>
        `,
        confirmButtonText: 'Ver Instagram',
        confirmButtonColor: '#3d2c1a',
        showCancelButton: true,
        cancelButtonText: 'Cerrar'
    }).then(function(result) {
        if (result.isConfirmed) {
            window.open('https://instagram.com', '_blank');
        }
    });
}

// ============================================
// EVENTOS E INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Carrusel
    showSlide(0);
    startAutoSlide();

    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var dots = document.querySelectorAll('.carousel-dot');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoSlide();
        });
    }

    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            slideIndex = index;
            showSlide(slideIndex);
            resetAutoSlide();
        });
    });

    var carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        carousel.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }

    // Boton Ver Galeria
    var btnGaleria = document.getElementById('btnVerGaleria');
    if (btnGaleria) {
        btnGaleria.addEventListener('click', verGaleria);
    }

    // Menu mobile toggle
    var menuToggle = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    console.log('✅ Página inicializada correctamente');
});