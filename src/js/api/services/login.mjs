import { feedbackMsg, BASE_URL, loginUrl } from "../helpers/constants.mjs";

/**
 * This function will send a post request to the API, to login an user to receive a token.
 * @param {object} user  Contains form data from the event listener.
 * @param {object} body  Converting form data to string before its inserted to the api call.
 * @returns response from the api.
 * @example
 * ´´´js
 * // This function is used to transfer the user to the profile page after successful login.
 * // Adjust parameter for time at the end of the function.
 * setTimeout(() => {
 *  window.location.replace("/pages/profile.html");
 * }, 50);
 * // Transfers to another page after 0.05 second.
 *
 * //This function is used to reset the form after faulty input, adjust parameter for time at end of function.
 * setTimeout(() => {
 *  loginForm.reset();
 * }, 50);
 * // transfers user after 0.05 seconds.
 * ´´´
 */
export async function userLogin(user) {
  const body = JSON.stringify(user);

  try {
    const res = await fetch(`${BASE_URL}${loginUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body,
    });
    const data = await res.json();

    console.log("user message:", data.user.message);
    if (!res.ok || !data.accessToken) {
      const msg =  data?.errors?.[0]?.message || data?.message || "Login failed.";

    setTimeout(() => {
      loginForm.reset();
    }, 50);
    
    throw new Error(msg);
    }
    
    localStorage.setItem("token", JSON.stringify(accessToken));
    localStorage.setItem("user", JSON.stringify(user))
    
    setTimeout(() => {
      window.location.replace("/index.html");
    }, 50);
  } catch (error) { 
    feedbackMsg.innerHTML = 
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-exclamation-triangle" viewBox="0 0 16 16">
    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
    </svg><p class="mb-0"> ${error.errors[0].message}</p>`
  };
}
