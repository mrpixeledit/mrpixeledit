// Header y menú activo
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const allScrollElements = document.querySelectorAll('.scroll-element, .scroll-item');

// Detectar scroll para menú activo y efectos
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    // Menú activo
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
    
    // Efecto de difuminado y encogimiento
    allScrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        // Si el elemento está fuera de la pantalla (arriba)
        if (elementTop + elementHeight < -100) {
            element.classList.add('hidden');
            element.classList.remove('fading');
        }
        // Si el elemento está saliendo por arriba
        else if (elementTop + elementHeight < 100) {
            element.classList.add('fading');
            element.classList.remove('hidden');
        }
        // Si el elemento está saliendo por abajo
        else if (elementTop > windowHeight + 100) {
            element.classList.add('fading');
            element.classList.remove('hidden');
        }
        // Si el elemento está muy abajo
        else if (elementTop > windowHeight + 300) {
            element.classList.add('hidden');
            element.classList.remove('fading');
        }
        // Si el elemento está visible
        else {
            element.classList.remove('fading');
            element.classList.remove('hidden');
        }
    });
});

// Ejecutar al cargar
window.addEventListener('load', () => {
    window.dispatchEvent(new Event('scroll'));
});