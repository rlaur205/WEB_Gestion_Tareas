// Espero a que toda la pagina cargue por completo antes de ejecutar cualquier cosa de este codigo
document.addEventListener("DOMContentLoaded", () => {

  // Aqui estoy buscando el formulario y varios elementos que necesito controlar en pantalla
  const authForm = document.getElementById("auth-form");
  const formTitle = document.getElementById("form-title");
  const submitButton = document.getElementById("submit-button");
  const toggleLink = document.getElementById("toggle-auth-link");
  const toggleLinkText = document.querySelector(".toggle-link");

  // Estos son los grupos visuales donde aparecen los campos de nombre y apellido
  const nombreField = document.querySelector("label[for='nombre']").parentElement;
  const apellidoField = document.querySelector("label[for='apellido']").parentElement;

  // Aqui guardo los inputs donde el usuario escribe su informacion
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Esta variable me dice si estoy en modo registro o modo login
  let isRegisterMode = false;

  // Esta funcion cambia la pantalla entre modo "crear cuenta" y modo "iniciar sesion"
  function toggleAuthMode() {

    // Aqui invierto el estado: si era login pasa a registro y si era registro pasa a login
    isRegisterMode = !isRegisterMode;

    // Si estoy en modo registro modifico textos y muestro campos nuevos
    if (isRegisterMode) {

      // Cambio los textos visibles para que el usuario sepa que esta creando una cuenta
      formTitle.textContent = "Crear Cuenta";
      submitButton.textContent = "Crear Cuenta";
      toggleLink.textContent = "Inicia Sesion";
      toggleLinkText.childNodes[0].nodeValue = "¿Ya tienes una cuenta? ";

      // Muestro los campos extra que solo sirven en el registro
      nombreField.style.display = "block";
      apellidoField.style.display = "block";

      // Limpio los inputs para que no queden datos viejos
      authForm.reset();

    } else {

      // Si vuelvo al modo login restauro todos los textos originales
      formTitle.textContent = "Inicia Sesion";
      submitButton.textContent = "Ingresar";
      toggleLink.textContent = "Registrate aqui";
      toggleLinkText.childNodes[0].nodeValue = "¿No tienes una cuenta? ";

      // Vuelvo a ocultar los campos que solo sirven para registrar usuarios
      nombreField.style.display = "none";
      apellidoField.style.display = "none";

      // Limpio los datos escritos en el formulario
      authForm.reset();
    }
  }

  // Esta funcion se ejecuta cuando el usuario presiona el boton del formulario
  function handleFormSubmit(evento) {

    // Evito que la pagina se recargue automáticamente
    evento.preventDefault();

    // Leo la informacion que el usuario escribio
    const correo = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Si estoy en modo registro, hago todo lo necesario para crear una cuenta
    if (isRegisterMode) {

      const nombre = nombreInput.value.trim();
      const apellido = apellidoInput.value.trim();

      // Reviso que todos los campos esten llenos
      if (nombre === "" || apellido === "" || correo === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Verifico si ya existe un usuario con el mismo correo en localStorage
      if (localStorage.getItem(correo)) {
        alert("Este correo ya esta registrado. Intenta iniciar sesion.");
        return;
      }

      // Creo una cadena con los datos del usuario para guardarlos
      const userData = `${nombre},${apellido},${password}`;
      localStorage.setItem(correo, userData);

      // Aviso al usuario que su cuenta se creo correctamente
      alert("Cuenta creada con exito! Ahora puedes iniciar sesion.");

      // Cambio nuevamente al modo login para que pueda iniciar sesion
      toggleAuthMode();

    } else {

      // Si estoy en modo login verifico los datos del usuario

      // Reviso que no haya dejado los campos vacios
      if (correo === "" || password === "") {
        alert("Por favor, ingresa correo y contrasena.");
        return;
      }

      // Busco si existe un usuario con ese correo
      const storedDataString = localStorage.getItem(correo);

      // Si no encuentro nada aviso que no existe
      if (!storedDataString) {
        alert("Usuario no encontrado. Verifica el correo o registrate.");
        return;
      }

      // Los datos estan guardados como "nombre,apellido,contrasena"
      const storedPassword = storedDataString.split(",")[2];

      // Comparo la contrasena ingresada con la guardada
      if (password === storedPassword) {

        // Guardo en localStorage quien es el usuario que inicio sesion
        localStorage.setItem("usuarioActual", correo);

        // Envio al usuario a la pagina principal
        window.location.href = "inicio.html";

      } else {
        // Si la contrasena no coincide muestro un mensaje
        alert("Contrasena incorrecta.");
      }
    }
  }

  // Aqui hago que el enlace de cambio de modo funcione cuando lo clickean
  toggleLink.addEventListener("click", (e) => {

    // Evito la recarga de pagina
    e.preventDefault();

    // Cambio el modo de la pantalla
    toggleAuthMode();
  });

  // Asigno la funcion que maneja el formulario cuando el usuario intenta enviarlo
  authForm.addEventListener("submit", handleFormSubmit);

});
