import { profileOption } from "../helpers/URLparams.mjs";

export async function userPosts(url) {
  try {
    const token = "Bearer " + JSON.parse(localStorage.getItem("accessToken"));
    const postsData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const response = await fetch(url + profileOption, postsData);
    const json = await response.json();
    console.log(json);
    const data = json;

    createProfilePosts(data);
  } catch (error) {
    console.log(error);
  }
}

function createProfilePosts(postArray) {
  const container = document.getElementById("profileFeed");
  let userPosts = postArray.posts;

  let userAvatar;

  if (!postArray.avatar || postArray.avatar === "string") {
    userAvatar = "/assets/images/default-imgs/avatar-placeholder.png";
  } else if (postArray.avatar === "https://img.service.com/avatar.jpg") {
    userAvatar = "/assets/images/default-imgs/avatar-placeholder.png";
  } else {
    userAvatar = postArray.avatar;
  }

  console.log(userPosts);
  userPosts.forEach((post) => {
    // Replace "T" with ", " and remove everything after "."
    const splitCode = post.created.split(".");
    const newDate = splitCode[0];
    const dateCreated = newDate.replace("T", ", ");

    let postMedia;

    // checks if the media is a string or is available if not returns empty.
    if (!post.media || post.media === "string") {
      postMedia = "";
    } else {
      postMedia = post.media;
    }

    // Post content container
    container.innerHTML += `<div class="container bg-primary p-2 box d-flex flex-wrap mt-2" id="${post.id}">
                              <div class="card bg-primary border-0">
                              <div>
                              <img class="card-img-top" src="${postMedia}">
                              </div>
                              <div class="card-body row">
                                <div class="col-1 p-0">
                                <div>
                                  <img class="w-100 rounded-circle" src="${userAvatar}" alt="${post.owner}'s profile image">
                                  </div>
                                </div>
                                <div class="d-flex flex-column align-self-center w-50 col-6">
                                  <p class="mb-0 bold-calibri">${post.owner}</p>
                                  <p class="mb-1 regular-calibri">${dateCreated}</p>
                                </div>
                                <div class="mt-4 container-md ps-0">
                                    <h2 class="fs-5 bold-calibri">${post.title}</h2>
                                    <p class="w-100 regular-calibri">${post.body}</p>
                                  </div>
                                  <div class="d-flex align-items-end justify-content-end flex-fill me-3 me-lg-5">
                                    <div class="d-flex me-4 me-lg-5 align-items-center fs-5">
                                      <i class="fa-solid fa-comment"></i>
                                      <p class="m-0 ms-2"></p>
                                    </div>
                                    <div class="d-flex align-items-center fs-5">
                                      <i class="fa-solid fa-heart"></i>
                                      <p class="m-0 ms-2"></p>
                                    </div>
                                  </div>
                                </div>
                              </div>`;
  });
}
