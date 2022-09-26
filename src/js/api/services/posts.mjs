// IMPORTS
import { checkUserAuth } from "../routes/authentication.mjs";
import { BASE_URL, postUrl } from "../helpers/URLparams.mjs";

// CREATE POST FEATURE

export function createPostFetch(event) {
  event.preventDefault();

  const form = event.target;

  try {
    const token = "Bearer " + JSON.parse(localStorage.getItem("accessToken"));
    fetch(BASE_URL + postUrl, {
      method: "POST",
      body: JSON.stringify({
        title: form.postTitle.value,
        body: form.createTextarea.value,
        media: form.imageInput.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  } catch (error) {
    console.log(error);
  }
}

// DISPLAY POST FEATURE

/**
 * This function gets all posts to display on homepage.
 * @param {string} url contains the string combination to retrieve posts.
 */
export async function fetchPosts(url) {
  /**
   * imported feature, checks if the user has valid access token or not.
   */
  checkUserAuth();

  try {
    const token = "Bearer " + JSON.parse(localStorage.getItem("accessToken"));
    const postsData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };

    const response = await fetch(url, postsData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    // const data = json;

    /**
     * Creates posts on the post page.
     */
    createPosts(json);
  } catch (error) {
    console.log(error);
  }
}

/**
 * This functions displays the response from the API.
 * @param {array} postArray response from the array comes trough here.
 */
function createPosts(postArray) {
  // container for posts.
  const container = document.getElementById("postsContainer");

  postArray.forEach((post) => {
    // Replace "T" with ", " and remove everything after "."
    const splitCode = post.created.split(".");
    const newDate = splitCode[0];
    const dateCreated = newDate.replace("T", ", ");

    // Checks if the user has profile image or not. Should maybe be more directed to an regex combination?..
    let userAvatar;

    if (!post.author.avatar || post.author.avatar === "string") {
      userAvatar = "/assets/images/default-imgs/avatar-placeholder.png";
    } else if (post.author.avatar === "https://img.service.com/avatar.jpg") {
      userAvatar = "/assets/images/default-imgs/avatar-placeholder.png";
    } else {
      userAvatar = post.author.avatar;
    }

    // This checks if the post has image if not it should not show it, There is still posts that show, maybe use regex here ?
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
                                    <img class="w-100 rounded-circle" src="${userAvatar}" alt="${post.author.name}'s profile image">
                                    </div> 
                                  </div>  
                                  <div class="d-flex flex-column align-self-center w-50 col-6">
                                    <p class="mb-0 bold-calibri">${post.author.name}</p>
                                    <p class="mb-1 regular-calibri">${dateCreated}</p>
                                  </div>
                                  <div class="mt-4 container-md ps-0">
                                      <h2 class="fs-5 bold-calibri">${post.title}</h2>
                                      <p class="w-100 regular-calibri">${post.body}</p>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-end flex-fill me-3 me-lg-5">
                                      <div class="d-flex me-4 me-lg-5 align-items-center fs-5">
                                        <i class="fa-solid fa-comment"></i>
                                        <p class="m-0 ms-2">${post._count.comments}</p>
                                      </div>
                                      <div class="d-flex align-items-center fs-5">
                                        <i class="fa-solid fa-heart"></i>
                                        <p class="m-0 ms-2">${post._count.reactions}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>`;
  });
}
