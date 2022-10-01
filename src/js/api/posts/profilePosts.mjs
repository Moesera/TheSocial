import { profileOption } from "../helpers/constants.mjs";
import { accessToken } from "../storage/user.mjs";

export async function userPosts(url) {
  try {
    const token = "Bearer " + accessToken;
    const postsData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const response = await fetch(url + profileOption, postsData);
    const json = await response.json();
    const data = json;
    console.log(data);

    if (data.posts.length === 0) {
      return;
    } else {
      createProfilePosts(data.posts);
    }
  } catch (error) {
    console.log(error);
  }
}

function createProfilePosts(postArray) {
  const container = document.getElementById("profileFeed");

  postArray.array.forEach((posts) => {
    // Replace "T" with ", " and remove everything after "."
    const splittedDate = posts.created.split(".");
    const newDate = splittedDate[0];
    const dateCreated = newDate.replace("T", ", ");

    // filters bad avatar images and returns placeholder image if there is none.
    let userAvatar = response.checkAvatar(posts.author.avatar);

    // Filters bad media.
    let postMedia = response.checkMedia(posts.media);

    // wrapper for my body content
    const postsBodyContent = create.postWrapper();

    // Assembling post content
    postsBodyContent.append(create.userAvatar(posts.author.name, userAvatar), create.postInfo(posts.author.name, dateCreated), create.postContent(posts.title, userPosts.body), create.postReactions(posts._count.comments, posts._count.reactions));

    // wrapper for all content
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "card bg-primary border-0";

    // wrapper for post content, my header image goes outside of the body content.
    contentWrapper.append(create.postHeader(postMedia), postsBodyContent);

    // post container because otherwise my layout gets destroyed. NOTE: might find another way around this.
    const post = document.createElement("div");
    post.className = "container bg-primary p-2 box d-flex flex-wrap mt-2";
    post.id = `${userPosts.id}`;

    // Appends post elements to post container.
    post.append(contentWrapper);

    // Appends the posts to the post section in the document.
    container.appendChild(post);
  });
}
