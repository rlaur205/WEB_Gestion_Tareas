# UPN Tareas — Plataforma Web de Gestión de Tareas Académicas

### Documentación del Proyecto

**Repositorio:** https://github.com/rlaur205/WEB_Gestion_Tareas  
**Tecnologías:** HTML5 · CSS3 · JavaScript Vanilla  
**Fecha de documentación:** Abril 2026

---

## 1. Descripción General

**UPN Tareas** es una aplicación web académica desarrollada íntegramente con tecnologías frontend puras: HTML5, CSS3 y JavaScript sin frameworks ni librerías externas. Está orientada a estudiantes de la Universidad Privada del Norte (UPN) y permite gestionar tareas académicas por curso y prioridad, intercambiar mensajes con compañeros y acceder a un panel personalizado con información del usuario.

Toda la información se almacena localmente en el navegador mediante **localStorage**, por lo que no requiere servidor ni base de datos externa para funcionar.

---

## 2. Estructura del Proyecto

```
WEB_Gestion_Tareas/
│
├── html/
│   ├── index.html       # Login y registro de usuarios
│   ├── inicio.html      # Dashboard principal
│   ├── tareas.html      # Gestión de tareas académicas
│   ├── mensajes.html    # Interfaz de chat
│   └── acerca.html      # Información del equipo
│
├── css/
│   ├── fondo.css        # Animación de fondo con partículas flotantes
│   ├── login.css        # Estilos del formulario de acceso
│   ├── inicio.css       # Estilos del dashboard
│   ├── tareas.css       # Estilos del gestor de tareas
│   ├── mensajes.css     # Estilos del chat
│   └── acerca.css       # Estilos de la página del equipo
│
├── js/
│   ├── login.js         # Autenticación y registro
│   ├── inicio.js        # Carga de datos del usuario autenticado
│   ├── tareas.js        # CRUD de tareas y estadísticas
│   ├── mensajes.js      # Lógica del sistema de chat
│   ├── navegacion.js    # Menú hamburguesa para móviles
│   └── cerrarSesion.js  # Cierre de sesión
│
├── logo.png             # Logo de la universidad
└── foto.png             # Imagen decorativa
```

El proyecto sigue una estructura modular: cada página HTML tiene su propio archivo CSS y JavaScript asociado, lo que facilita el mantenimiento y la lectura del código.

---

## 3. Tecnologías Utilizadas

|Tecnología|Uso|
|---|---|
|HTML5|Estructura semántica de todas las páginas|
|CSS3|Estilos, animaciones y diseño responsive|
|JavaScript ES6+|Lógica completa de la aplicación|
|localStorage|Persistencia de datos en el navegador|

---

## 4. Páginas y Funcionalidades

### Login / Registro (`index.html` + `login.js`)

Punto de entrada de la aplicación. Presenta un diseño dividido en dos paneles: el izquierdo muestra el logo y una descripción de la plataforma, y el derecho contiene el formulario de acceso. Este formulario alterna dinámicamente entre modo **Iniciar Sesión** y modo **Crear Cuenta** sin recargar la página, mostrando u ocultando los campos de nombre y apellido según corresponda.

Al registrarse, los datos del usuario se guardan en localStorage bajo su correo institucional como clave, en el formato `"nombre,apellido,contraseña"`. Al iniciar sesión, se verifica que el correo exista y que la contraseña coincida, y se guarda el correo del usuario activo bajo la clave `"usuarioActual"`.

### Dashboard (`inicio.html` + `inicio.js`)

Panel de bienvenida personalizado. Al cargar, lee los datos del usuario autenticado desde localStorage y muestra su nombre completo, iniciales en un avatar circular y correo institucional. Sirve como punto central de navegación hacia el resto de la aplicación.

### Gestión de Tareas (`tareas.html` + `tareas.js`)

Módulo principal de la aplicación. Implementa un CRUD completo de tareas académicas con las siguientes funcionalidades:

- **Crear y editar tareas** mediante un modal con campos de título, descripción, curso, fecha límite y prioridad (alta, media o baja). Las fechas pasadas están bloqueadas automáticamente.
- **Eliminar tareas** con confirmación previa del usuario.
- **Marcar como completadas** haciendo clic en el checkbox de cada tarea.
- **Filtrar** por estado (todas, pendientes, completadas) o por prioridad alta.
- **Buscar** tareas en tiempo real por título, curso o descripción.
- **Panel de estadísticas** que muestra en tiempo real el total de tareas, las completadas, las pendientes y las que tienen fecha límite hoy.
- **Recordatorios automáticos** que se ejecutan cada hora y registran en consola las tareas que vencen en 0, 1 o 2 días.

Todas las tareas se persisten en localStorage bajo la clave `"academicTasks"` en formato JSON.

### Mensajes (`mensajes.html` + `mensajes.js`)

Interfaz de chat con diseño de dos paneles: lista de contactos a la izquierda y área de conversación a la derecha. Cada contacto tiene un avatar con sus iniciales, un color personalizado y un indicador de estado en línea. Al enviar un mensaje, el sistema simula que el contacto está escribiendo durante 1.5 segundos (con una animación de tres puntos) y luego genera una respuesta automática. En pantallas móviles, los dos paneles se alternan mostrando uno a la vez, con un botón para volver a la lista de contactos.

### Acerca (`acerca.html`)

Página informativa con la descripción del proyecto y los integrantes del equipo de desarrollo.

---

## 5. Diseño y Estilos

El proyecto usa CSS modular, con un archivo de estilos independiente para cada página. El archivo `fondo.css` define la animación visual de la pantalla de login: figuras geométricas flotantes y partículas animadas que dan profundidad al fondo. El diseño es responsive en todas las páginas, con un menú hamburguesa controlado por `navegacion.js` que se activa en pantallas pequeñas.

---

## 6. Cómo Ejecutar el Proyecto

Al ser 100% frontend no requiere instalación ni configuración. Solo hace falta abrir el archivo en el navegador:

```
Abrir html/index.html en cualquier navegador moderno (Chrome, Firefox, Edge)
```

O con un servidor local para evitar posibles restricciones del navegador:

```bash
python -m http.server 8000
# Luego visitar: http://localhost:8000/html/index.html
```

---
## 7. Funcionalidades del Sistema (Evidencia Visual)

UPN Tareas presenta una interfaz moderna con un enfoque centrado en la experiencia de usuario (UX), utilizando efectos de transparencia y un diseño responsivo.

## 8. Posibles Mejoras Futuras

- Conectar un backend real (Node.js, Flask, etc.) para persistencia multi-dispositivo y multi-navegador.
- Cifrar las contraseñas antes de guardarlas, ya que actualmente se almacenan en texto plano en localStorage.
- Implementar notificaciones del navegador (`Notification API`) para alertar sobre tareas próximas a vencer.
- Reemplazar el chat simulado por mensajería en tiempo real usando WebSockets.
- Agregar validación de formato del correo institucional UPN con expresiones regulares.