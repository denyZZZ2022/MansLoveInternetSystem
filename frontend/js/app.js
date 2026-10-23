"use strict";

// Adres API (przykładowy serwer z Teams: node server.js, port 5000).
const API_URL = "http://localhost:5000/api/tasks";

const MAX_TITLE_LENGTH = 100; // tyle samo co VARCHAR(100) w bazie

// Kolumny tablicy: klucz = status w API
const COLUMNS = ["new", "in_progress", "done"];

const lists = {};
const counts = {};
for (const status of COLUMNS) {
  lists[status] = document.getElementById(`list-${status}`);
  counts[status] = document.getElementById(`count-${status}`);
}

const form = document.getElementById("task-form");
const message = document.getElementById("message");
const titleInput = form.elements.title;

const editDialog = document.getElementById("edit-dialog");
const editForm = document.getElementById("edit-form");
const editMessage = document.getElementById("edit-message");
const editTitleInput = editForm.elements.title;
const board = document.querySelector(".board");

let tasks = []; // ostatnio pobrana lista zadań
let editingId = null; // id zadania, które edytujemy

// ----- Komunikaty dla użytkownika -----
function showMessage(element, text, isError = false) {
  element.textContent = text;
  element.className = `message ${isError ? "message-error" : "message-success"}`;
}

// ----- Jedna funkcja do wszystkich żądań -----
async function request(url, options = {}) {
  let response;
  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (error) {
    console.error("Błąd sieci:", error); // szczegóły tylko w konsoli
    throw new Error("Brak połączenia z serwerem. Sprawdź, czy API działa.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    if (body.error) {
      throw new Error(body.error);
    }
    if (response.status === 404) {
      throw new Error("Nie znaleziono zadania.");
    }
    console.error("Błąd serwera:", response.status);
    throw new Error(`Błąd serwera (${response.status}).`);
  }

  return response.status === 204 ? null : response.json();
}

// ----- Widok: tylko textContent i createElement, bez innerHTML -----
function normalizeStatus(status) {
  if (status === "todo") {
    return "new";
  }
  return COLUMNS.includes(status) ? status : "new";
}

function createButton(label, action, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `btn ${extraClass}`.trim();
  button.dataset.action = action;
  button.textContent = label;
  return button;
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = "task";
  item.dataset.id = task.id;

  const title = document.createElement("h3");
  title.textContent = task.title;

  const description = document.createElement("p");
  description.className = "task-description";
  description.textContent = task.description || "Brak opisu";

  item.append(title, description);

  if (task.author) {
    const author = document.createElement("p");
    author.className = "task-author";
    author.textContent = `Autor: ${task.author}`;
    item.append(author);
  }

  const actions = document.createElement("div");
  actions.className = "task-actions";
  actions.append(createButton("Edytuj", "edit"), createButton("Usuń", "delete"));
  item.append(actions);
  return item;
}

function createInfoItem(text) {
  const item = document.createElement("li");
  item.className = "list-info";
  item.textContent = text;
  return item;
}

function renderBoard() {
  for (const status of COLUMNS) {
    const inColumn = tasks.filter((task) => normalizeStatus(task.status) === status);
    counts[status].textContent = inColumn.length;
    if (inColumn.length === 0) {
      lists[status].replaceChildren(createInfoItem("Brak zadań."));
    } else {
      lists[status].replaceChildren(...inColumn.map(createTaskElement));
    }
  }
}

// ----- GET: pobranie listy -----
async function loadTasks() {
  for (const status of COLUMNS) {
    lists[status].replaceChildren(createInfoItem("Ładowanie…"));
  }
  try {
    tasks = await request(API_URL);
    renderBoard();
  } catch (error) {
    tasks = [];
    for (const status of COLUMNS) {
      lists[status].replaceChildren();
      counts[status].textContent = "0";
    }
    showMessage(message, error.message, true);
  }
}

// ----- Walidacja po stronie klienta -----
function validateTitle(title) {
  if (title.trim() === "") {
    return "Tytuł jest wymagany.";
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return `Tytuł może mieć maksymalnie ${MAX_TITLE_LENGTH} znaków.`;
  }
  return "";
}

function readForm(formElement) {
  const data = Object.fromEntries(new FormData(formElement));
  data.title = data.title.trim();
  data.description = data.description.trim();
  return data;
}

for (const input of [titleInput, editTitleInput]) {
  input.addEventListener("input", () => input.removeAttribute("aria-invalid"));
}

// ----- POST: dodanie zadania -----
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = readForm(form);

  const problem = validateTitle(data.title);
  if (problem) {
    titleInput.setAttribute("aria-invalid", "true");
    showMessage(message, problem, true);
    titleInput.focus();
    return;
  }

  try {
    const created = await request(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    form.reset();
    showMessage(message, `Dodano zadanie „${created.title}”.`);
    await loadTasks();
  } catch (error) {
    showMessage(message, error.message, true);
  }
});

// ----- Edycja i usuwanie: przyciski na kartach (delegacja zdarzeń) -----
board.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const id = button.closest("li").dataset.id;

  if (button.dataset.action === "edit") {
    const task = tasks.find((item) => String(item.id) === id);
    if (!task) {
      showMessage(message, "Nie znaleziono zadania.", true);
      return;
    }
    editingId = id;
    editTitleInput.value = task.title;
    editTitleInput.removeAttribute("aria-invalid");
    editForm.elements.description.value = task.description || "";
    editForm.elements.status.value = normalizeStatus(task.status);
    editMessage.textContent = "";
    editMessage.className = "message";
    editDialog.showModal();
    editTitleInput.focus();
    return;
  }

  if (button.dataset.action === "delete") {
    if (!confirm("Na pewno usunąć zadanie?")) {
      return;
    }
    try {
      await request(`${API_URL}/${id}`, { method: "DELETE" });
      showMessage(message, "Usunięto zadanie.");
      await loadTasks();
    } catch (error) {
      showMessage(message, error.message, true);
    }
  }
});

// ----- PUT: zapis edycji (zadanie przechodzi do właściwej kolumny) -----
editForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = readForm(editForm);

  const problem = validateTitle(data.title);
  if (problem) {
    editTitleInput.setAttribute("aria-invalid", "true");
    showMessage(editMessage, problem, true);
    editTitleInput.focus();
    return;
  }

  try {
    await request(`${API_URL}/${editingId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    editDialog.close();
    showMessage(message, "Zapisano zmiany.");
    await loadTasks();
  } catch (error) {
    showMessage(editMessage, error.message, true);
  }
});

document.getElementById("edit-cancel").addEventListener("click", () => {
  editDialog.close();
});

loadTasks();
