import { token } from "./user.mjs";

/**
 * User logout function.
 * clears localStorage and triggers checkUserAuth()
 */
export function logOut() {
  localStorage.clear();
  checkUserAuth();
}

/**
 * @param {object} token has the value of the userToken. 
 * @returns True or false
 * @example
 * ´´´js
 * // Checks if the user has valid auth token.
 * export function checkUserAuth() {
 * if (token === null) {
 *   window.location.replace("/pages/login.html");
 * } else {
 *   return;
 * }
 *}
 // returns you to login page if true and returns back if not.
 ´´´
 */
export function checkUserAuth() {
  if (token === null) {
    window.location.replace("/pages/login.html");
  } else {
    return;
  }
}
