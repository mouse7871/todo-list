const HIDDEN_CLASSNAME = "hidden";

/** parameter 값 토글링 가능 */
const displayToggle = (display, hidden) => {
  //   hidden.style.display = "none";
  display.classList.remove(HIDDEN_CLASSNAME);
  hidden.classList.add(HIDDEN_CLASSNAME);
};

const setUser = () => {
  const username = sessionStorage.getItem("username");
  username
    ? displayToggle(userpage, loginpage)
    : displayToggle(loginpage, userpage);
  userpage.querySelector("#greeting .username").innerText = username;
  menupage.classList.add(HIDDEN_CLASSNAME);
  window.weatherpage.classList.add(HIDDEN_CLASSNAME);
};

const loginForm = document.getElementById("login-form");
const loginInput = document.querySelector("#login-form input");
// const loginBtn = document.querySelector("#login-form button"); // form 쓰면 button으로 이벤트 핸들링 안해도 됨
const logoutBtn = document.querySelector("#user-page button");
const menuBtn = document.querySelector("#menu");

const loginpage = document.querySelector("#login-page");
const userpage = document.querySelector("#user-page");
const menupage = document.querySelector("#menu-page");

setUser();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sessionStorage.setItem("username", loginInput.value);
  setUser();
  loginInput.value = "";
  // location.reload();
});

logoutBtn.addEventListener("click", () => {
  if (confirm("Logout?🤔")) {
    sessionStorage.clear();
    readTodoList([]);
    setUser();
    // location.reload();
  }
});

menuBtn.addEventListener("click", () => {
  menupage.classList.toggle(HIDDEN_CLASSNAME);
});

// loginBtn.addEventListener("click", () => {
//   const username = loginInput.value;
//   username
//     ? username.length < 16
//       ? alert(`Hello, ${username}!`)
//       : console.log("username is too long!")
//     : console.log("please write something!");
// });
