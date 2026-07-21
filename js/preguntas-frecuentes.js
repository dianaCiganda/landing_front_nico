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
        answer: 'Sí, nos desplazamos a tu domicilio o al lugar del evento. Trabajamos en Coronel Pringles y toda la zona, incluyendo localidades cercanas. Consultanos por disponibilidad y costos de traslado.'
    },
    // Reservas
    {
        id: 4,
        category: 'reservas',
        question: '¿Cómo puedo reservar un turno?',
        answer: 'Podés reservar tu turno a través de nuestra página web en la sección "Reservar Cita", o directamente por WhatsApp al +54 9 2922 45-2205. Te recomendamos hacerlo con anticipación para asegurar disponibilidad en la fecha que necesitas.'
    },
    {
        id: 5,
        category: 'reservas',
        question: '¿Con cuánta anticipación debo reservar?',
        answer: 'Recomendamos reservar con al menos 15 a 30 días de anticipación, especialmente para eventos como bodas o quinceañeras. En temporada alta (primavera-verano), sugerimos hacerlo con 2 meses de anticipación.'
    },
    {
        id: 6,
        category: 'reservas',
        question: '¿Qué necesito para la prueba de maquillaje?',
        answer: 'Para la prueba te recomendamos venir con el rostro limpio y sin maquillaje. Si tenés referencias o fotos de looks que te gusten, traelas para que podamos trabajar sobre ellas. También es ideal tener una idea del vestido o estilo del evento.'
    },
    // Precios
    {
        id: 7,
        category: 'precios',
        question: '¿Cuáles son los precios de los servicios?',
        answer: 'Los precios varían según el servicio, la complejidad del look y la cantidad de personas. Te invitamos a consultarnos por WhatsApp para darte un presupuesto personalizado sin compromiso. Trabajamos con diferentes paquetes y promociones.'
    },
    {
        id: 8,
        category: 'precios',
        question: '¿Aceptan medios de pago?',
        answer: 'Aceptamos efectivo, transferencia bancaria y todos los medios de pago electrónicos. También trabajamos con Mercado Pago. Consultanos por las opciones disponibles y financiación.'
    },
    {
        id: 9,
        category: 'precios',
        question: '¿Tienen promociones o descuentos?',
        answer: 'Sí, ofrecemos promociones especiales para grupos (novia + acompañantes), paquetes combinados de maquillaje y peinado, y descuentos por reserva anticipada. Consultanos por las promociones vigentes.'
    },
    // General
    {
        id: 10,
        category: 'general',
        question: '¿Qué productos utilizan?',
        answer: 'Trabajamos con productos profesionales de alta calidad, incluyendo marcas reconocidas como MAC, L\'Oréal, NARS, Urban Decay, y productos hipoalergénicos para pieles sensibles. Siempre priorizamos la salud de tu piel y cabello.'
    },
    {
        id: 11,
        category: 'general',
        question: '¿Cuánto dura el maquillaje y el peinado?',
        answer: 'Nuestros maquillajes están diseñados para durar todo el evento, con una duración de 8 a 12 horas dependiendo del tipo de piel y las condiciones. Los peinados se fijan para mantener su forma durante toda la jornada. Usamos productos de larga duración y técnicas profesionales.'
    },
    {
        id: 12,
        category: 'general',
        question: '¿Trabajan con todo tipo de cabello y piel?',
        answer: 'Sí, trabajamos con todo tipo de cabello (lacio, ondulado, rizado, afro) y todo tipo de piel (seca, grasa, mixta, sensible). Contamos con productos y técnicas específicas para cada necesidad, asegurando un resultado impecable en todos los casos.'
    }
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
            precios: 'Precios',
            general: 'General'
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
// INICIALIZAR
// ============================================================

renderFaqs('all');