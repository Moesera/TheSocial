// Imports
import { headers } from "../auth/fetchAuth.mjs";
import { checkUserAuth } from "../auth/userAuth.mjs";
import * as create from "./components/post.mjs";

/**
 * This function fetches all posts from api to display on homepage.
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

    createPosts(json);
  } catch (error) {
    // TODO user feedback and loader;
    console.log(error);
  }
}

/**
 * This functions displays the response from the API.
 * @param {array} postArray contains the response from the API.
 */
function createPosts(postArray) {
  // Container for posts.
  const container = document.getElementById("postsContainer");

  postArray.forEach((posts) => {
    // TODO Create search functionality here.;

    // create a function that filters through the posts as a search functionality
    // create a onkeyup event on the search bar
    // the functionality will go trough the posts and look for posts
    // with that value in title or body.
    //
    // will this be best in posts or in the fetch, i think in the forEach posts

    // Post container because otherwise my layout gets destroyed. NOTE: might find another way around this.
    const post = document.createElement("div");
    post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2";

    // Appends post elements to post container.
    post.append(create.postHtml(posts));

    // Appends the posts to the post section in the document.
    container.appendChild(post);
  });
}
