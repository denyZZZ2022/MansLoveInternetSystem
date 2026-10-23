"use strict";

// Adres API. Gdy backend jest gotowy, zmieniasz tylko tę linię.
// Do testu samego widoku (tylko odczyt listy) można użyć: "data/tasks.json"
const API_URL = "data/tasks.json";

const MAX_TITLE_LENGTH = 100; // tyle samo co VARCHAR(100) w bazie

const STATUS_LABELS = {
  new: "Nowe",
  todo: "Nowe",
  in_progress: "W trakcie",
  done: "Zakończone",
};

const form = document.getElementById("task-form");
const list = document.getElementById("task-list");
const message = document.getElementById("message");
const titleInput = form.elements.title;

// ----- Komunikaty dla użytkownika -----
function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = `message ${isError ? "message-error" : "message-success"}`;
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
      throw new Error(body.error); // 400 z backendu: tekst z pola error
    }
    if (response.status === 404) {
      throw new Error("Nie znaleziono zadania.");
    }
    console.error("Błąd serwera:", response.status);
    throw new Error(`Błąd serwera (${response.status}).`);
  }

  return response.status === 204 ? null : response.json();
}

// ----- Budowanie widoku (tylko textContent, bez innerHTML) -----
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

  const badge = document.createElement("span");
  const known = Object.hasOwn(STATUS_LABELS, task.status);
  const statusKey = task.status === "todo" ? "new" : task.status;
  badge.className = known ? `badge badge-${statusKey}` : "badge";
  badge.textContent = known ? STATUS_LABELS[task.status] : String(task.status);

  const description = document.createElement("p");
  description.className = "task-description";
  description.textContent = task.description || "Brak opisu";

  const actions = document.createElement("div");
  actions.className = "task-actions";
  if (task.status !== "done") {
    actions.append(createButton("Zakończ", "done"));
  }
  actions.append(createButton("Usuń", "delete"));

  item.append(title, badge, description);
  if (task.author) {
    const author = document.createElement("p");
    author.className = "task-author";
    author.textContent = `Autor: ${task.author}`;
    item.append(author);
  }
  item.append(actions);
  return item;
}

function showListInfo(text) {
  const item = document.createElement("li");
  item.className = "list-info";
  item.textContent = text;
  list.replaceChildren(item);
}

// ----- GET: pobranie listy -----
async function loadTasks() {
  showListInfo("Ładowanie…");
  try {
    const tasks = await request(API_URL);
    if (tasks.length === 0) {
      showListInfo("Brak zadań. Dodaj pierwsze zadanie.");
      return;
    }
    list.replaceChildren(...tasks.map(createTaskElement));
  } catch (error) {
    list.replaceChildren();
    showMessage(error.message, true);
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

titleInput.addEventListener("input", () => {
  titleInput.removeAttribute("aria-invalid");
});

// ----- POST: dodanie zadania -----
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  const problem = validateTitle(data.title);
  if (problem) {
    titleInput.setAttribute("aria-invalid", "true");
    showMessage(problem, true);
    titleInput.focus();
    return;
  }

  data.title = data.title.trim();
  data.description = data.description.trim();

  try {
    const created = await request(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    form.reset();
    showMessage(`Dodano zadanie „${created.title}”.`);
    await loadTasks();
  } catch (error) {
    showMessage(error.message, true);
  }
});

// ----- PUT i DELETE: przyciski na liście (delegacja zdarzeń) -----
list.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const id = button.closest("li").dataset.id;

  try {
    if (button.dataset.action === "done") {
      await request(`${API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "done" }),
      });
      showMessage("Zadanie oznaczono jako zakończone.");
    }
    if (button.dataset.action === "delete") {
      if (!confirm("Na pewno usunąć zadanie?")) {
        return;
      }
      await request(`${API_URL}/${id}`, { method: "DELETE" });
      showMessage("Usunięto zadanie.");
    }
    await loadTasks();
  } catch (error) {
    showMessage(error.message, true);
  }
});

loadTasks();
