/* ============================================
   CaribeSupply S.A.S. - Módulo de Autenticación
   Registro, Login y Gestión de Sesiones
   ============================================ */

const Auth = {
    // Clave para localStorage
    STORAGE_KEY: 'caribesupply_users',
    SESSION_KEY: 'caribesupply_session',

    // Inicializar módulo
    init() {
        this.updateAuthUI();
        this.setupEventListeners();
    },

    // Obtener usuarios guardados
    getUsers() {
        const users = localStorage.getItem(this.STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    },

    // Guardar usuarios
    saveUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    },

    // Obtener sesión actual
    getCurrentUser() {
        const session = localStorage.getItem(this.SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    // Guardar sesión
    saveSession(user) {
        // No guardar la contraseña en la sesión
        const sessionUser = { ...user };
        delete sessionUser.password;
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));
    },

    // Cerrar sesión
    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        this.updateAuthUI();
        Toast.show('Sesión cerrada exitosamente', 'success');
        
        // Redirigir si está en una página protegida
        const protectedPages = ['checkout.html'];
        const currentPage = window.location.pathname.split('/').pop();
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    },

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validar contraseña (mínimo 8 caracteres, una mayúscula, una minúscula, un número)
    isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    },

    // Validar teléfono dominicano
    isValidPhone(phone) {
        // Formato: 809-XXX-XXXX, 829-XXX-XXXX, 849-XXX-XXXX o variaciones
        const phoneRegex = /^(809|829|849)[-\s]?\d{3}[-\s]?\d{4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    // Registrar nuevo usuario
    register(userData) {
        const { nombre, apellido, email, telefono, password, confirmPassword, provincia } = userData;
        const errors = [];

        // Validaciones
        if (!nombre || nombre.trim().length < 2) {
            errors.push({ field: 'nombre', message: 'El nombre debe tener al menos 2 caracteres' });
        }

        if (!apellido || apellido.trim().length < 2) {
            errors.push({ field: 'apellido', message: 'El apellido debe tener al menos 2 caracteres' });
        }

        if (!this.isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Ingresa un correo electrónico válido' });
        }

        if (!this.isValidPhone(telefono)) {
            errors.push({ field: 'telefono', message: 'Ingresa un teléfono válido (ej: 809-555-1234)' });
        }

        if (!this.isValidPassword(password)) {
            errors.push({ field: 'password', message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número' });
        }

        if (password !== confirmPassword) {
            errors.push({ field: 'confirmPassword', message: 'Las contraseñas no coinciden' });
        }

        if (!provincia) {
            errors.push({ field: 'provincia', message: 'Selecciona una provincia' });
        }

        // Verificar si el email ya existe
        const users = this.getUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            errors.push({ field: 'email', message: 'Este correo ya está registrado' });
        }

        if (errors.length > 0) {
            return { success: false, errors };
        }

        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: email.toLowerCase().trim(),
            telefono: telefono.trim(),
            password: password, // En producción real, se usaría hash
            provincia,
            fechaRegistro: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);
        this.saveSession(newUser);
        this.updateAuthUI();

        return { success: true, user: newUser };
    },

    // Iniciar sesión
    login(email, password) {
        const errors = [];

        if (!email || !this.isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Ingresa un correo electrónico válido' });
        }

        if (!password) {
            errors.push({ field: 'password', message: 'Ingresa tu contraseña' });
        }

        if (errors.length > 0) {
            return { success: false, errors };
        }

        const users = this.getUsers();
        const user = users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password
        );

        if (!user) {
            return { 
                success: false, 
                errors: [{ field: 'general', message: 'Correo o contraseña incorrectos' }]
            };
        }

        this.saveSession(user);
        this.updateAuthUI();

        return { success: true, user };
    },

    // Actualizar UI según estado de autenticación
    updateAuthUI() {
        const user = this.getCurrentUser();
        const authBtn = document.getElementById('auth-btn');
        
        if (authBtn) {
            if (user) {
                authBtn.textContent = user.nombre;
                authBtn.href = '#';
                authBtn.classList.add('logged-in');
                authBtn.onclick = (e) => {
                    e.preventDefault();
                    this.showUserMenu(e.target);
                };
            } else {
                authBtn.textContent = 'Iniciar Sesión';
                authBtn.href = 'pages/login.html';
                // Ajustar ruta si ya estamos en /pages/
                if (window.location.pathname.includes('/pages/')) {
                    authBtn.href = 'login.html';
                }
                authBtn.classList.remove('logged-in');
                authBtn.onclick = null;
            }
        }
    },

    // Mostrar menú de usuario
    showUserMenu(target) {
        // Remover menú existente si hay uno
        const existingMenu = document.querySelector('.user-dropdown');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const user = this.getCurrentUser();
        if (!user) return;

        const menu = document.createElement('div');
        menu.className = 'user-dropdown';
        menu.innerHTML = `
            <div class="user-dropdown-header">
                <div class="user-avatar">${user.nombre[0]}${user.apellido[0]}</div>
                <div class="user-info">
                    <span class="user-name">${user.nombre} ${user.apellido}</span>
                    <span class="user-email">${user.email}</span>
                </div>
            </div>
            <div class="user-dropdown-divider"></div>
            <button class="user-dropdown-item" onclick="Auth.logout()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Cerrar Sesión
            </button>
        `;

        // Posicionar menú
        const rect = target.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = `${rect.bottom + 8}px`;
        menu.style.right = `${window.innerWidth - rect.right}px`;

        document.body.appendChild(menu);

        // Añadir estilos inline para el dropdown
        const style = document.createElement('style');
        style.textContent = `
            .user-dropdown {
                background: var(--bg-primary);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-xl);
                min-width: 250px;
                z-index: 1000;
                animation: dropdownIn 0.2s ease;
            }
            @keyframes dropdownIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .user-dropdown-header {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                padding: var(--space-lg);
            }
            .user-dropdown .user-avatar {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
                color: white;
                border-radius: var(--radius-full);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: var(--text-sm);
            }
            .user-dropdown .user-name {
                display: block;
                font-weight: 600;
                color: var(--text-primary);
            }
            .user-dropdown .user-email {
                display: block;
                font-size: var(--text-sm);
                color: var(--text-muted);
            }
            .user-dropdown-divider {
                height: 1px;
                background: var(--bg-tertiary);
            }
            .user-dropdown-item {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                width: 100%;
                padding: var(--space-md) var(--space-lg);
                background: none;
                border: none;
                font-family: var(--font-body);
                font-size: var(--text-sm);
                color: var(--text-secondary);
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            .user-dropdown-item:hover {
                background: var(--bg-secondary);
                color: var(--color-error);
            }
        `;
        document.head.appendChild(style);

        // Cerrar al hacer clic fuera
        const closeMenu = (e) => {
            if (!menu.contains(e.target) && e.target !== target) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 0);
    },

    // Configurar event listeners
    setupEventListeners() {
        // Formulario de login
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(loginForm);
            });
        }

        // Formulario de registro
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(registerForm);
            });
        }
    },

    // Manejar envío de login
    handleLogin(form) {
        // Limpiar errores previos
        this.clearFormErrors(form);

        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        const result = this.login(email, password);

        if (result.success) {
            Toast.show('¡Bienvenido de vuelta!', 'success');
            
            // Redirigir según contexto
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect') || '../index.html';
            
            setTimeout(() => {
                window.location.href = redirect;
            }, 1000);
        } else {
            this.showFormErrors(form, result.errors);
        }
    },

    // Manejar envío de registro
    handleRegister(form) {
        // Limpiar errores previos
        this.clearFormErrors(form);

        const userData = {
            nombre: form.querySelector('#nombre').value,
            apellido: form.querySelector('#apellido').value,
            email: form.querySelector('#email').value,
            telefono: form.querySelector('#telefono').value,
            password: form.querySelector('#password').value,
            confirmPassword: form.querySelector('#confirm-password').value,
            provincia: form.querySelector('#provincia').value
        };

        const result = this.register(userData);

        if (result.success) {
            Toast.show('¡Cuenta creada exitosamente!', 'success');
            
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        } else {
            this.showFormErrors(form, result.errors);
        }
    },

    // Mostrar errores en el formulario
    showFormErrors(form, errors) {
        errors.forEach(error => {
            if (error.field === 'general') {
                // Error general (mostrar en un toast o div especial)
                Toast.show(error.message, 'error');
            } else {
                const field = form.querySelector(`#${error.field}`);
                if (field) {
                    const formGroup = field.closest('.form-group');
                    if (formGroup) {
                        formGroup.classList.add('has-error');
                        const errorDiv = formGroup.querySelector('.form-error');
                        if (errorDiv) {
                            errorDiv.textContent = error.message;
                        }
                    }
                    field.classList.add('error');
                    field.setAttribute('aria-invalid', 'true');
                }
            }
        });

        // Focus en el primer campo con error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    },

    // Limpiar errores del formulario
    clearFormErrors(form) {
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
        });
        form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
            field.removeAttribute('aria-invalid');
        });
        form.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
        });
    },

    // Verificar si el usuario está autenticado (para páginas protegidas)
    requireAuth() {
        const user = this.getCurrentUser();
        if (!user) {
            const currentPage = window.location.pathname;
            window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
            return false;
        }
        return true;
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

// Exportar globalmente
window.Auth = Auth;
