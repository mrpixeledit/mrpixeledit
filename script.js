// Variables
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.scroll-section');
const allScrollItems = document.querySelectorAll('.scroll-item');

// Controlar el orden secuencial de animación
let previousScrollDirection = 0;
let animationInProgress = false;

// Función principal de scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > previousScrollDirection ? 'down' : 'up';
    previousScrollDirection = currentScroll;
    
    const windowHeight = window.innerHeight;
    
    // Menú activo
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        
        if (currentScroll >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
    
    // Animaciones secuenciales de entrada/salida
    animateItemsSequentially(scrollDirection, windowHeight, currentScroll);
});

// Animar elementos de forma secuencial
function animateItemsSequentially(direction, windowHeight, scrollY) {
    const itemsBySection = {};
    
    // Agrupar items por sección
    sections.forEach(section => {
        const sectionItems = section.querySelectorAll('.scroll-item');
        const sectionId = section.getAttribute('id');
        itemsBySection[sectionId] = Array.from(sectionItems);
    });
    
    // También agregar footer
    const footerItems = document.querySelector('footer')?.querySelectorAll('.scroll-item');
    if (footerItems) {
        itemsBySection['footer'] = Array.from(footerItems);
    }
    
    // Animar cada sección
    Object.keys(itemsBySection).forEach(sectionId => {
        const items = itemsBySection[sectionId];
        const section = document.getElementById(sectionId);
        
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Calcular progreso de la sección en el viewport
        const progress = (scrollY + windowHeight / 2 - sectionTop) / sectionHeight;
        
        if (direction === 'down') {
            // Scroll hacia abajo - animar entrada secuencial
            if (scrollY + windowHeight > sectionTop && scrollY < sectionBottom) {
                items.forEach((item, index) => {
                    const itemTop = item.getBoundingClientRect().top;
                    const triggerPoint = windowHeight * 0.7;
                    
                    if (itemTop < triggerPoint) {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150); // 150ms de retraso entre cada elemento
                    } else {
                        item.classList.remove('visible');
                    }
                });
            } else if (scrollY >= sectionBottom) {
                // Sección ya pasó - mantener visible
                items.forEach(item => {
                    item.classList.add('visible');
                });
            } else {
                // Sección aún no llega - quitar visible
                items.forEach(item => {
                    item.classList.remove('visible');
                });
            }
        } else {
            // Scroll hacia arriba - animar salida inversa
            if (scrollY + windowHeight > sectionTop && scrollY < sectionBottom) {
                items.forEach((item, index) => {
                    const itemTop = item.getBoundingClientRect().top;
                    const triggerPoint = windowHeight * 0.3;
                    
                    if (itemTop > windowHeight || itemTop < -item.offsetHeight) {
                        item.classList.remove('visible');
                    } else if (itemTop < triggerPoint) {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                    }
                });
            } else if (scrollY + windowHeight <= sectionTop) {
                // Sección aún no llega desde arriba - quitar visible
                items.forEach(item => {
                    item.classList.remove('visible');
                });
            }
        }
    });
}

// Inicializar al cargar
window.addEventListener('load', () => {
    window.dispatchEvent(new Event('scroll'));
    
    // Hacer visible el hero inmediatamente
    const heroItems = document.querySelectorAll('#hero .scroll-item');
    heroItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200);
    });
});