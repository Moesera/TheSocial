import { registerAccount } from "../services/register.mjs";

const registerForm = document.getElementById("registerForm");

/**
 * Eventlistener for submit of the register form element,
 * will create new form data to be sent with the createAccount post.
 */
export const registerUser = () => {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    registerAccount(user);
  });
};
