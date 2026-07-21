// ============================================================
// PREGUNTAS FRECUENTES - DATOS Y FUNCIONALIDAD
// ============================================================

// ===== DATOS DE PREGUNTAS =====
const faqData = [
    // Servicios
    {
        id: 1,
        category: 'servicios',
        question: '¿Qué servicios ofrecen?',
        answer: 'Ofrecemos servicios de maquillaje y peinado profesional para todo tipo de eventos: bodas, quinceañeras, eventos sociales, sesiones de fotos y producciones. Trabajamos tanto a domicilio como en nuestro estudio.'
    },
    {
        id: 2,
        category: 'servicios',
        question: '¿Realizan pruebas de maquillaje y peinado?',
        answer: 'Sí, ofrecemos pruebas previas para que puedas ver y sentir el look antes del día del evento. Esto nos permite ajustar cada detalle a tus gustos y necesidades. La prueba se agenda con anticipación y tiene un costo que luego se descuenta del servicio final.'
    },
    {
        id: 3,
        category: 'servicios',
        question: '¿Se desplazan a domicilio?',
        answer: 'Sí, nos desplazamos a tu domicilio o al lugar del evento. Trabajamos en Coronel Pringles y toda la zona, incluyendo localidades cercanas. Consultanos por disponibilidad.'
    },
    // Reservas
    {
        id: 4,
        category: 'reservas',
        question: '¿Cómo puedo reservar un turno?',
        answer: 'Podés reservar tu turno a través de nuestra página web en la sección "Reservar Cita". Te recomendamos hacerlo con anticipación para asegurar disponibilidad en la fecha que necesitas.'
    },
    {
        id: 5,
        category: 'reservas',
        question: '¿Con cuánta anticipación debo reservar?',
        answer: 'Recomendamos reservar con al menos 15 a 30 días de anticipación, especialmente para eventos como bodas o quinceañeras. En temporada alta (primavera-verano), sugerimos hacerlo con 2 meses de anticipación.'
    },
    // Precios
    {
        id: 8,
        category: 'precios',
        question: '¿Aceptan medios de pago?',
        answer: 'Aceptamos efectivo, transferencia bancaria y todos los medios de pago electrónicos. También trabajamos con Mercado Pago. Consultanos por las opciones disponibles y financiación.'
    },
];

// ============================================================
// RENDERIZADO DE PREGUNTAS
// ============================================================

const faqContainer = document.getElementById('faqContainer');
let activeCategory = 'all';

function renderFaqs(category = 'all') {
    activeCategory = category;
    faqContainer.innerHTML = '';

    const filtered = category === 'all' 
        ? faqData 
        : faqData.filter(item => item.category === category);

    if (filtered.length === 0) {
        faqContainer.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-search" style="font-size: 3rem; color: #c4a882;"></i>
                <p class="text-dark-brown/60 mt-4">No hay preguntas en esta categoría</p>
            </div>
        `;
        return;
    }

    filtered.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.dataset.category = item.category;

        const badgeMap = {
            servicios: 'Servicios',
            reservas: 'Reservas',
            precios: 'Precios'
        };

        faqItem.innerHTML = `
            <button class="faq-question" onclick="toggleFaq(this)">
                <span class="faq-title">
                    <span class="faq-badge ${item.category}">${badgeMap[item.category] || item.category}</span>
                    ${item.question}
                </span>
                <span class="faq-icon"><i class="fas fa-chevron-down"></i></span>
            </button>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;

        faqContainer.appendChild(faqItem);
    });
}

// ============================================================
// FUNCIÓN TOGGLE ACORDEÓN
// ============================================================

function toggleFaq(button) {
    const item = button.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Cerrar todos los items
    document.querySelectorAll('.faq-item.active').forEach(el => {
        el.classList.remove('active');
    });

    // Abrir el actual si no estaba activo
    if (!isActive) {
        item.classList.add('active');
    }
}

// ============================================================
// FILTROS POR CATEGORÍA
// ============================================================

document.querySelectorAll('.faq-category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Actualizar botón activo
        document.querySelectorAll('.faq-category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const category = this.dataset.category;
        renderFaqs(category);
    });
});

// ============================================================
// MENÚ RESPONSIVE - CORREGIDO
// ============================================================

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    // Asegurar que el menú comienza cerrado
    mobileMenu.style.display = 'none';
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.overflow = 'hidden';
    mobileMenu.style.transition = 'max-height 0.3s ease';

    menuToggle.addEventListener('click', function() {
        const isOpen = mobileMenu.style.display === 'block';
        
        if (isOpen) {
            // Cerrar menú
            mobileMenu.style.maxHeight = '0';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        } else {
            // Abrir menú
            mobileMenu.style.display = 'block';
            // Forzar reflow para que la transición funcione
            void mobileMenu.offsetHeight;
            mobileMenu.style.maxHeight = '500px';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.maxHeight = '0';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        });
    });
}

// ============================================================
// INICIALIZAR
// ============================================================

renderFaqs('all');