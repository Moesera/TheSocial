import { posts } from "../../postsFeed.mjs";
import { profilePosts } from "../../profilePosts.mjs";

export const search = document.getElementById("searchInput");

/**
 * This function gets the value from the search input on home page,
 * then checks if the values that is retrieved from the .map return
 * starts with the search value.
 * @param {string} searchValue Contains value from search input.
 * @param {array} posts Contains the .map return from the display posts function.
 * @returns Toggles display none if return is false.
 */
export const searchPosts = (searchValue) => {
  posts.forEach((post) => {
    const isVisible = post.name.toLowerCase().startsWith(searchValue) || post.title.toLowerCase().startsWith(searchValue) || post.body.toLowerCase().includes(searchValue);
    post.element.classList.toggle("d-none", !isVisible);
  });
};

/**
 * This function gets the value from the search input on profile page,
 * then checks if the values that is retrieved from the .map return
 * starts with the search value.
 * @param {string} searchValue Contains the value of search input.
 * @param {array} profilePosts Contains the .map return from the display posts function.
 * @returns Toggles display none if return is false.
 */
export const searchProfilePosts = (searchValue) => {
  profilePosts.forEach((post) => {
    const isVisible = post.name.toLowerCase().startsWith(searchValue) || post.title.toLowerCase().startsWith(searchValue) || post.body.toLowerCase().includes(searchValue);
    post.element.classList.toggle("d-none", !isVisible);
  });
};
