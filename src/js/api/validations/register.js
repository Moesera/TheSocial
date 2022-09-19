// URL import.
import { BASE_URL } from "./URLparams.mjs";

// Gets form element by id.
const registerForm = document.getElementById("registerForm");
const feedbackMsg = document.getElementById("feedback");
// event listener for the submission of the form.
registerForm.addEventListener("submit", createAccount);

/**
 * This function will send a post request to the API, creating a user.
 * @param {string} username contains the value from username input
 * @param {string} email contains the value from email input
 * @param {string} password contains the value from password input
 * @example
 * ```js
 * // Use this function to reset the form with a timeout.
 * setTimeout(function () {
 *  registerForm.reset();
 * }, 1000);
 * //Resets form inputs after 1 second.
 * ```
 */
function createAccount(event) {
  event.preventDefault();
  const form = event.target;

  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  setTimeout(function () {
    registerForm.reset();
  }, 1000);

  try {
    fetch(`${BASE_URL}api/v1/social/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
        avatar: "https://img.service.com/avatar.jpg",
        banner: "https://img.service.com/banner.jpg",
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  } catch (error) {
    json.map;
    if (json.some("message")) {
      feedbackMsg.innerHTML = `<p> ${json.message} </p>`;
      feedbackMsg.classList.add("error");
    } else {
      console.log(json.message);
    }
    console.log("error", error);
  }
}
