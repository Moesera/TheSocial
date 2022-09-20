import { checkUserAuth } from "./api/routes/authentication.mjs";

/**
 * imported feature, checks if the user has valid access token or not.
 */
checkUserAuth();

// Gets logout button element by id.
const logout = document.getElementById("logoutBtn");

// Event listener for logging out.
logout.addEventListener("click", logOut);

/**
 * User logout function.
 * clears localStorage and triggers checkUserAuth()
 */
function logOut() {
  localStorage.clear();
  checkUserAuth();
}
