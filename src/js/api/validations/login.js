// Url imports
import { BASE_URL, loginUrl } from "./URLparams.mjs";
import { feedbackMsg } from "../routes/globalVariables.mjs";

// form element id selector.
const loginForm = document.getElementById("loginForm");

// event listener for the submission of the form.
loginForm.addEventListener("submit", userLogin);

/**
 * This function will send a post request to the API, to login an user to receive a token.
 * @param {string} event Contains the event from the event listener
 * @param {string} form Contains the target from the event listener
 * @param {string} email Contains the email value from the form
 * @param {string} password Contains the password value from the form
 * @returns response from the api.
 * @example
 * ´´´js
 * //  This function is used to transfer the user to the profile page after successful response from the api.
 *  setTimeout(() => {
 *   window.location.replace("/pages/profile.html");
 * }, 50);
 * // Transfers to another page after 0.05 second.
 * ´´´
 */
function userLogin(event) {
  event.preventDefault();

  const form = event.target;

  const email = form.email.value;
  const password = form.password.value;

  fetch(`${BASE_URL}${loginUrl}`, {
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
    .then((json) => {
      if (json.message) {
        feedbackMsg.classList.add("alert-danger");
        feedbackMsg.classList.add("alert");
        feedbackMsg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                 <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                                 <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                                 </svg><p class="mb-0"> ${json.message} </p>`;

        setTimeout(() => {
          loginForm.reset();
        }, 50);
      } else {
        localStorage.setItem("user", JSON.stringify(json));

        setTimeout(() => {
          window.location.replace("/pages/profile.html");
        }, 50);
      }
    })
    .catch((error) => console.log("error", error));
}
