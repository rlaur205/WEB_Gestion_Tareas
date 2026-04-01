let tasks = [];
let editingTaskId = null;
let currentFilter = "all";

// cuando la pagina carga, quiero que se preparen varias cosas importantes
window.onload = function () {
    loadTasks(); // aqui leo las tareas guardadas del navegador
    setMinDate(); // pongo la fecha minima para evitar fechas pasadas
    renderTasks(); // muestro las tareas en pantalla
    updateStats(); // actualizo los numeritos de estadisticas
    checkReminders(); // reviso si hay tareas que estan por vencer
};

function setMinDate() {
    // aqui consigo la fecha de hoy y la uso para que el usuario no pueda elegir fechas ya pasadas
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("taskDate").min = today;
}

function loadTasks() {
    // intento conseguir las tareas que guardo el usuario anteriormente
    const savedTasks = localStorage.getItem("academicTasks");

    if (savedTasks) {
        // si habia tareas guardadas, las convierto de texto a objetos
        tasks = JSON.parse(savedTasks);
    } else {
        // si no habia nada guardado, coloco unas tareas de ejemplo
        tasks = [
            {
                id: Date.now(),
                title: "Investigar tema de la tarea",
                description: "Revisar antecedentes y base teorica del proyecto",
                course: "IHC",
                date: "2025-11-10",
                priority: "high",
                completed: true,
            },
            {
                id: Date.now() + 1,
                title: "Trabajar en la presentacion",
                description: "Crear slides y preparar demo del sistema",
                course: "IHC",
                date: "2025-11-15",
                priority: "high",
                completed: false,
            },
            {
                id: Date.now() + 2,
                title: "Reunion de grupo",
                description: "Coordinar avances y distribuir tareas",
                course: "IHC",
                date: "2025-11-08",
                priority: "medium",
                completed: false,
            },
            {
                id: Date.now() + 3,
                title: "Enviar tarea",
                description: "Subir documentacion final al campus virtual",
                course: "IHC",
                date: "2025-11-20",
                priority: "high",
                completed: false,
            },
        ];
        saveTasks(); // guardo estas tareas de ejemplo en el navegador
    }
}

function saveTasks() {
    // convierto las tareas a texto y las guardo en localStorage
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

function renderTasks() {
    // esta funcion dibuja visualmente todas las tareas
    const tasksList = document.getElementById("tasksList");
    let filteredTasks = tasks;

    // aqui leo lo que el usuario escribio en el buscador
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    if (searchTerm) {
        // filtro las tareas que coincidan con el texto buscado
        filteredTasks = filteredTasks.filter(
            (task) =>
                task.title.toLowerCase().includes(searchTerm) ||
                task.course.toLowerCase().includes(searchTerm) ||
                (task.description &&
                    task.description.toLowerCase().includes(searchTerm))
        );
    }

    // aplico filtros segun el estado que el usuario selecciono
    if (currentFilter === "pending") {
        filteredTasks = filteredTasks.filter((task) => !task.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (currentFilter === "high") {
        filteredTasks = filteredTasks.filter((task) => task.priority === "high");
    }

    // si no hay tareas para mostrar, muestro un mensaje
    if (filteredTasks.length === 0) {
        tasksList.innerHTML =
            '<div class="empty-state">No se encontraron tareas</div>';
        return;
    }

    // aqui construyo todo el HTML de las tareas
    tasksList.innerHTML = filteredTasks
        .map(
            (task) => `
        <div class="task-item">
            <div class="checkbox ${task.completed ? "checked" : ""}"
                onclick="toggleTask(${task.id})"></div>
            <div class="task-content">
                <div class="task-header">
                    <div style="flex: 1;">
                        <div class="task-title ${task.completed ? "completed" : ""}">
                            ${task.title}
                        </div>
                        ${task.description
                    ? `<div class="task-description">${task.description}</div>`
                    : ""
                }
                        <div class="task-meta">
                            <span class="task-date">${formatDate(task.date)}</span>
                            <span class="task-course">${task.course}</span>
                            <span class="task-priority priority-${task.priority}">
                                ${task.priority === "high"
                    ? "Alta"
                    : task.priority === "medium"
                        ? "Media"
                        : "Baja"
                }
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn-icon" onclick="editTask(${task.id})" title="Editar">✏️</button>
                        <button class="btn-icon" onclick="deleteTask(${task.id})" title="Eliminar">🗑️</button>
                    </div>
                </div>
            </div>
        </div>`
        )
        .join("");
}

function formatDate(dateString) {
    // esta funcion convierte la fecha de formato tecnico a algo legible
    const date = new Date(dateString + "T00:00:00");
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
}

function toggleTask(id) {
    // aqui cambio el estado de una tarea: completada <-> pendiente
    const task = tasks.find((t) => t.id === id);

    if (task) {
        task.completed = !task.completed; // invierto el estado
        saveTasks();
        renderTasks();
        updateStats();
        showNotification(
            `Tarea ${task.completed ? "completada" : "marcada como pendiente"}`,
            "success"
        );
    }
}

function deleteTask(id) {
    // antes de borrar, le pregunto al usuario si esta seguro
    if (confirm("¿Estas seguro de que deseas eliminar esta tarea?")) {
        tasks = tasks.filter((t) => t.id !== id); // elimino la tarea
        saveTasks();
        renderTasks();
        updateStats();
        showNotification("Tarea eliminada correctamente", "success");
    }
}

function editTask(id) {
    // busco la tarea que se quiere editar
    const task = tasks.find((t) => t.id === id);

    if (task) {
        // aqui lleno el modal con los datos actuales de la tarea
        editingTaskId = id;
        document.getElementById("modalTitle").textContent = "Editar Tarea";
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDescription").value = task.description || "";
        document.getElementById("taskCourse").value = task.course;
        document.getElementById("taskDate").value = task.date;
        document.getElementById("taskPriority").value = task.priority;

        openModal();
    }
}

function openModal() {
    // muestro el modal de crear/editar
    document.getElementById("taskModal").classList.add("active");
}

function closeModal() {
    // cierro el modal y limpio todo
    document.getElementById("taskModal").classList.remove("active");
    document.getElementById("taskForm").reset();
    editingTaskId = null;
    document.getElementById("modalTitle").textContent = "Crear Nueva Tarea";
    setMinDate();
}

// aqui cierro el modal si el usuario hace clic afuera de la ventana
document.getElementById("taskModal").addEventListener("click", function (e) {
    if (e.target === this) {
        closeModal();
    }
});

document.getElementById("taskForm").addEventListener("submit", function (e) {
    // evito que la pagina se recargue
    e.preventDefault();

    // aqui recojo todos los datos que el usuario escribio
    const taskData = {
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDescription").value,
        course: document.getElementById("taskCourse").value,
        date: document.getElementById("taskDate").value,
        priority: document.getElementById("taskPriority").value,
        completed: false,
    };

    if (editingTaskId) {
        // si existe un ID, significa que estoy editando
        const task = tasks.find((t) => t.id === editingTaskId);
        Object.assign(task, taskData); // actualizo los datos
        showNotification("Tarea actualizada correctamente", "success");
    } else {
        // si no hay ID, estoy creando una nueva tarea
        tasks.push({
            id: Date.now(),
            ...taskData,
        });
        showNotification("Tarea creada correctamente", "success");
    }

    saveTasks();
    renderTasks();
    updateStats();
    closeModal();
});

function updateStats() {
    // calculo varias estadisticas
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;

    const today = new Date().toISOString().split("T")[0];
    const todayTasks = tasks.filter(
        (t) => t.date === today && !t.completed
    ).length;

    // muestro estas estadisticas en pantalla
    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("todayTasks").textContent = todayTasks;
}

function filterByStatus(status) {
    // aqui guardo que filtro eligio el usuario (todas, pendientes, completadas)
    currentFilter = status;

    // actualizo la apariencia de los botones de filtro
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    renderTasks();
}

function filterByPriority(priority) {
    // aqui filtro por prioridad alta
    currentFilter = priority;

    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    renderTasks();
}

function filterTasks() {
    // esta funcion solo vuelve a dibujar todo segun el texto buscado
    renderTasks();
}

function showNotification(message, type = "success") {
    // aqui muestro la notificacion flotante de arriba
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");

    notificationText.textContent = message;
    notification.className = `notification ${type} show`;

    // despues de 3 segundos la escondo
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

function checkReminders() {
    // esta funcion revisa si alguna tarea esta a punto de vencer
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach((task) => {
        if (!task.completed) {
            const taskDate = new Date(task.date + "T00:00:00");

            // calculo cuantos dias faltan
            const diffTime = taskDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // muestro recordatorios en la consola
            if (diffDays <= 2 && diffDays >= 0) {
                if (diffDays === 0) {
                    console.log(`⚠️ Recordatorio: "${task.title}" vence hoy!`);
                } else if (diffDays === 1) {
                    console.log(`⚠️ Recordatorio: "${task.title}" vence manana`);
                } else if (diffDays === 2) {
                    console.log(`⚠️ Recordatorio: "${task.title}" vence en 2 dias`);
                }
            }
        }
    });

    // quiero que esta funcion se repita cada hora
    setTimeout(checkReminders, 3600000);
}

// --- Mostrar informacion del usuario ---
window.addEventListener("DOMContentLoaded", function () {
    // aqui leo el usuario que inicio sesion
    const usuarioActual = localStorage.getItem("usuarioActual");

    // busco los elementos del HTML donde quiero poner la info
    const mensajito = document.getElementById("mensajito");
    const userInfoName = document.getElementById("user-info-name");
    const userAvatar = document.getElementById("user-avatar-initials");

    // verifico que todo exista
    if (usuarioActual && mensajito && userInfoName && userAvatar) {
        // aqui leo los datos completos del usuario desde localStorage
        const userDataString = localStorage.getItem(usuarioActual);

        if (userDataString) {
            // separo nombre y apellido
            const userDataArray = userDataString.split(",");
            const nombre = userDataArray[0];
            const apellido = userDataArray[1];
            const nombreCompleto = `${nombre} ${apellido}`;

            // saco las iniciales para mostrarlas como avatar
            const inicialNombre = nombre.charAt(0).toUpperCase();
            const inicialApellido = apellido.charAt(0).toUpperCase();
            const iniciales = `${inicialNombre}${inicialApellido}`;

            // actualizo el texto de bienvenida
            mensajito.textContent = `📚 Bienvenido, ${nombreCompleto}`;

            // muestro el correo del usuario
            userInfoName.textContent = usuarioActual;

            // y muestro las iniciales en el circulito
            userAvatar.textContent = iniciales;
        } else {
            // si por algun motivo no encuentro los datos, muestro el correo
            console.error(
                "Error: No se encontraron datos para el usuario " + usuarioActual
            );
            mensajito.textContent = `📚 Bienvenido, ${usuarioActual.split("@")[0]}`;
            userInfoName.textContent = usuarioActual;
        }
    } else {
        // si no encontro usuario registrado, lo mando al login
        window.location.href = "index.html";
    }
});

window.addEventListener('scroll', function () {
    // esto solo cambia el estilo del navbar cuando haces scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
