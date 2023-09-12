// Imports
import { headers } from "../auth/fetchAuth.mjs";
import { checkUserAuth } from "../auth/userAuth.mjs";
import * as create from "./components/post.mjs";
import { errorMessage } from "../../components/error.mjs";
import * as comment from "./comments/index.mjs";

export const container = document.getElementById("postsContainer");

/** An array from the posts map method, used for search function. */
export let posts = [];

/** Contains the array for the sort function */
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

    console.log(json);

    // An if statement to check witch page your one to load the right function.
    if (location.pathname === "/") {
      let filterStrings = ["", "test", "New blog post title"];

      const filteredJson = json.filter((post) => {
        const bodyMatches = post.body && filterStrings.some((filterString) => !post.body.includes(filterString));
        const titleMatches = post.title && filterStrings.some((filterString) => !post.title.includes(filterString));

        return bodyMatches && titleMatches;
      });

      arrayPosts = filteredJson;
      createPosts(filteredJson);
    } else {
      createPost(json);
    }
  } catch (error) {
    const message = "Could not fetch posts, if error presist, please contact customer support";
    container.append(errorMessage(error, message));
  } finally {
    document.getElementById("loader").innerHTML = "";
  }
}

/**
 * This functions displays the response from the API on the page.
 * @param {array} postArray contains the response from the API.
 * @returns a HTML object of each array value from the API.
 */
export const createPosts = (postArray) => {
  posts = postArray.map((posts) => {
    /** Post container for each post */
    const post = document.createElement("div");
    post.className = "container bg-secondary p-1 box d-flex flex-wrap mt-2 shadow-lg border";

    post.append(create.postHtml(posts));

    /** appends the post to the posts section */
    container.appendChild(post);

    /** Returns variables for the search function. */
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
  const singlePost = document.getElementById("postContainer");

  const post = document.createElement("section");
  post.className = "editableContext container bg-primary p-2 box d-flex flex-wrap mt-2 xl-container-sm";

  const postComments = comment.comments(selectedPost.comments);
  postComments.className = "container mw-50 pt-0 px-0 d-flex flex-column gap-3 row-gap-3 my-5";

  const commentForm = comment.form();

  post.append(create.postHtml(selectedPost));
  singlePost.append(post, commentForm, postComments);
};
