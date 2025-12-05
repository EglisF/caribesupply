/* ============================================
   CaribeSupply S.A.S. - Base de Datos
   Productos, Categorías y Configuración
   ============================================ */

// Productos del catálogo
const PRODUCTS = [
    {
        id: 1,
        name: "Collar de Larimar Artesanal",
        description: "Collar elaborado a mano con larimar dominicano auténtico, piedra exclusiva de República Dominicana.",
        price: 2850,
        category: "joyeria",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
        featured: true,
        badge: "Exclusivo",
        stock: 15,
        artisan: "María Santos",
        origin: "Puerto Plata"
    },
    {
        id: 2,
        name: "Café Orgánico de Jarabacoa",
        description: "Café de altura cultivado en las montañas de Jarabacoa. Tostado artesanal, 100% orgánico.",
        price: 450,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
        featured: true,
        badge: "Orgánico",
        stock: 50,
        artisan: "Cooperativa Café Verde",
        origin: "Jarabacoa"
    },
    {
        id: 3,
        name: "Máscara de Carnaval Vegana",
        description: "Máscara tradicional del carnaval dominicano. Pintada a mano con colores vibrantes.",
        price: 1200,
        category: "artesanias",
        image: "https://images.unsplash.com/photo-1551913902-c92207136625?w=400&h=400&fit=crop",
        featured: true,
        badge: null,
        stock: 8,
        artisan: "Taller Los Diablos",
        origin: "La Vega"
    },
    {
        id: 4,
        name: "Hamaca de Algodón Tejida",
        description: "Hamaca tradicional dominicana tejida a mano. Algodón 100% natural, colores tropicales.",
        price: 1850,
        category: "textiles",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop",
        featured: true,
        badge: "Popular",
        stock: 12,
        artisan: "Tejedoras de San Juan",
        origin: "San Juan de la Maguana"
    },
    {
        id: 5,
        name: "Cacao Puro en Barra",
        description: "Barra de cacao 100% dominicano. Sin azúcar añadida, ideal para repostería gourmet.",
        price: 280,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop",
        featured: false,
        badge: null,
        stock: 100,
        artisan: "Hacienda Cacao Real",
        origin: "Hato Mayor"
    },
    {
        id: 6,
        name: "Aretes de Ámbar Dominicano",
        description: "Aretes con ámbar auténtico dominicano, reconocido por su pureza y color único.",
        price: 1650,
        category: "joyeria",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
        featured: false,
        badge: "Premium",
        stock: 20,
        artisan: "Joyería Ambarina",
        origin: "Santiago"
    },
    {
        id: 7,
        name: "Muñeca Limé Tradicional",
        description: "Muñeca sin rostro, símbolo de la cultura dominicana. Elaborada con técnicas ancestrales.",
        price: 750,
        category: "artesanias",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        featured: false,
        badge: "Tradicional",
        stock: 25,
        artisan: "Artesanas Higüeyanas",
        origin: "Higüey"
    },
    {
        id: 8,
        name: "Ron Artesanal Añejo",
        description: "Ron premium añejado 12 años en barricas de roble. Producción limitada.",
        price: 2200,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop",
        featured: false,
        badge: "Edición Limitada",
        stock: 30,
        artisan: "Destilería Colonial",
        origin: "San Pedro de Macorís"
    },
    {
        id: 9,
        name: "Bolso de Palma Tejido",
        description: "Bolso artesanal tejido con hojas de palma. Resistente y ecológico.",
        price: 680,
        category: "textiles",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
        featured: false,
        badge: "Eco",
        stock: 35,
        artisan: "Mujeres de Miches",
        origin: "Miches"
    },
    {
        id: 10,
        name: "Pulsera de Cuero y Larimar",
        description: "Pulsera unisex de cuero dominicano con piedra de larimar engastada.",
        price: 980,
        category: "joyeria",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        featured: false,
        badge: null,
        stock: 40,
        artisan: "Cuero Artesanal RD",
        origin: "Santo Domingo"
    },
    {
        id: 11,
        name: "Miel de Abeja Silvestre",
        description: "Miel pura de abejas silvestres recolectada en los montes de Constanza.",
        price: 320,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
        featured: false,
        badge: "Natural",
        stock: 60,
        artisan: "Apicultores de Constanza",
        origin: "Constanza"
    },
    {
        id: 12,
        name: "Güira Decorativa Pintada",
        description: "Güira tradicional pintada con motivos taínos. Pieza decorativa y funcional.",
        price: 550,
        category: "artesanias",
        image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=400&h=400&fit=crop",
        featured: false,
        badge: null,
        stock: 18,
        artisan: "Artesanos de Bonao",
        origin: "Bonao"
    },
    {
        id: 13,
        name: "Mantel Bordado a Mano",
        description: "Mantel de lino con bordados tradicionales dominicanos. Trabajo 100% manual.",
        price: 1450,
        category: "textiles",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        featured: false,
        badge: null,
        stock: 10,
        artisan: "Bordadoras de Moca",
        origin: "Moca"
    },
    {
        id: 14,
        name: "Anillo de Ámbar Azul",
        description: "Anillo de plata 925 con ámbar azul dominicano, el más raro del mundo.",
        price: 3500,
        category: "joyeria",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        featured: true,
        badge: "Raro",
        stock: 5,
        artisan: "Platería del Cibao",
        origin: "Santiago"
    },
    {
        id: 15,
        name: "Salsa Picante Artesanal",
        description: "Salsa picante con ajíes dominicanos. Receta familiar de tres generaciones.",
        price: 180,
        category: "alimentos",
        image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop",
        featured: false,
        badge: null,
        stock: 80,
        artisan: "Sazón Criollo",
        origin: "Baní"
    },
    {
        id: 16,
        name: "Tambora Tradicional",
        description: "Tambora artesanal para música típica. Cuero de chivo curtido naturalmente.",
        price: 2800,
        category: "artesanias",
        image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=400&fit=crop",
        featured: false,
        badge: "Instrumento",
        stock: 6,
        artisan: "Lutería Criolla",
        origin: "Villa Mella"
    }
];

// Categorías
const CATEGORIES = [
    { id: "artesanias", name: "Artesanías", icon: "🏺", count: 24 },
    { id: "alimentos", name: "Alimentos", icon: "🍯", count: 18 },
    { id: "textiles", name: "Textiles", icon: "🧵", count: 15 },
    { id: "joyeria", name: "Joyería", icon: "💎", count: 21 }
];

// Provincias de República Dominicana
const PROVINCIAS = [
    { id: "santo-domingo", name: "Santo Domingo", lat: 18.4861, lon: -69.9312 },
    { id: "santiago", name: "Santiago", lat: 19.4517, lon: -70.6970 },
    { id: "la-vega", name: "La Vega", lat: 19.2220, lon: -70.5295 },
    { id: "puerto-plata", name: "Puerto Plata", lat: 19.7934, lon: -70.6884 },
    { id: "san-cristobal", name: "San Cristóbal", lat: 18.4167, lon: -70.1000 },
    { id: "la-romana", name: "La Romana", lat: 18.4273, lon: -68.9728 },
    { id: "san-pedro", name: "San Pedro de Macorís", lat: 18.4539, lon: -69.3086 },
    { id: "duarte", name: "Duarte (San Fco. de Macorís)", lat: 19.3000, lon: -70.2528 },
    { id: "la-altagracia", name: "La Altagracia (Higüey)", lat: 18.6167, lon: -68.7000 },
    { id: "samana", name: "Samaná", lat: 19.2059, lon: -69.3365 },
    { id: "azua", name: "Azua", lat: 18.4531, lon: -70.7289 },
    { id: "barahona", name: "Barahona", lat: 18.2000, lon: -71.1000 },
    { id: "monte-cristi", name: "Monte Cristi", lat: 19.8500, lon: -71.6500 },
    { id: "espaillat", name: "Espaillat (Moca)", lat: 19.3833, lon: -70.5167 },
    { id: "peravia", name: "Peravia (Baní)", lat: 18.2833, lon: -70.3333 },
    { id: "valverde", name: "Valverde (Mao)", lat: 19.5500, lon: -71.0833 },
    { id: "monsenor-nouel", name: "Monseñor Nouel (Bonao)", lat: 18.9333, lon: -70.4167 },
    { id: "sanchez-ramirez", name: "Sánchez Ramírez (Cotuí)", lat: 19.0583, lon: -70.1528 },
    { id: "maria-trinidad", name: "María Trinidad Sánchez (Nagua)", lat: 19.3833, lon: -69.8500 },
    { id: "hato-mayor", name: "Hato Mayor", lat: 18.7667, lon: -69.2500 },
    { id: "el-seibo", name: "El Seibo", lat: 18.7667, lon: -69.0333 },
    { id: "monte-plata", name: "Monte Plata", lat: 18.8000, lon: -69.7833 },
    { id: "dajabon", name: "Dajabón", lat: 19.5500, lon: -71.7083 },
    { id: "santiago-rodriguez", name: "Santiago Rodríguez", lat: 19.4667, lon: -71.3333 },
    { id: "san-juan", name: "San Juan", lat: 18.8000, lon: -71.2333 },
    { id: "elias-pina", name: "Elías Piña", lat: 18.8833, lon: -71.7000 },
    { id: "baoruco", name: "Baoruco (Neiba)", lat: 18.4833, lon: -71.4167 },
    { id: "independencia", name: "Independencia", lat: 18.5000, lon: -71.7000 },
    { id: "pedernales", name: "Pedernales", lat: 18.0333, lon: -71.7500 },
    { id: "hermanas-mirabal", name: "Hermanas Mirabal (Salcedo)", lat: 19.3833, lon: -70.4167 },
    { id: "constanza", name: "La Vega (Constanza)", lat: 18.9167, lon: -70.7500 },
    { id: "jarabacoa", name: "La Vega (Jarabacoa)", lat: 19.1167, lon: -70.6333 }
];

// FAQs para el centro de soporte
const FAQS = [
    {
        id: 1,
        category: "pedidos",
        question: "¿Cómo puedo hacer un pedido?",
        answer: "Para hacer un pedido, navega por nuestro catálogo, selecciona los productos que deseas y agrégalos al carrito. Luego, procede al checkout donde ingresarás tus datos de envío y pago."
    },
    {
        id: 2,
        category: "pedidos",
        question: "¿Cuáles son los métodos de pago disponibles?",
        answer: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), transferencias bancarias y pagos en efectivo contra entrega en zonas seleccionadas."
    },
    {
        id: 3,
        category: "envios",
        question: "¿Cuánto tiempo tarda el envío?",
        answer: "Los envíos dentro de Santo Domingo tardan 24-48 horas. Para otras provincias, el tiempo estimado es de 2-4 días hábiles. Envíos internacionales pueden tardar 7-15 días hábiles."
    },
    {
        id: 4,
        category: "envios",
        question: "¿Cuál es el costo del envío?",
        answer: "El envío es gratis para pedidos mayores a RD$2,000 dentro de República Dominicana. Para montos menores, el costo es de RD$150-300 según la zona. Envíos internacionales se calculan según peso y destino."
    },
    {
        id: 5,
        category: "envios",
        question: "¿Cómo puedo rastrear mi pedido?",
        answer: "Una vez despachado tu pedido, recibirás un correo con el número de seguimiento. Puedes ingresar este número en nuestra sección de Seguimiento para ver el estado de tu envío en tiempo real."
    },
    {
        id: 6,
        category: "productos",
        question: "¿Los productos son auténticos?",
        answer: "Sí, todos nuestros productos son 100% auténticos y verificados. Trabajamos directamente con artesanos y productores locales certificados. Cada producto incluye un certificado de autenticidad."
    },
    {
        id: 7,
        category: "productos",
        question: "¿Puedo personalizar un producto?",
        answer: "Muchos de nuestros artesanos ofrecen personalización. Contacta a nuestro equipo de soporte con los detalles de lo que deseas y te conectaremos con el artesano correspondiente."
    },
    {
        id: 8,
        category: "devoluciones",
        question: "¿Cuál es la política de devoluciones?",
        answer: "Aceptamos devoluciones dentro de los 15 días posteriores a la recepción del producto. El artículo debe estar sin usar y en su empaque original. Los costos de envío de devolución corren por cuenta del cliente."
    },
    {
        id: 9,
        category: "devoluciones",
        question: "¿Cómo solicito un reembolso?",
        answer: "Para solicitar un reembolso, contacta a nuestro equipo de soporte con tu número de pedido. Una vez aprobada la devolución y recibido el producto, procesaremos el reembolso en 5-7 días hábiles."
    },
    {
        id: 10,
        category: "cuenta",
        question: "¿Cómo creo una cuenta?",
        answer: "Haz clic en 'Registrarse' en la esquina superior derecha. Completa el formulario con tus datos personales y crea una contraseña segura. Recibirás un correo de confirmación."
    },
    {
        id: 11,
        category: "cuenta",
        question: "¿Olvidé mi contraseña, qué hago?",
        answer: "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
    },
    {
        id: 12,
        category: "artesanos",
        question: "¿Cómo apoyan a los artesanos locales?",
        answer: "El 70% del precio de venta va directamente a los artesanos y productores. Además, ofrecemos capacitación, acceso a nuevos mercados y apoyo en la comercialización de sus productos."
    }
];

// Categorías de FAQ
const FAQ_CATEGORIES = [
    { id: "pedidos", name: "Pedidos", icon: "📦" },
    { id: "envios", name: "Envíos", icon: "🚚" },
    { id: "productos", name: "Productos", icon: "🏷️" },
    { id: "devoluciones", name: "Devoluciones", icon: "↩️" },
    { id: "cuenta", name: "Mi Cuenta", icon: "👤" },
    { id: "artesanos", name: "Artesanos", icon: "🎨" }
];

// Configuración de la aplicación
const APP_CONFIG = {
    currency: "RD$",
    taxRate: 0.18, // ITBIS 18%
    freeShippingThreshold: 2000,
    shippingCost: {
        santodomingo: 150,
        other: 250,
        international: 1500
    }
};

// Estados de pedido para seguimiento
const ORDER_STATUSES = [
    { id: "pending", name: "Pedido Recibido", icon: "📋", description: "Tu pedido ha sido recibido y está siendo procesado." },
    { id: "confirmed", name: "Confirmado", icon: "✅", description: "El pago ha sido confirmado. Preparando tu pedido." },
    { id: "preparing", name: "En Preparación", icon: "📦", description: "El artesano está preparando tu pedido con cuidado." },
    { id: "shipped", name: "Enviado", icon: "🚚", description: "Tu pedido está en camino." },
    { id: "in-transit", name: "En Tránsito", icon: "🛣️", description: "El paquete está siendo transportado a tu dirección." },
    { id: "delivered", name: "Entregado", icon: "🎉", description: "¡Tu pedido ha sido entregado!" }
];

// Monedas para tasas de cambio
const CURRENCIES = [
    { code: "USD", name: "Dólar Estadounidense", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "Libra Esterlina", symbol: "£" },
    { code: "CAD", name: "Dólar Canadiense", symbol: "C$" },
    { code: "MXN", name: "Peso Mexicano", symbol: "MX$" },
    { code: "COP", name: "Peso Colombiano", symbol: "CO$" },
    { code: "BRL", name: "Real Brasileño", symbol: "R$" },
    { code: "HTG", name: "Gourde Haitiano", symbol: "G" }
];

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.PRODUCTS = PRODUCTS;
    window.CATEGORIES = CATEGORIES;
    window.PROVINCIAS = PROVINCIAS;
    window.FAQS = FAQS;
    window.FAQ_CATEGORIES = FAQ_CATEGORIES;
    window.APP_CONFIG = APP_CONFIG;
    window.ORDER_STATUSES = ORDER_STATUSES;
    window.CURRENCIES = CURRENCIES;
}
