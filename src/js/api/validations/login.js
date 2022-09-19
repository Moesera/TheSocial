// Url import
import { BASE_URL } from "./URLparams.mjs";

// Gets form element by id.
const loginForm = document.getElementById("loginForm");

// form event listener.
loginForm.addEventListener("submit", userLogin);

//User login
function userLogin(event) {
  event.preventDefault();

  setTimeout(function () {
    window.location.replace("/pages/profile.html");
  }, 1000);

  const form = event.target;

  const email = form.email.value;
  const password = form.password.value;

  fetch(`${BASE_URL}api/v1/social/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((json) => localStorage.setItem("user", JSON.stringify(json)))
    .catch((error) => console.log("error", error));
}
