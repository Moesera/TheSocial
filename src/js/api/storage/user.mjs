// retrieves the login userInfo in local storage and parsing them to json.

export const accessToken = JSON.parse(localStorage.getItem("token"));
export const user = JSON.parse(localStorage.getItem("user"));
