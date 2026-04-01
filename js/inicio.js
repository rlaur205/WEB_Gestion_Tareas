// funcion que se encarga de actualizar el texto que aparece en una tarjeta segun lo que el usuario escriba
function actualizarTexto(inputId, textId) {

    // aqui agarro el input segun su id y leo lo que el usuario escribio
    const inputElement = document.getElementById(inputId);
    const textoNuevo = inputElement.value;

    // reviso que el usuario realmente haya escrito algo y que no sea solo espacios
    if (textoNuevo.trim() !== "") {

        // aqui ubico el parrafo que quiero actualizar y le pongo el nuevo texto
        const parrafoElement = document.getElementById(textId);
        parrafoElement.textContent = textoNuevo;

        // limpio el input para que quede ordenado despues de actualizar
        inputElement.value = "";

        // hago un pequeño efecto visual para que se note que el texto cambio
        parrafoElement.style.opacity = "0";
        setTimeout(() => {
            parrafoElement.style.opacity = "1";
        }, 200);

    } else {

        // si el usuario no escribio nada y quiere actualizar, le muestro un aviso
        alert("¡Escribe algo antes de actualizar! 😉");
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // busco el correo del usuario que esta logueado, que se guarda en el localStorage
    const usuarioActual = localStorage.getItem("usuarioActual");

    // busco el h3 donde voy a poner el saludo personalizado
    const saludoPerfil = document.getElementById("saludo-perfil");

    // solo continuo si hay usuario y el elemento existe
    if (usuarioActual && saludoPerfil) {

        // obtengo todos los datos que guardamos del usuario usando el correo como clave
        const userDataString = localStorage.getItem(usuarioActual);

        if (userDataString) {

            // separo los datos porque se guardaron como "Nombre,Apellido,Pass"
            const userDataArray = userDataString.split(",");
            const nombre = userDataArray[0];
            const apellido = userDataArray[1];

            // actualizo el saludo con el nombre y apellido del usuario
            saludoPerfil.textContent = `¡Hola, soy ${nombre} ${apellido}! 👋`;
        }
    }
});
