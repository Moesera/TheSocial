import { createPostFormData, createPostForm } from "../posts/handlers/create.mjs";
import { user } from "../storage/user.mjs";
import { searchPosts, searchProfilePosts, search } from "../posts/components/functions/search.mjs";
import { BASE_URL, postUrl, profileUrl, postsOption } from "../helpers/constants.mjs";
import { userPosts } from "../posts/profilePosts.mjs";
import { getUser } from "../profile/index.mjs";
import { fetchPosts, createPosts, container } from "../posts/postsFeed.mjs";
import * as sort from "../posts/components/functions/sort.mjs";

/**
 * This function checks witch page it is on
 * and then runs fetches and adds event listeners accordingly.
 */
export const checkPage = () => {
  /** RUNS ON PROFILE */
  if (location.pathname === "/src/pages/profile/") {

    /** Fetches user information */
    getUser();

    /** Fetches Profile Posts */
    userPosts(`${BASE_URL}${profileUrl}/${user.name}/posts`);

    createPostForm.addEventListener("submit", createPostFormData);

    /**  Profile search functionality event listener. */
    search.addEventListener("input", (e) => {
      let inputValue = e.currentTarget.value.toLowerCase();

      searchProfilePosts(inputValue);
    });

    /** RUNS ON HOMEPAGE. */
  } else if (location.pathname === "/") {
    fetchPosts(BASE_URL + postUrl + postsOption);

    createPostForm.addEventListener("submit", createPostFormData);

    /** Homepage search functionality event listener. */
    search.addEventListener("input", (e) => {
      let inputValue = e.currentTarget.value.toLowerCase();

      searchPosts(inputValue);
    });

    /** Sort functionality event listener */
    sort.filterContainer.addEventListener("change", (event) => {
      const thisValue = event.target.value;

      switch (thisValue) {
        case "newFirst": {
          container.innerHTML = "";
          createPosts(sort.newSort());
          break;
        }
        case "title-az": {
          container.innerHTML = "";
          createPosts(sort.titleAzSort());
          break;
        }
        case "title-za": {
          container.innerHTML = "";
          createPosts(sort.titleZaSort());
          break;
        }
      }
    });

    /** RUNS ON SPECIFIC POST PAGE */
  } else if (location.pathname === "/src/pages/post/") {
    /** retrieves the id from the url */
    const url = new URL(location.href);
    const postId = url.searchParams.get("id");

    fetchPosts(`${BASE_URL}${postUrl}${postId}${postsOption}`);

    /** Event listeners for go to previous page button. */
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
