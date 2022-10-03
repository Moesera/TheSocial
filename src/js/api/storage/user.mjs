// retrieves the userInfo in local storage and parsing them to json.
export const user = JSON.parse(localStorage.getItem("user"));

export const load = (item) => {
  return JSON.parse(localStorage.getItem(item));
};
