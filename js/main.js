/* ============================================
   CaribeSupply S.A.S. - JavaScript Principal
   Funciones generales y navegación
   ============================================ */

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFeaturedProducts();
    initNewsletterForm();
});

// Navegación móvil
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Productos destacados en la página principal
function initFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid || typeof PRODUCTS === 'undefined') return;

    const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);
    
    grid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');

    // Añadir event listeners a los botones de agregar al carrito
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.productId);
            Cart.addItem(productId);
        });
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const categoryName = CATEGORIES.find(c => c.id === product.category)?.name || product.category;
    
    return `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${categoryName}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">
                        <span class="currency">${APP_CONFIG.currency}</span>${product.price.toLocaleString('es-DO')}
                    </span>
                    <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Agregar ${product.name} al carrito">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Formulario de newsletter
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('#newsletter-email').value;
        
        if (email) {
            // Simular suscripción
            Toast.show('¡Gracias por suscribirte! Pronto recibirás noticias.', 'success');
            form.reset();
        }
    });
}

// Utilidades

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-DO', options);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Scroll suave a elemento
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Validar campos de formulario en tiempo real
function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', debounce(() => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        }, 300));
    });
}

// Validar campo individual
function validateField(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return true;

    const errorDiv = formGroup.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';

    // Validación requerida
    if (input.required && !input.value.trim()) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    }

    // Validación de email
    if (isValid && input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            errorMessage = 'Ingresa un correo válido';
        }
    }

    // Validación de teléfono
    if (isValid && input.type === 'tel' && input.value) {
        const phoneRegex = /^(809|829|849)[-\s]?\d{3}[-\s]?\d{4}$/;
        if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Formato: 809-555-1234';
        }
    }

    // Validación de longitud mínima
    if (isValid && input.minLength && input.value.length < input.minLength) {
        isValid = false;
        errorMessage = `Mínimo ${input.minLength} caracteres`;
    }

    // Actualizar UI
    if (isValid) {
        formGroup.classList.remove('has-error');
        input.classList.remove('error');
        input.removeAttribute('aria-invalid');
        if (errorDiv) errorDiv.textContent = '';
    } else {
        formGroup.classList.add('has-error');
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        if (errorDiv) errorDiv.textContent = errorMessage;
    }

    return isValid;
}

// Cargar scripts dinámicamente
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Detectar si el usuario prefiere movimiento reducido
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Aplicar animaciones solo si el usuario no prefiere movimiento reducido
function animateElement(element, animation) {
    if (!prefersReducedMotion()) {
        element.style.animation = animation;
    }
}

// Exportar funciones útiles
window.CaribeSupply = {
    formatDate,
    debounce,
    throttle,
    smoothScrollTo,
    setupFormValidation,
    validateField,
    loadScript,
    prefersReducedMotion,
    animateElement,
    createProductCard
};
