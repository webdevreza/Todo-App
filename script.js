// finding elements
const card = document.querySelector(".card");
const form = document.querySelector("form");
const input = form.querySelector("input");
const submitBtn = form.querySelector(".submit-btn");
const ulLists = document.querySelector("#lists");
const message = document.querySelector("#message");

//Show message
const showMessage = (text, status) => {
  message.textContent = `${text}`;
  message.classList.add(`bg-${status}`);
  setTimeout(() => {
    message.textContent = ``;
    message.classList.remove(`bg-${status}`);
  }, 500);
};

// create todo
const createTodo = (todoID, todoText) => {
  // adding in li
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.id = todoID;
  listItem.innerHTML = `
  <span>${todoText}</span>
  <span>
    <button id="delete-btn"><i class="fa fa-trash"></i></button>
  </span>`;
  ulLists.appendChild(listItem);
  // make input field empty
  input.value = "";
  // Delete Button
  const deleteBtn = listItem.querySelector("#delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
};

// Add new todo
const newTodo = () => {
  // Todo text
  let todoText = input.value;
  // unique ID generation
  const listItemID = Date.now().toString();

  createTodo(listItemID, todoText);
  // creating message
  showMessage("Todo is created", "success");
  // Store Todos as Object - Array
  const creatingTodos = getTodoFromLocalStorage();
  creatingTodos.push({ listItemID, todoText });
  localStorage.setItem("myTodos", JSON.stringify(creatingTodos));
};
const getTodoFromLocalStorage = () => {
  return localStorage.getItem("myTodos")
    ? JSON.parse(localStorage.getItem("myTodos"))
    : [];
};
//Delete
const deleteItem = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  ulLists.removeChild(selectedTodo);

  // Deleting message
  showMessage("Todo is deleted", "danger");

  // Deleting todos from Local storage
  let todos = getTodoFromLocalStorage();
  todos = todos.filter((res) => res.listItemID !== selectedTodo.id);
  localStorage.setItem("myTodos", JSON.stringify(todos));
};
const loadTodos = () => {
  const todos = getTodoFromLocalStorage();
  todos.map((res) => createTodo(res.listItemID, res.todoText));
};
// adding listeners
form.addEventListener("submit", newTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
