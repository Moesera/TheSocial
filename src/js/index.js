import { logOut } from "./api/routes/authentication.mjs";
import { BASE_URL, postUrl, profileUrl, postsOption } from "./api/helpers/URLparams.mjs";
import { userPosts } from "./api/services/profilePosts.mjs";
import { fetchPosts, createPostFetch } from "./api/services/posts.mjs";

const checkLocation = () => {
  if (window.location.pathname === "/pages/profile.html") {
    // Profile Posts
    userPosts(BASE_URL + profileUrl + JSON.parse(localStorage.getItem("username")));
  } else {
    //Homepage posts.
    fetchPosts(BASE_URL + postUrl + postsOption);
  }
};

checkLocation();

//Create post form event listener and html element by id.
const createPostForm = document.getElementById("createPost");
createPostForm.addEventListener("submit", createPostFetch);

// DELETE POST FEATURE !

// export async function deletePost() {
//   try {
//     const token = "Bearer " + JSON.parse(localStorage.getItem("accessToken"));
//     const postsData = {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${token}`,
//       },
//     };
//     const response = await fetch(BASE_URL + postUrl + "/" + 224, postsData);
//     console.log(response);
//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.log(error);
//   }
// }

// deletePost();

// LOGOUT FEATURE

// Gets logout button element by id.
const logout = document.getElementById("logoutBtn");

// Event listener for logging out.
logout.addEventListener("click", logOut);
