// Esperamos a que el contenido del DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {

    // 1. Obtenemos el botón de menú (hamburguesa) y el menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    // 2. Validamos que ambos elementos existan para evitar errores en páginas donde no se usen
    if (mobileMenuBtn && mobileNav) {

        // A. Evento para abrir/cerrar el menú al hacer clic en el botón hamburguesa
        mobileMenuBtn.addEventListener('click', () => {
            // Activa/desactiva la clase "active" para animar el botón como una X
            mobileMenuBtn.classList.toggle('active');

            // Muestra/oculta el menú deslizante
            mobileNav.classList.toggle('active');
        });

        // B. Escuchamos los clics en cada enlace del menú móvil
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                // Cuando se hace clic en un enlace, cerramos el menú automáticamente
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }
});
