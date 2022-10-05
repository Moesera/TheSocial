// retrieves the userInfo in local storage and parsing them to json.
export const user = JSON.parse(localStorage.getItem("user"));

/**
 * This function retrieves an item from localStorage.
 * @param {string} item Contains the key of the item you want to retrieve from localStorage.
 * @returns The item that has the value of the key.
 */
export const load = (item) => {
  return JSON.parse(localStorage.getItem(item));
};
