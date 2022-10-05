import { logout, checkUserAuth } from "./api/auth/userAuth.mjs";
import { BASE_URL, postUrl, profileUrl, postsOption } from "./api/helpers/constants.mjs";
import { userPosts } from "./api/posts/profilePosts.mjs";
import { fetchPosts } from "./api/posts/postsFeed.mjs";
import { registerUser } from "./api/auth/register.mjs";
import { loginUser } from "./api/auth/login.mjs";
import { user } from "./api/storage/user.mjs";
import { createPostFormData, createPostForm } from "./api/posts/handlers/create.mjs";

// checks if user has token, if not is sent to login page
if (location.pathname !== "/pages/login.html") {
  checkUserAuth();
}

// checks if you are on register page or login page,and adds event listener.
if (location.pathname === "/pages/createAcc.html") {
  registerUser();
} else if (location.pathname === "/pages/login.html") {
  loginUser();
}

// checks if you are on profile page or homepage and fetches posts accordingly
if (location.pathname === "/pages/profile.html") {
  // Profile Posts
  userPosts(`${BASE_URL}${profileUrl}/${user.name}`);
} else if (location.pathname === "/index.html") {
  //Homepage posts.
  fetchPosts(BASE_URL + postUrl + postsOption);
}

// Gets logout button element by id. This button does not exist on login page, made to exclude error
if (location.pathname !== "/pages/login.html") {
  const logoutBtn = document.getElementById("logoutBtn");
  // event listener for logout button click.
  logoutBtn.addEventListener("click", logout);

  // Event listener for create form post.
  createPostForm.addEventListener("submit", createPostFormData);
}
