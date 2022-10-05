import { headers } from "../auth/fetchAuth.mjs";
import { profileOption } from "../helpers/constants.mjs";
import * as response from "./handlers/filterResponse.mjs";
import * as create from "./html/post.mjs";

export async function userPosts(url) {
  try {
    const postsData = {
      method: "GET",
      headers: headers(),
    };
    const response = await fetch(url + profileOption, postsData);
    const json = await response.json();
    const data = json;
    console.log(data);

    if (data._count.posts === 0) {
      return;
    } else {
      createProfilePosts(data);
    }
  } catch (error) {
    console.log(error);
  }
}

function createProfilePosts(responseData) {
  const container = document.getElementById("profileFeed");

  const postArray = responseData.posts;
  const avatar = responseData.avatar;

  postArray.forEach((posts) => {
    // Replace "T" with ", " and remove everything after "."
    const splittedDate = posts.updated.split(".");
    const newDate = splittedDate[0];
    const dateCreated = newDate.replace("T", ", ");

    // filters bad avatar images and returns placeholder image if there is none.
    let userAvatar = response.checkAvatar(avatar);

    // wrapper for my body content
    const postsBodyContent = create.postBodyContainer();

    // Assembling post content
    postsBodyContent.append(
      create.deleteButton(posts.id),
      create.userAvatar(posts.owner, userAvatar),
      create.postInfo(posts.owner, dateCreated),
      create.postContent(posts.title, posts.body),
      create.editButton(posts.id)
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
  });
}
