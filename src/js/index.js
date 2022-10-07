import { logout, checkUserAuth } from "./api/auth/userAuth.mjs";
import { BASE_URL, postUrl, profileUrl, postsOption } from "./api/helpers/constants.mjs";
import { userPosts } from "./api/posts/profilePosts.mjs";
import { fetchPosts } from "./api/posts/posts.mjs";
import { registerUser } from "./api/auth/register.mjs";
import { loginUser } from "./api/auth/login.mjs";
import { user } from "./api/storage/user.mjs";

if (location.pathname !== "/pages/login.html") {
  checkUserAuth();
}

// loginUser also
if (location.pathname === "/pages/createAcc.html") {
  registerUser();
} else if (location.pathname === "/pages/login.html") {
  loginUser();
}

if (location.pathname === "/pages/profile.html") {
  // Profile Posts
  userPosts(BASE_URL + profileUrl + user.name);
} else if (location.pathname === "/index.html") {
  //Homepage posts.
  fetchPosts(BASE_URL + postUrl + postsOption);
}

// LOGOUT FEATURE

// Gets logout button element by id.
if (location.pathname !== "/pages/login.html") {
  const logoutBtn = document.getElementById("logoutBtn");
  // event listener for logout button click.
  logoutBtn.addEventListener("click", logout);
}
