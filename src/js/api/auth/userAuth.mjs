import { load } from "../storage/user.mjs";

/**
 * User logout function.
 * clears localStorage and triggers checkUserAuth()
 */
export const logout = () => {
  localStorage.clear();
  checkUserAuth();
};

/**
   * checks user token using the fetch token function. 
   * @returns True or false
   * @example
   * ´´´js
   * // Checks if the user has valid auth token.
   * export function checkUserAuth() {
   * if (load("token") === null) {
   *   window.location.replace("/pages/login.html");
   * } else {
   *   return;
   * }
   *}
   // returns you to login page if true and returns back if not.
   ´´´
   */
export const checkUserAuth = () => {
  if (load("token") === null) {
    window.location.replace("/pages/login.html");
  } else {
    return;
  }
};
