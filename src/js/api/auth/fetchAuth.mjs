import { load } from "../storage/user.mjs";

/**
 * This function retrieves token and assembles the header values needed for the post features.
 * @returns header values needed for PUT, POST, DELETE, GET requests.
 * @example
 * ```js
 * // retrieves token with the load() function.
 * export const headers = () => {
 * const token = load("token");
 *
 * return {
 *   "Content-Type": "application/json",
 *   Authorization: `Bearer ${token}`,
 *  };
 * };
 * // returns the header values and structure needed for requests
 * ```
 */
export const headers = () => {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
