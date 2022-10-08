import { headers } from "../auth/fetchAuth.mjs";
import { profileOption } from "../helpers/constants.mjs";
import * as response from "./handlers/filterResponse.mjs";
import * as create from "./components/post.mjs";

// Profile post array
export let profilePosts = [];

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
      return;
    } else {
      createProfilePosts(data);
    }
  } catch (error) {
    // TODO user feedback and loader;
    console.log(error);
  }
}

function createProfilePosts(responseData) {
  const container = document.getElementById("profileFeed");

  const postArray = responseData.posts;
  const avatar = responseData.avatar;

  profilePosts = postArray.map((posts) => {
    // Replace "T" with ", " and remove everything after "."
    const splittedDate = posts.updated.split(".");
    const newDate = splittedDate[0];
    const dateCreated = newDate.replace("T", ", ");

    // filters bad avatar images and returns placeholder image if there is none.
    let userAvatar = response.checkAvatar(avatar);

    // wrapper for my body content
    const postsBodyContent = create.postBodyContainer();

    // Bottom link wrapper
    const bottomLinkWrapper = document.createElement("div");
    bottomLinkWrapper.className = "d-flex mt-2 justify-content-between p-0";
    // Assembling the two items in the wrapper.
    bottomLinkWrapper.append(create.viewButton(posts.id), create.editButton(posts.id));

    // Assembling post content
    postsBodyContent.append(
      create.deleteButton(posts.id),
      create.userAvatar(posts.owner, userAvatar),
      create.postInfo(posts.owner, dateCreated),
      create.postContent(posts.title, posts.body),
      bottomLinkWrapper
    );

    // wrapper for all content
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "card bg-primary border-0";

    // wrapper for post content, my header image goes outside of the body content.
    contentWrapper.append(create.postHeader(posts.media), postsBodyContent);

    // post container because otherwise my layout gets destroyed. NOTE: might find another way around this.
    const post = document.createElement("div");
    post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2";
    post.id = `${posts.id}`;

    // Appends post elements to post container.
    post.append(contentWrapper);

    // Appends the posts to the post section in the document.
    container.appendChild(post);
    return { name: posts.owner, body: posts.body, title: posts.title, element: post };
  });
}
