import { headers } from "../auth/fetchAuth.mjs";
import * as create from "./components/post.mjs";
import { errorMessage } from "../../components/error.mjs";

const container = document.getElementById("profileFeed");

export let profilePosts = [];

/**
 * This function fetches the logged inn user's profile info.
 * @param {string} url contains the url to fetch the user's profile information.
 * @returns an array of the logged inn user profile's information.
 */
export async function userPosts(url) {
  try {
    const postsData = {
      method: "GET",
      headers: headers(),
    };
    const response = await fetch(url + "?_author=true&_reactions=true&_comments=true", postsData);
    const json = await response.json();
    const data = json;

    if (data.length === 0) {
      const div = document.createElement("div");
      const paragraph = document.createElement("p");
      paragraph.textContent = "You haven't created any posts yet.";

      div.append(paragraph);

      return container.append(div);
    } else {
      createProfilePosts(data);
    }
  } catch (error) {
    const message = "Could not fetch posts, if error presist, please contact customer support";
    container.append(errorMessage(error, message));
  } finally {
    document.getElementById("loader").innerHTML = "";
  }
}

/**
 * This function display's the users post on the profile page.
 * @param {array} responseData Contains the response from the profile API fetch.
 * @returns HTML object of the posts.
 */
function createProfilePosts(responseData) {
  profilePosts = responseData.map((posts) => {
    const post = document.createElement("div");
    post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2 bg-secondary shadow-lg border";
    post.id = `${posts.id}`;

    post.append(create.postHtml(posts));

    /** appends the post to the posts section */
    container.appendChild(post);

    /** Returns variables for the search function. */
    return { name: posts.author.name, body: posts.body, title: posts.title, element: post };
  });
}
