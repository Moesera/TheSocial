import { deletePost } from "../deletePost.mjs";
import { updatePostForm } from "../handlers/update.mjs";
import * as response from "../handlers/filterResponse.mjs";
import { user } from "../../storage/user.mjs";

/**
 * This functions builds the media element for the posts
 * @param {string} postMedia Contains the post media from API.
 * @returns a constructed HTML node of the post media.
 */
export const postHeaderImage = (postMedia) => {
  const postHeadImg = document.createElement("div");

  const headImg = document.createElement("img");
  headImg.className = "card-img-top";
  headImg.loading = "lazy";

  if (postMedia) {
    headImg.src = postMedia;
  } else {
    headImg.src = "";
  }

  postHeadImg.appendChild(headImg);

  const postHead = postHeadImg;

  return postHead;
};

/**
 * Creates the post body container.
 * @returns a div element.
 */
export const postBodyContainer = () => {
  const postsBodyContent = document.createElement("div");
  postsBodyContent.className = "card-body row pb-0";

  return postsBodyContent;
};

/**
 * This function create's post information HTML elements.
 * @param {string} author Contains the author of the post
 * @param {string} dateCreated Contains the date of the post
 * @returns a constructed HTML node of the post information.
 */
export const postInfo = (author, date) => {
  /** divide's time and date, to a new format */
  const splittedDate = date.split(".");
  const newDate = splittedDate[0];
  const dateUpdated = newDate.replace("T", ", ");

  const postInfoWrapper = document.createElement("div");
  postInfoWrapper.className = "d-flex flex-column align-self-center p-0 w-100 ps-2 gap-1";

  const authorName = document.createElement("p");
  authorName.className = "mb-0 bold-calibri fw-semibold fs-5  rounded-1 fs-6 card-text";
  authorName.textContent = author;

  const postDate = document.createElement("p");
  postDate.className = "m-0 regular-calibri bg-secondary rounded-1 p-1 fst-italic fs-6 card-text";
  postDate.textContent = dateUpdated;

  postInfoWrapper.append(authorName, postDate);
  let postInfo = postInfoWrapper;

  return postInfo;
};

/**
 * This function creates the user avatar HTML elements.
 * @param {string} author Contains the author of the post.
 * @param {string} userAvatar Contains the avatar of the user.
 * @returns a constructed HTML element of the user avatar.
 */
export const userAvatar = (author, userAvatar) => {
  const postAvatarContainer = document.createElement("section");
  postAvatarContainer.className = "col-1 p-0 avatar-size";

  const avatar = document.createElement("img");
  avatar.className = "rounded-circle w-100 h-100 object-fit-cover";
  avatar.src = userAvatar;
  avatar.alt = `${author}'s avatar`;

  postAvatarContainer.appendChild(avatar);

  const postAvatar = postAvatarContainer;
  return postAvatar;
};

/**
 * This function creates the body content HTML elements of the post.
 * @param {string} title Contains the title of the post.
 * @param {string} body Contains the body of the post.
 * @returns a constructed HTML node of the post body content.
 */
export const postContent = (title, body, id, author) => {
  const postContentWrapper = document.createElement("section");
  postContentWrapper.className = "mt-4 container-md px-0";

  const postTitle = document.createElement("h2");
  postTitle.className = "fs-6 bold-calibri fs-4 card-text mb-2";
  postTitle.textContent = title;
  postTitle.id = "editTitle";

  const postBody = document.createElement("p");
  postBody.id = "editBody";

  if (body) {
    postBody.className = "w-100 regular-calibri fs-6 bg-secondary p-1 mb-0 rounded-1 card-text d-flex justify-content-between align-items-end editableContext";
    postBody.textContent = `${body}`;
  }

  postContentWrapper.append(postTitle, postBody);

  return postContentWrapper;
};

/**
 * This functions create's the reaction section of the post HTML.
 * @param {string} comments contains the comments of the post.
 * @param {string} likes Contains the likes of the post.
 * @returns a constructed HTML node of reactions.
 */
export const postComments = (comment, id) => {
  const commentWrapper = document.createElement("a");
  commentWrapper.href = `/src/pages/post/index.html?id=${id}`;
  commentWrapper.className = "d-flex me-4 me-lg-5 align-items-center fs-6 text-decoration-none";

  const commentIcon = document.createElement("i");
  commentIcon.className = "fa-solid fa-comment";

  const commentCount = document.createElement("p");
  commentCount.className = "m-0 ms-2 text-white";
  commentCount.textContent = comment.length;

  commentWrapper.append(commentIcon, commentCount);

  return commentWrapper;
};

export const postReactions = (likes) => {
  /** Like counter is set to one, if length does not show otherwise */
  let reactionCounter = 0;
  if (likes.length !== 0) {
    for (let y = 0; y < likes.length; y++) {
      reactionCounter += likes[y].count;
    }
  }

  /** Creating the like html element */
  const likeWrapper = document.createElement("div");
  likeWrapper.className = "d-flex align-items-center fs-6 ";

  const likeIcon = document.createElement("i");
  likeIcon.className = "fa-solid fa-heart";

  const likeCounter = document.createElement("p");
  likeCounter.className = "m-0 ms-2";
  likeCounter.textContent = reactionCounter;

  likeWrapper.append(likeIcon, likeCounter);

  return likeWrapper;
};

/**
 * This creates the delete button element for the post
 * @param {number} id contains the id value of the post.
 * @returns a constructed HTML element of a cross icon.
 */
export const deleteButton = (id) => {
  const deleteContainer = document.createElement("div");
  deleteContainer.className = "d-flex justify-content-between p-0 align-items-center mb-2";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-xmark fs-5";
  deleteIcon.id = id;

  deleteIcon.addEventListener("click", deletePost);

  deleteContainer.append(editButton(id), deleteIcon);

  return deleteContainer;
};

export const editButton = (id) => {
  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.className = "fs-6 regular-calibri bg-transparent border-0";
  editButton.role = "button";
  editButton.id = id;

  editButton.addEventListener("click", (e) => {
    // current post media values.
    const postTitle = document.getElementById("editTitle");
    const postBody = document.getElementById("editBody");
    const media = e.target.closest(".card").querySelector(".card-img-top");


    if (editButton.textContent === "update") {
      const mediaInput = document.getElementById("editMedia");
      updatePostForm(e, postTitle.value, postBody.value, mediaInput.value);
    }


    const postTitleContent = document.getElementById("editTitle").textContent;
    const postInput = createInput(postTitleContent, "text");
    postInput.className = "card-text w-50 border-0 mb-1 ps-1";
    postInput.id = "editTitle"

    postTitle.replaceWith(postInput);

    const postBodyContent = document.getElementById("editBody").textContent;
    const postTextarea = createTextArea(postBodyContent);
    postTextarea.className = "w-100 ps-1";
    postTextarea.id = "editBody"

    postBody.replaceWith(postTextarea);

    if(editButton.textContent === "edit") {
      const mediaContent = media.currentSrc;
      const [postMedia, input] = createMediaInput(mediaContent);
      input.className = "w-100 mt-1 border-0 ps-1";
      input.id = "editMedia";
  
      media.replaceWith(postMedia, input);
    }

    editButton.textContent = "update";
    editButton.className = "btn btn-success fs-6 regular-calibri text-white py-1";
  });

  return editButton;
};

export const createContainer = () => {
  const container = document.createElement("div");

  return container;
};

/**
 * This functions is assembling the post HTML nodes into one node.
 * @param {object} post Contains the values from the API.
 * @returns assembled post HTML node.
 */
export const postHtml = (post) => {
  /** Filters bad avatar images and returns placeholder image if there is none. */
  let avatar = response.checkAvatar(post.author.avatar);

  /** Checks if the post belongs to the user and then adds delete and edit button. */
  let postDelete;

  /** creates a wrapper for the bottom links and checks if post belongs to user and append it to the html node.*/
  let bottomLinkWrapper = createContainer();
  bottomLinkWrapper.className = "d-flex mt-2 justify-content-between p-0";

  if (post.author.name === user.name) {
    postDelete = deleteButton(post.id);
  } else {
    postDelete = "";
  }

  const postsBodyContent = postBodyContainer();

  /** Creating comment html element */
  const reactionWrapper = createContainer();
  reactionWrapper.className = "d-flex align-items-end justify-content-end flex-fill me-lg-5 p-0 mt-2";

  reactionWrapper.append(postComments(post.comments, post.id), postReactions(post.reactions));

  const postInfoWrapper = createContainer();
  postInfoWrapper.className = "d-flex p-0 align-items-center";

  postInfoWrapper.append(userAvatar(post.author.name, avatar), postInfo(post.author.name, post.updated));

  postsBodyContent.append(postDelete, postInfoWrapper, postContent(post.title, post.body, post.id, post.author.name), reactionWrapper, bottomLinkWrapper);

  /** Wrapper for all content */
  const contentWrapper = createContainer();
  contentWrapper.className = "card bg-primary border-0 w-100 lg-w-50";

  contentWrapper.append(postHeaderImage(post.media), postsBodyContent);

  const posts = contentWrapper;
  return posts;
};

// Generic html creations 

const createInput = (content, type) => {

  const input = document.createElement("input");
  input.value = content;
  input.type = type;

  return input;
}

const createTextArea = (content) => {
  const textarea = document.createElement("textarea");

  textarea.textContent = content;
  textarea.className = "";

  return textarea;
}

const createMediaInput = (content) => {

  const img = document.createElement("img");
  img.src = content;
  img.className = "card-img-top";

  const imgInput = createInput(content, "url");
  imgInput.textContent = content;
  imgInput.className = "";

  return [img, imgInput];
}

export const deleteNode = (id) => {
  const deleteContainer = document.createElement("div");
  deleteContainer.className = "d-flex justify-content-between p-0 align-items-center mb-2";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-xmark fs-5";
  deleteIcon.id = id;

  deleteIcon.addEventListener("click", deletePost);

  deleteContainer.append(deleteIcon)

  return deleteContainer;
}