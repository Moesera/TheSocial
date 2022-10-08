import { posts } from "../../postsFeed.mjs";
import { profilePosts } from "../../profilePosts.mjs";

// retrieves id of the search input.
export const search = document.getElementById("searchInput");

//Search functionality homepage;
/**
 *
 * @param {*} searchValue
 */
export const searchPosts = (searchValue) => {
  posts.forEach((post) => {
    const isVisible = post.name.toLowerCase().startsWith(searchValue) || post.title.toLowerCase().startsWith(searchValue) || post.body.toLowerCase().startsWith(searchValue);
    post.element.classList.toggle("d-none", !isVisible);
  });
};

//Search functionality profilePage;
/**
 *
 * @param {*} searchValue
 */
export const searchProfilePosts = (searchValue) => {
  profilePosts.forEach((post) => {
    const isVisible = post.name.toLowerCase().startsWith(searchValue) || post.title.toLowerCase().startsWith(searchValue) || post.body.toLowerCase().startsWith(searchValue);
    post.element.classList.toggle("d-none", !isVisible);
  });
};
