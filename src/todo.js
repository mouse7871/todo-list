const todos = document.querySelector("ul#todo-list");

const CHECKED_CLASSNAME = "checked";

const makeTodo = (text, id = Date.now(), done = false) => {
  return { id, text, done };
};
const getTodo = () => {
  const todoList = sessionStorage.getItem("todoList");
  return JSON.parse(todoList) ?? [];
};
const doneTodo = (input, checked) => {
  checked
    ? input.classList.add(CHECKED_CLASSNAME)
    : input.classList.remove(CHECKED_CLASSNAME);
};

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");

const createTodoList = (newTodo, i) => {
  const todoList = getTodo();
  i ? (todoList[i] = newTodo) : todoList.push(newTodo);
  sessionStorage.setItem("todoList", JSON.stringify(todoList));
};
const readTodoList = (todoList) => {
  todos.innerHTML = "";
  todoList.length > 0
    ? todoList.map((todo, i) => {
        const li = document.createElement("li");
        li.id = todo.id;
        li.innerHTML = `
            <input id="todo-check" type="checkbox" name=${i} 
                ${todo.done ? "checked" : null} />
            <form><input id="todo-box" class=${todo.done ? "checked" : null} 
                type="text" value=${todo.text} name=${i} /></form>
            <i class="fa-solid fa-xmark"></i>`;
        const checkbox = li.querySelector("#todo-check");
        checkbox.addEventListener("change", (e) => {
          const input = e.target.parentElement.querySelector("form input");
          const done = e.target.checked;
          input.readOnly = done;
          doneTodo(input, done);
          updateTodoList(e);
        });
        li.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          updateTodoList(e);
          li.querySelector("form input").blur();
        });
        li.querySelector(".fa-xmark").addEventListener("click", deleteTodoList);
        todos.appendChild(li);
      })
    : null;
};
const updateTodoList = (e) => {
  const li = e.target.parentElement;
  const checkbox = li.querySelector("#todo-check");
  const input = li.querySelector("form input");
  const done = e.target.checked ?? checkbox.checked;
  createTodoList(makeTodo(input.value, li.id, done), checkbox.name);
};
const deleteTodoList = (e) => {
  const li = e.target.parentElement;
  const todoList = getTodo().filter((todo) => todo.id !== li.id);
  sessionStorage.setItem("todoList", JSON.stringify(todoList));
  li.remove();
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todoInput.value
    ? createTodoList(makeTodo(todoInput.value))
    : alert("Please write your todo thing!😙");
  todoInput.value = "";
  readTodoList(getTodo());
});

readTodoList(getTodo());
