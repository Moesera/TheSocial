import { headers } from "../auth/fetchAuth.mjs";
import { profileOption } from "../helpers/constants.mjs";
import * as response from "./handlers/filterResponse.mjs";
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
    const response = await fetch(url + profileOption, postsData);
    const json = await response.json();
    const data = json;

    if (data._count.posts === 0) {
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
    console.log(error);
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
  const postArray = responseData.posts;
  const avatar = responseData.avatar;

  profilePosts = postArray.map((posts) => {
    /** filters bad avatar images and returns placeholder image if there is none. */
    let userAvatar = response.checkAvatar(avatar);

    const postsBodyContent = create.postBodyContainer();

    const bottomLinkWrapper = document.createElement("div");
    bottomLinkWrapper.className = "d-flex mt-2 justify-content-between p-0";

    bottomLinkWrapper.append(create.viewButton(posts.id), create.editButton(posts.id));

    /** Assembling post content */
    postsBodyContent.append(
      create.deleteButton(posts.id),
      create.userAvatar(posts.owner, userAvatar),
      create.postInfo(posts.owner, posts.updated),
      create.postContent(posts.title, posts.body),
      bottomLinkWrapper
    );

    /** wrapper for all content */
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "card bg-primary border-0";

    contentWrapper.append(create.postHeader(posts.media), postsBodyContent);

    const post = document.createElement("div");
    post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2";
    post.id = `${posts.id}`;

    post.append(contentWrapper);

    container.appendChild(post);
    return { name: posts.owner, body: posts.body, title: posts.title, element: post };
  });
}
