import { logout, checkUserAuth } from "./api/auth/userAuth.mjs";
// import { BASE_URL, postUrl, profileUrl, postsOption } from "./api/helpers/constants.mjs";
import { registerUser } from "./api/auth/register.mjs";
import { loginUser } from "./api/auth/login.mjs";

if (location.pathname !== "/pages/login.html") {
  checkUserAuth();
}

// loginUser also
if (location.pathname === "/pages/createAcc.html") {
  registerUser();
} else if (location.pathname === "/pages/login.html") {
  loginUser();
}

// LOGOUT FEATURE

// Gets logout button element by id.
if (location.pathname !== "/pages/login.html") {
  const logoutBtn = document.getElementById("logoutBtn");
  // event listener for logout button click.
  logoutBtn.addEventListener("click", logout);
}
