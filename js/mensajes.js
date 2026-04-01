// Aqui estoy creando una lista de contactos que van a aparecer en la parte izquierda del chat
const contacts = [
  {
    id: 1, // este es un identificador unico
    name: "Ana Torres", // nombre del contacto
    color: "#FF6B6B", // color que tendra su avatar
    active: true, // si esta en linea
    lastMessage: "Hola! ¿Cómo estás?", // ultimo mensaje que aparece en la lista
  },
  {
    id: 2,
    name: "Marcos Diaz",
    color: "#4ECDC4",
    active: false,
    lastMessage: "Nos vemos manana",
  },
  {
    id: 3,
    name: "Sofia Reyes",
    color: "#95E1D3",
    active: true,
    lastMessage: "Perfecto!",
  },
  {
    id: 4,
    name: "Daniel Gomez",
    color: "#FFE66D",
    active: false,
    lastMessage: "Gracias por tu ayuda",
  },
  {
    id: 5,
    name: "Carla Paredes",
    color: "#A8E6CF",
    active: true,
    lastMessage: "Claro, cuenta conmigo",
  },
];

// Aqui guardo las conversaciones como si fuera un historial de chat
const conversations = {
  // cada numero corresponde al id del contacto
  1: [
    { text: "Hola! ¿Cómo estás?", sender: "contact", time: "10:30" }, // mensaje enviado por el contacto
    { text: "Todo bien, gracias! ¿Y tu?", sender: "user", time: "10:32" }, // mensaje enviado por el usuario
  ],
  2: [{ text: "Nos vemos manana", sender: "contact", time: "09:15" }],
  3: [{ text: "Perfecto!", sender: "contact", time: "11:45" }],
  4: [{ text: "Gracias por tu ayuda", sender: "contact", time: "14:20" }],
  5: [{ text: "Claro, cuenta conmigo", sender: "contact", time: "16:00" }],
};

// Este sera el contacto seleccionado por defecto
let selectedContact = contacts[0];
// Esta variable sirve para saber si el contacto esta escribiendo
let isTyping = false;

// Esta funcion sirve para obtener las iniciales del nombre, por ejemplo Ana Torres -> AT
function getInitials(name) {
  return name
    .split(" ") // separo por espacios
    .map((n) => n[0]) // me quedo con la primera letra de cada palabra
    .join("") // las uno sin espacio
    .toUpperCase(); // las paso a mayuscula
}

// Funcion que obtiene la hora actual
function getCurrentTime() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
}

// Aqui dibujo los contactos dentro de la lista
function renderContacts() {
  const contactsList = document.getElementById("contactsList");
  contactsList.innerHTML = ""; // limpio la lista para volver a llenarla

  contacts.forEach((contact) => {
    const contactItem = document.createElement("div");

    // si el contacto es el que esta seleccionado, se marca como activo
    contactItem.className = `contact-item ${contact.id === selectedContact.id ? "active" : ""}`;
    // cuando hago clic en el contacto, se selecciona
    contactItem.onclick = () => selectContact(contact);

    contactItem.innerHTML = `
            <div class="contact-avatar-container">
                <div class="contact-avatar" style="background-color: ${contact.color}">
                    ${getInitials(contact.name)}
                </div>
                ${contact.active ? '<div class="online-indicator"></div>' : ""}
            </div>
            <div class="contact-details">
                <h3>${contact.name}</h3>
                <p>${contact.lastMessage}</p>
            </div>
        `;

    contactsList.appendChild(contactItem);
  });
}

// Cuando selecciono un contacto, actualizo todo
function selectContact(contact) {
  selectedContact = contact;
  renderContacts(); // vuelvo a dibujar la lista
  renderConversation(); // cargo la conversacion
  updateHeader(); // actualizo el encabezado con su nombre e iniciales

  // En celulares, oculto la lista y muestro el chat
  if (window.innerWidth <= 768) {
    document.getElementById("contactsPanel").classList.add("hide-mobile");
    document.getElementById("conversationPanel").classList.add("show-mobile");
  }
}

// Actualiza la parte de arriba del chat con el nombre y avatar del contacto
function updateHeader() {
  const headerAvatar = document.getElementById("headerAvatar");
  const headerName = document.getElementById("headerName");
  const headerStatus = document.getElementById("headerStatus");

  headerAvatar.style.backgroundColor = selectedContact.color;
  headerAvatar.textContent = getInitials(selectedContact.name);
  headerName.textContent = selectedContact.name;
  headerStatus.textContent = selectedContact.active ? "En linea" : "";
  headerStatus.style.display = selectedContact.active ? "block" : "none";
}

// Esta parte dibuja los mensajes de la conversacion
function renderConversation() {
  const messagesArea = document.getElementById("messagesArea");
  messagesArea.innerHTML = ""; // limpio los mensajes

  const messages = conversations[selectedContact.id] || [];

  messages.forEach((msg) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${msg.sender}`; // puede ser user o contact

    messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            </div>
        `;

    messagesArea.appendChild(messageDiv);
  });

  // Si esta escribiendo el contacto, muestro el indicador de "..." 
  if (isTyping) {
    showTypingIndicator();
  }

  scrollToBottom(); // bajo automaticamente al final
}

// Aqui creo las bolitas de "escribiendo..."
function showTypingIndicator() {
  const messagesArea = document.getElementById("messagesArea");
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.id = "typingIndicator";
  typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
  messagesArea.appendChild(typingDiv);
  scrollToBottom();
}

// Elimino el indicador de escritura
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typingIndicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Enviar mensaje
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  // si el mensaje esta vacio no hago nada
  if (text === "") return;

  const newMessage = {
    text: text,
    sender: "user", // lo mando yo
    time: getCurrentTime(),
  };

  // Si no existe aun chat con ese contacto, lo creo
  if (!conversations[selectedContact.id]) {
    conversations[selectedContact.id] = [];
  }

  // agrego el mensaje al historial
  conversations[selectedContact.id].push(newMessage);
  input.value = ""; // limpio el input
  renderConversation(); // actualizo la pantalla

  // Simulo que el contacto esta escribiendo
  isTyping = true;
  showTypingIndicator();

  // despues de 1.5 segundos, el contacto responde
  setTimeout(() => {
    isTyping = false;
    removeTypingIndicator();

    const autoReply = {
      text: "Entendido! Gracias por tu mensaje.",
      sender: "contact",
      time: getCurrentTime(),
    };

    conversations[selectedContact.id].push(autoReply);
    renderConversation();
  }, 1500);
}

// Bajo el scroll hacia el ultimo mensaje
function scrollToBottom() {
  const messagesArea = document.getElementById("messagesArea");
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Para volver a la lista de chats en celulares
function backToContacts() {
  document.getElementById("contactsPanel").classList.remove("hide-mobile");
  document.getElementById("conversationPanel").classList.remove("show-mobile");
}

// Aqui agrego los eventos de clic y enter
document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
document.getElementById("backButton").addEventListener("click", backToContacts);

// Inicializo todo apenas carga la pagina
renderContacts();
updateHeader();
renderConversation();
