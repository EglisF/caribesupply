/* ============================================
   CaribeSupply S.A.S. - Módulo de Carrito
   Gestión del carrito de compras con localStorage
   ============================================ */

const Cart = {
    // Clave para localStorage
    STORAGE_KEY: 'caribesupply_cart',

    // Inicializar módulo
    init() {
        this.updateCartUI();
    },

    // Obtener carrito
    getCart() {
        const cart = localStorage.getItem(this.STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    },

    // Guardar carrito
    saveCart(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        this.updateCartUI();
    },

    // Agregar producto al carrito
    addItem(productId, quantity = 1) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) {
            Toast.show('Producto no encontrado', 'error');
            return false;
        }

        const cart = this.getCart();
        const existingItem = cart.find(item => item.productId === productId);

        if (existingItem) {
            // Verificar stock
            if (existingItem.quantity + quantity > product.stock) {
                Toast.show(`Solo hay ${product.stock} unidades disponibles`, 'error');
                return false;
            }
            existingItem.quantity += quantity;
        } else {
            if (quantity > product.stock) {
                Toast.show(`Solo hay ${product.stock} unidades disponibles`, 'error');
                return false;
            }
            cart.push({
                productId,
                quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart(cart);
        Toast.show(`${product.name} agregado al carrito`, 'success');
        return true;
    },

    // Remover producto del carrito
    removeItem(productId) {
        let cart = this.getCart();
        const item = cart.find(i => i.productId === productId);
        
        if (item) {
            const product = PRODUCTS.find(p => p.id === productId);
            cart = cart.filter(i => i.productId !== productId);
            this.saveCart(cart);
            Toast.show(`${product?.name || 'Producto'} eliminado del carrito`, 'info');
        }
    },

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return false;

        if (quantity < 1) {
            this.removeItem(productId);
            return true;
        }

        if (quantity > product.stock) {
            Toast.show(`Solo hay ${product.stock} unidades disponibles`, 'error');
            return false;
        }

        const cart = this.getCart();
        const item = cart.find(i => i.productId === productId);
        
        if (item) {
            item.quantity = quantity;
            this.saveCart(cart);
        }

        return true;
    },

    // Vaciar carrito
    clearCart() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateCartUI();
        Toast.show('Carrito vaciado', 'info');
    },

    // Obtener número total de items
    getItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    // Obtener subtotal
    getSubtotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    },

    // Calcular impuestos (ITBIS 18%)
    getTax() {
        return this.getSubtotal() * APP_CONFIG.taxRate;
    },

    // Calcular envío
    getShipping(provincia = 'other') {
        const subtotal = this.getSubtotal();
        if (subtotal >= APP_CONFIG.freeShippingThreshold) {
            return 0;
        }
        
        if (provincia === 'santo-domingo' || provincia === 'santo domingo') {
            return APP_CONFIG.shippingCost.santodomingo;
        }
        return APP_CONFIG.shippingCost.other;
    },

    // Obtener total
    getTotal(provincia = 'other') {
        return this.getSubtotal() + this.getTax() + this.getShipping(provincia);
    },

    // Obtener items del carrito con detalles del producto
    getCartWithProducts() {
        const cart = this.getCart();
        return cart.map(item => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            return {
                ...item,
                product
            };
        }).filter(item => item.product); // Filtrar productos que ya no existen
    },

    // Actualizar UI del carrito (contador en header)
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }

        // Si estamos en la página del carrito, actualizar la vista
        if (typeof renderCartPage === 'function') {
            renderCartPage();
        }
    },

    // Formatear precio
    formatPrice(price) {
        return `${APP_CONFIG.currency}${price.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },

    // Verificar si un producto está en el carrito
    isInCart(productId) {
        const cart = this.getCart();
        return cart.some(item => item.productId === productId);
    },

    // Obtener cantidad de un producto en el carrito
    getProductQuantity(productId) {
        const cart = this.getCart();
        const item = cart.find(i => i.productId === productId);
        return item ? item.quantity : 0;
    }
};

// Sistema de notificaciones Toast
const Toast = {
    container: null,

    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            this.container.setAttribute('role', 'alert');
            this.container.setAttribute('aria-live', 'polite');
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 3000) {
        if (!this.container) this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
            error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
            info: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
            warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
        };

        toast.innerHTML = `
            <span class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Cerrar notificación" onclick="this.parentElement.remove()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;

        this.container.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// Añadir animación de salida
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(toastStyle);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    Toast.init();
});

// Exportar globalmente
window.Cart = Cart;
window.Toast = Toast;
