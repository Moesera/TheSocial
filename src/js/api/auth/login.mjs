import { userLogin } from "../services/login.mjs";

const loginForm = document.getElementById("loginForm");

/**
 * Eventlistener for the submit login form element.
 * Will create new formData and retrieve the values and pass it on to the login post.
 */
export const loginUser = () => {
  // event listener for the submission of the form.
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    userLogin(user);
  });
};
