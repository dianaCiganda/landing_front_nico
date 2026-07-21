// ============================================================
// MENÚ RESPONSIVE
// ============================================================

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Ocultar el menú por defecto
mobileMenu.style.display = 'none';

menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
});

// Cerrar menú al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// ============================================================
// 25 FOTOS
// ============================================================

const photos = [];

const rutasFotos = [
    '../assets/inicio/inicio-2.PNG',
    '../assets/inicio/inicio-3.PNG',
    '../assets/inicio/inicio.png',
    '../assets/catorce.jpeg',
    '../assets/agus-maquillaje/4.jpg',
    '../assets/cinco.jpeg',
    '../assets/cuatro.jpeg',
    '../assets/dieciseis.jpeg',
    '../assets/diecisiete.jpeg',
    '../assets/agus-maquillaje/5.jpeg',
    '../assets/agus-maquillaje/agus-1.png',
    '../assets/diez.jpeg',
    '../assets/dos.jpeg',
    '../assets/foto-inicio.webp',
    '../assets/loreal.jpeg',
    '../assets/loreal1.jpeg',
    '../assets/mexico.jpeg',
    '../assets/nueve.jpeg',
    '../assets/ocho.jpeg',
    '../assets/quince.jpeg',
    '../assets/seis.jpeg',
    '../assets/siete.jpeg',
    '../assets/trece.jpeg',
    '../assets/tres.jpeg',
    '../assets/uno.jpeg',

];

rutasFotos.forEach((ruta, index) => {
    photos.push({
        id: index + 1,
        img: ruta
    });
});

console.log('Total de fotos:', photos.length);

// ============================================================
// RENDERIZADO DE LA GALERÍA
// ============================================================

const grid = document.getElementById('galeriaGrid');

function renderGallery(photosToShow) {
    grid.innerHTML = '';

    if (photosToShow.length === 0) {
        grid.innerHTML = `
                    <div class="no-fotos">
                        <i class="fas fa-images"></i>
                        No hay fotos para mostrar
                    </div>
                `;
        return;
    }

    photosToShow.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.dataset.index = index;

        const img = document.createElement('img');
        img.src = photo.img;
        img.alt = `Foto ${photo.id}`;
        img.loading = 'lazy';

        img.onerror = function () {
            console.error(`Error cargando: ${photo.img}`);
            this.style.display = 'none';
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 200px;
                        background: #f5f0eb;
                        color: #999;
                        font-size: 0.8rem;
                        padding: 1rem;
                        text-align: center;
                        border-radius: 1rem;
                    `;
            const fileName = photo.img.split('/').pop();
            errorDiv.innerHTML = `
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🖼️</div>
                        <div style="font-weight: bold;">Foto ${photo.id}</div>
                        <div style="font-size: 0.7rem; color: #ccc; word-break: break-all; margin-top: 0.3rem;">${fileName}</div>
                    `;
            this.parentElement.appendChild(errorDiv);
        };

        item.appendChild(img);
        item.addEventListener('click', () => openLightbox(index));
        grid.appendChild(item);
    });
}

// ============================================================
// LIGHTBOX
// ============================================================

let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('lightboxPrev');
const nextBtn = document.getElementById('lightboxNext');

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const photo = photos[currentIndex];
    lightboxImg.src = photo.img;
    lightboxImg.alt = `Foto ${photo.id}`;
    lightboxCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
}

function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateLightbox();
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    updateLightbox();
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevPhoto);
nextBtn.addEventListener('click', nextPhoto);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// ============================================================
// INICIALIZAR
// ============================================================

renderGallery(photos);