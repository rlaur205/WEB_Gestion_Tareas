# 🎓 UPN Tareas — Gestión Académica Inteligente

[![JS-Vanilla](https://img.shields.io/badge/JavaScript-Vanilla-yellow?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Estructura-orange?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Diseño-blue?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-lightgrey?logo=amazondynamodb&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Plataforma web dinámica diseñada para estudiantes de la **UPN**, que permite centralizar tareas, plazos y comunicación en una interfaz moderna y 100% responsiva. 

> **Nota:** Este proyecto es puramente Frontend. Utiliza `localStorage` para la persistencia de datos, eliminando la necesidad de una base de datos externa.

---

## 🚀 Vista Previa del Proyecto

### 🔐 Acceso y Seguridad
Sistema de autenticación dual (Login/Registro) con validación de credenciales institucionales.

| Iniciar Sesión | Crear Cuenta |
| :---: | :---: |
| ![Login](img/img_inicioSession.png) | ![Registro](img/img_crearCuenta.png) |

---

### 📋 Gestión de Tareas (Core)
Módulo completo de control académico con estadísticas en tiempo real, filtros de prioridad y buscador dinámico.

![Panel General](img/img_tareas.png)

| Registro de Tarea | Notificaciones y Filtros |
| :---: | :---: |
| ![Nueva Tarea](img/img_agregarTarea.png) | ![Filtros](img/img_notificacionTarea.png) |

---

### 💬 Comunicación y Perfil
Interfaz de chat interactiva para coordinación grupal y panel de bienvenida personalizado.

| Centro de Mensajería | Dashboard de Usuario |
| :---: | :---: |
| ![Chat](img/img_mensajes.png) | ![Perfil](img/img_inicio.png) |

---

## ✨ Características Destacadas

* **CRUD de Tareas:** Crear, editar, completar y eliminar actividades con fechas límite bloqueadas para el pasado.
* **Filtros Inteligentes:** Clasificación por estado (pendiente/completada) y niveles de prioridad (Alta, Media, Baja).
* **Chat Simulado:** Interfaz de mensajería con estados "en línea" y respuestas automáticas programadas.
* **Estadísticas en Vivo:** Contador automático de tareas pendientes, completadas y vencimientos del día.
* **Diseño Responsive:** Menú hamburguesa y layouts adaptables para dispositivos móviles.

---

## 🛠️ Stack Tecnológico

* **Estructura:** HTML5 Semántico.
* **Estilos:** CSS3 (Animaciones de partículas, Flexbox y Grid).
* **Lógica:** JavaScript ES6+ (Manipulación de DOM, Eventos).
* **Almacenamiento:** API de LocalStorage del navegador.

---

## ⚙️ Cómo Ejecutar

Al ser un proyecto de tecnologías puras (Vanilla), no requiere instalaciones complejas:

1.  **Clona el repositorio:**
    `git clone https://github.com/rlaur205/WEB_Gestion_Tareas.git`
2.  **Abre el archivo principal:**
    Simplemente haz doble clic en `html/index.html` en tu navegador preferido.
3.  **Vía Servidor Local (Opcional):**
    `python -m http.server 8000` y visita `http://localhost:8000/html/index.html`
