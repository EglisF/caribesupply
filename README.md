# 🌴 CaribeSupply S.A.S.

Integrantes del grupo
Eglis Oscar Feliz Guzman – 100508426
José Joaquín López Luciano – 100631111
Jean Carlos Fernandez Marte – 100544210
Ignacio Hernández Ubaldo - 100293550

## Descripción Ejecutiva

**CaribeSupply S.A.S.** es una plataforma de comercio electrónico dominicana que conecta artesanos, productores locales y microempresas con clientes nacionales e internacionales. El sitio web permite explorar productos artesanales auténticos, realizar compras simuladas y acceder a servicios complementarios como consulta de clima, tasas de cambio y seguimiento de pedidos.

### 🎯 Objetivo del Proyecto

Desarrollar un sitio web moderno, funcional y accesible que demuestre dominio técnico en:
- Diseño visual atractivo y coherente
- Integración de múltiples APIs
- Flujo completo de e-commerce (registro, catálogo, carrito, checkout)
- Accesibilidad web (WCAG 2.1)
- Responsive design

---

## 📋 Tabla de Secciones y APIs

| Sección | Descripción | API Utilizada | Endpoint |
|---------|-------------|---------------|----------|
| **Clima** | Consulta del clima por provincia | Open-Meteo API | `https://api.open-meteo.com/v1/forecast` |
| **Tasas de Cambio** | Conversión de divisas | ExchangeRate-API | `https://api.exchangerate-api.com/v4/latest/DOP` |
| **Seguimiento** | Rastreo de pedidos | API Simulada Interna | `GET /api/tracking/{orderNumber}` |
| **Soporte/FAQ** | Preguntas frecuentes y chatbot | API Simulada Interna | `GET /api/faq?category={cat}` |
| **Autenticación** | Registro y login de usuarios | localStorage API | Almacenamiento local del navegador |
| **Catálogo** | Lista de productos con filtros | Datos estáticos JSON | `js/data.js` |

---

## 🖼️ Capturas de Pantalla

### Página Principal (Home)
![Home](./screenshots/home.png)
- Hero section con llamada a la acción
- Productos destacados
- Categorías de productos
- Servicios disponibles

### Catálogo de Productos
![Catálogo](./screenshots/catalogo.png)
- Filtros por categoría
- Búsqueda en tiempo real
- Ordenamiento por precio/nombre
- Grid responsivo de productos

### Carrito de Compras
![Carrito](./screenshots/carrito.png)
- Lista de productos agregados
- Control de cantidades
- Cálculo automático de subtotal, ITBIS y envío
- Envío gratis en compras > RD$2,000

### Checkout
![Checkout](./screenshots/checkout.png)
- Formulario validado en tiempo real
- Campos: nombre, email, teléfono, dirección, provincia
- Resumen del pedido
- Confirmación con número de orden

### Login/Registro
![Login](./screenshots/login.png)
- Formularios accesibles con validación
- Mensajes de error claros
- Indicador de fortaleza de contraseña
- Navegación entre login y registro

### Clima por Provincia
![Clima](./screenshots/clima.png)
- Selección de 32 provincias
- Datos en tiempo real desde Open-Meteo
- Temperatura, humedad, viento
- Iconos según condición climática

### Tasas de Cambio
![Tasas](./screenshots/tasas.png)
- Convertidor bidireccional
- 8 monedas internacionales
- Actualización automática
- Tasas del día

---

## 🔧 Problemas Resueltos

### Problema 1: CORS en APIs Externas
**Descripción:** Las APIs de clima y tasas de cambio generaban errores CORS al ser llamadas desde el navegador.

**Solución:** 
- Se utilizó la API Open-Meteo que permite CORS por defecto
- Se implementó un sistema de fallback con datos simulados cuando la API falla
- Manejo de errores con mensajes informativos para el usuario

```javascript
try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API Error');
    // procesar datos
} catch (error) {
    renderSimulatedData(); // fallback
}
```

### Problema 2: Persistencia del Carrito
**Descripción:** El carrito se vaciaba al recargar la página o cambiar entre secciones.

**Solución:**
- Implementación de localStorage para persistir el estado del carrito
- Sincronización automática entre pestañas
- Actualización del contador en el header en tiempo real

```javascript
const Cart = {
    STORAGE_KEY: 'caribesupply_cart',
    getCart() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },
    saveCart(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        this.updateCartUI();
    }
};
```

### Problema 3: Validación de Formularios Accesible
**Descripción:** Los mensajes de error no eran accesibles para lectores de pantalla.

**Solución:**
- Uso de atributos ARIA (`aria-invalid`, `aria-describedby`, `role="alert"`)
- Mensajes de error visibles y asociados a cada campo
- Focus automático en el primer campo con error
- Validación en tiempo real (on blur y on input)

```html
<input type="email" id="email" aria-describedby="email-error" aria-invalid="false">
<span class="form-error" id="email-error" role="alert"></span>
```

### Problema 4: Navegación Móvil
**Descripción:** El menú de navegación no era usable en dispositivos móviles.

**Solución:**
- Implementación de menú hamburger con transiciones CSS
- Gestión correcta de `aria-expanded` para accesibilidad
- Cierre automático al seleccionar una opción
- Cierre al hacer clic fuera del menú

```javascript
navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
});
```

---

## 📊 Métricas de Rendimiento (Lighthouse)

| Métrica | Puntuación | Descripción |
|---------|------------|-------------|
| **Performance** | 92/100 | Optimización de imágenes, CSS crítico inline |
| **Accessibility** | 98/100 | ARIA labels, contraste, navegación por teclado |
| **Best Practices** | 95/100 | HTTPS ready, sin errores de consola |
| **SEO** | 100/100 | Meta tags, estructura semántica |

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Flexbox, Grid, Animaciones
- **JavaScript (ES6+)** - Módulos, Async/Await, Fetch API
- **localStorage** - Persistencia de datos
- **Google Fonts** - Playfair Display, Source Sans 3

---

## 📁 Estructura del Proyecto

```
caribesupply/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   ├── data.js             # Datos (productos, provincias, FAQs)
│   ├── auth.js             # Módulo de autenticación
│   ├── cart.js             # Módulo de carrito
│   └── main.js             # Funciones principales
├── pages/
│   ├── catalogo.html       # Catálogo de productos
│   ├── carrito.html        # Carrito de compras
│   ├── checkout.html       # Proceso de pago
│   ├── login.html          # Inicio de sesión
│   ├── registro.html       # Registro de usuarios
│   ├── clima.html          # Clima por provincia
│   ├── tasas.html          # Tasas de cambio
│   ├── seguimiento.html    # Seguimiento de pedidos
│   └── soporte.html        # FAQ y chatbot
└── README.md               # Documentación
```

---

## 🚀 Instrucciones de Despliegue

1. Clonar el repositorio
2. No requiere instalación de dependencias (vanilla JS)
3. Servir con cualquier servidor HTTP estático:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve
   
   # Con PHP
   php -S localhost:8000
   ```
4. Abrir `http://localhost:8000` en el navegador

---

## 👥 Equipo de Desarrollo

**CaribeSupply S.A.S.** - Grupo H 2025

---

## 📄 Licencia

Este proyecto es de uso educativo. Todos los productos, precios y datos son ficticios.

---

## 🔗 Enlaces

- **Producción:   https://github.com/EglisF/caribesupply
- **Repositorio:  https://github.com/EglisF
- **Documentación API Open-Meteo:** https://open-meteo.com/
- **Documentación ExchangeRate-API:** https://www.exchangerate-api.com/
