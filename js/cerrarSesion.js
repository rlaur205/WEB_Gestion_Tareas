// --- CERRAR SESIÓN --- 

// Obtener el botón de logout
const botonCerrarSesion = document.getElementById("logout-button");

// Función para cerrar sesión
function cerrarSesion() {
    // Limpiar localStorage
    localStorage.removeItem("usuarioActual");

    // Redirigir al login
    window.location.href = "index.html";
}

// Asignar el evento al botón de cerrar sesión
botonCerrarSesion.addEventListener("click", cerrarSesion);
