// IMPORTS
import { checkUserAuth } from "../auth/userAuth.mjs";
import * as create from "../helpers/postsElement.mjs";
import * as storage from "../storage/user.mjs";
import * as response from "./responseFilter/filterResponse.mjs";

/**
 * This function fetches all posts from api to display on homepage.
 * @param {string} url contains the string combination to retrieve posts.
 */
export async function fetchPosts(url) {
  /**
   * imported feature, checks if the user has valid access token or not.
   */
  checkUserAuth();

  try {
    const token = "Bearer " + storage.accessToken;
    const postsData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };

    const response = await fetch(url, postsData);
    const json = await response.json();
    const data = json;
    console.log(data);
    /**
     * Creates posts on the post page.
     */
    createPosts(data);
  } catch (error) {
    console.log(error);
  }
}

/**
 * This functions displays the response from the API.
 * @param {array} postArray contains the response from the API.
 */
function createPosts(postArray) {
  // container for posts.
  const container = document.getElementById("postsContainer");

  postArray.forEach((posts) => {
    // Replace "T" with ", " and remove everything after "."
    const splittedDate = posts.created.split(".");
    const newDate = splittedDate[0];
    const dateCreated = newDate.replace("T", ", ");

    // filters bad avatar images and returns placeholder image if there is none.
    let userAvatar = response.checkAvatar(posts.author.avatar);

    // wrapper for my body content
    const postsBodyContent = create.postWrapper();

    // Assembling post content
    postsBodyContent.append(
      create.userAvatar(posts.author.name, userAvatar),
      create.postInfo(posts.author.name, dateCreated),
      create.postContent(posts.title, posts.body),
      create.postReactions(posts._count.comments, posts._count.reactions)
    );

    // wrapper for all content
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "card bg-primary border-0";

    // wrapper for post content, header image goes outside of the body content.
    contentWrapper.append(create.postHeader(posts.media), postsBodyContent);

    // post container because otherwise my layout gets destroyed. NOTE: might find another way around this.
    const post = document.createElement("div");
    post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2";
    post.id = `${posts.id}`;

    // Appends post elements to post container.
    post.append(contentWrapper);

    // Appends the posts to the post section in the document.
    container.appendChild(post);
  });
}
