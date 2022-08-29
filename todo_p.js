const todoForm = document.querySelector("#todoform");
const todoInput = document.querySelector("#todoform input")
const todoList = document.querySelector("#todolist");

let todos = [];
const TODOS_KEY = "todos";

function saveTodo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo (event) {
    const li = event.target.parentElement
    li.remove();
}

function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    li.appendChild(span);
    todoList.appendChild(li);

    const button = document.createElement("button");
    button.innerText = "X";
    li.appendChild(button);
    button.addEventListener("click", deleteTodo);
}

function todoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";

    const newTodoObject = {
        text: newTodo,
        id: Date.now(),
    };

    todos.push(newTodoObject);
    paintTodo(newTodoObject);

    saveTodo();
}

todoForm.addEventListener("submit", todoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}