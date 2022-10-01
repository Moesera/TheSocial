import { registerAccount } from "../services/register.mjs";

// form element id selector.
const registerForm = document.getElementById("registerForm");
/**
 *
 */
export const registerUser = () => {
  // event listener for the submission of the form.
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    registerAccount(user);
  });
};
