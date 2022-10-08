import { createPostFormData, createPostForm } from "../posts/handlers/create.mjs";
import { user } from "../storage/user.mjs";
import { searchPosts, searchProfilePosts, search } from "../posts/components/functions/search.mjs";
import { BASE_URL, postUrl, profileUrl, postsOption } from "../helpers/constants.mjs";
import { userPosts } from "../posts/profilePosts.mjs";
import { fetchPosts } from "../posts/postsFeed.mjs";

/**
 * This function checks witch page it is on
 * and then runs fetches and adds event listeners accordingly.
 */
export const checkPage = () => {
  // RUNS ON PROFILE
  if (location.pathname === "/src/pages/profile/index.html") {
    // Fetches Profile Posts
    userPosts(`${BASE_URL}${profileUrl}/${user.name}`);

    // Event listener for create form post.
    createPostForm.addEventListener("submit", createPostFormData);

    // Profile search functionality.
    search.addEventListener("input", (e) => {
      let inputValue = e.currentTarget.value.toLowerCase();

      searchProfilePosts(inputValue);
    });
    // RUNS ON HOMEPAGE.
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
    // RUNS ON SPECIFIC POST PAGE
  } else if (location.pathname === "/src/pages/post/index.html") {
    // retrieves the id from the url
    const url = new URL(location.href);
    const postId = url.searchParams.get("id");

    // fetches the specific post using the ID
    fetchPosts(`${BASE_URL}${postUrl}${postId}${postsOption}`);

    // Event listeners for go to previous page button.
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
};
