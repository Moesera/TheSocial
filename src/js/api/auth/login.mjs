import { userLogin } from "../services/login.mjs";

/**
 * Eventlistener for the submit login form element.
 * Will create new formData and retrieve the values and pass it on to the login post.
 */
export const loginUser = (formSelector = "#loginForm") => {
  console.log("form listening");
  const form = document.querySelector(formSelector);
  if (!form) return

  form.classList.remove("was-validated");
  form.setAttribute("novalidate", "true");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    form.classList.add("was-validated");
    if(!form.checkValidity()) return;

    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    await userLogin(user);
  });
};
