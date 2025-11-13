import { registerAccount } from "../services/register.mjs";

const registerForm = document.getElementById("registerForm");

/**
 * Eventlistener for submit of the register form element,
 * will create new form data to be sent with the createAccount post.
 */
export const registerUser = (registerForm = "#registerForm") => {
  const form =  document.querySelector(registerForm);
  if (!form) return

  form.classList.remove("was-validated");
  form.setAttribute("novalidate", "true");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    form.classList.add("was-validated");
    if(!form.checkValidity()) return;

    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    await registerAccount(user);
  });
};
