import { logout, logoutBtn, checkUserAuth } from "./api/auth/userAuth.mjs";
import { BASE_URL, postUrl, profileUrl, postsOption } from "./api/helpers/constants.mjs";
import { userPosts } from "./api/posts/profilePosts.mjs";
import { fetchPosts } from "./api/posts/postsFeed.mjs";
import { registerUser } from "./api/auth/register.mjs";
import { loginUser } from "./api/auth/login.mjs";
import { createPostFormData, createPostForm } from "./api/posts/handlers/create.mjs";
import { user } from "./api/storage/user.mjs";
import { searchPosts, searchProfilePosts, search } from "./api/posts/components/functions/search.mjs";

// checks if user has token, if not is sent to login page.
// also does not append listener for create post and logout button.
if (location.pathname !== "/src/pages/login/index.html" && location.pathname !== "/src/pages/register/index.html") {
  checkUserAuth();

  // event listener for logout button click.
  logoutBtn.addEventListener("click", logout);
}

// checks if you are on register page or login page,and adds event listener.
if (location.pathname === "/src/pages/register/index.html") {
  registerUser();
} else if (location.pathname === "/src/pages/login/index.html") {
  loginUser();
}

// TODO MAKE A CHECK PAGE FUNCTION TO GET RID OF ALL THE IF STATEMENTS -----

// checks witch page you are on and fetches posts accordingly
if (location.pathname === "/src/pages/profile/index.html") {
  // Profile Posts
  userPosts(`${BASE_URL}${profileUrl}/${user.name}`);

  // Event listener for create form post.
  createPostForm.addEventListener("submit", createPostFormData);

  // Profile search functionality.
  search.addEventListener("input", (e) => {
    let inputValue = e.currentTarget.value.toLowerCase();

    searchProfilePosts(inputValue);
  });
} else if (location.pathname === "/index.html") {
  // Homepage posts.
  fetchPosts(BASE_URL + postUrl + postsOption);

  // Event listener for create form post.
  createPostForm.addEventListener("submit", createPostFormData);

  // Homepage search functionality.
  search.addEventListener("input", (e) => {
    let inputValue = e.currentTarget.value.toLowerCase();

    searchPosts(inputValue);
  });
} else if (location.pathname === "/src/pages/post/index.html") {
  const url = new URL(location.href);
  const postId = url.searchParams.get("id");

  fetchPosts(`${BASE_URL}${postUrl}${postId}${postsOption}`);

  // Event listeners for back button
  const pageBack = document.getElementById("backArrow");

  pageBack.addEventListener("mouseover", () => {
    pageBack.classList.toggle("text-black");
    pageBack.style.cursor = "pointer";
  });

  pageBack.addEventListener("click", () => {
    history.back();
  });

  pageBack.addEventListener("mouseout", () => {
    pageBack.classList.toggle("text-black");
  });
}

// <------------------------------
