// retrieves the login userInfo in local storage and parsing them to json.
export const token = JSON.parse(localStorage.getItem("accessToken"));
export const name = JSON.parse(localStorage.getItem("username"));
