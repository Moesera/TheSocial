// Imports
import { headers } from "../auth/fetchAuth.mjs";
import { checkUserAuth } from "../auth/userAuth.mjs";
import * as create from "./components/post.mjs";

// variable targeting the section id for all posts on homepage.
export const container = document.getElementById("postsContainer");

// GLOBAL VARIABLES
// An array from the posts map method, used for search function.
export let posts = [];

// Contains the array for the sort function
export let arrayPosts = [];

/**
 * This function fetches all the posts from the API.
 * @param {string} url contains the string combination to retrieve posts.
 */
export async function fetchPosts(url) {
  checkUserAuth();

  try {
    const postsData = {
      method: "GET",
      headers: headers(),
    };

    const response = await fetch(url, postsData);
    const json = await response.json();

    // An if statement to check witch page your one to load the right function.
    if (location.pathname === "/index.html") {
      arrayPosts = json;
      createPosts(json);
    } else {
      createPost(json);
    }
  } catch (error) {
    // TODO user feedback and loader;
    console.log(error);
  }
}

/**
 * This functions displays the response from the API to the page.
 * @param {array} postArray contains the response from the API.
 * @returns a HTML object of each array value from the API.
 */
export const createPosts = (postArray) => {
  posts = postArray.map((posts) => {
    // Post container because otherwise my layout gets destroyed.
    const post = document.createElement("div");
    post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2";

    // Appends post elements to post container.
    post.append(create.postHtml(posts));

    // Appends the posts to the post section in the document.
    container.appendChild(post);

    // Returns variables for the search function.
    return { name: posts.author.name, body: posts.body, title: posts.title, element: post };
  });
};

/**
 * This functions render only one post. ".map" method does not work for one post.
 * So i made one for single post.
 * @param {object} selectedPost Contains the value of the selected item by id.
 * @returns a HTML object of the API values.
 */
const createPost = (selectedPost) => {
  // Container for single postPage
  const singlePost = document.getElementById("postContainer");

  // Post container because otherwise my layout gets destroyed.
  const post = document.createElement("div");
  post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2";

  post.append(create.postHtml(selectedPost));
  // Appends the posts to the post section in the document.
  singlePost.appendChild(post);
};
