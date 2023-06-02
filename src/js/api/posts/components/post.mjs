import { deletePost } from "../deletePost.mjs";
import { updatePostForm } from "../handlers/update.mjs";
import * as response from "../handlers/filterResponse.mjs";
import { user } from "../../storage/user.mjs";

/**
 * This functions builds the media element for the posts
 * @param {string} postMedia Contains the post media from API.
 * @returns a constructed HTML node of the post media.
 */
export const postHeader = (postMedia) => {
  const postHeadImg = document.createElement("div");

  const headImg = document.createElement("img");
  headImg.className = "card-img-top";
  headImg.loading = "lazy";

  if(postMedia) {
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
  postInfoWrapper.className = "d-flex flex-column align-self-center w-75 col-auto";

  const authorName = document.createElement("p");
  authorName.className = "mb-0 bold-calibri fs-5";
  authorName.textContent = author;

  const postDate = document.createElement("p");
  postDate.className = "mb-1 regular-calibri";
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
  const postAvatarContainer = document.createElement("div");
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
export const postContent = (title, body) => {
  const postContentWrapper = document.createElement("div");
  postContentWrapper.className = "mt-4 container-md ps-0";

  const postTitle = document.createElement("h2");
  postTitle.className = "fs-5 bold-calibri fs-4";
  postTitle.textContent = title;

  const postBody = document.createElement("p");
  postBody.className = "w-100 regular-calibri fs-5";
  postBody.textContent = body;

  postContentWrapper.append(postTitle, postBody);

  const postContent = postContentWrapper;

  return postContent;
};

/**
 * This functions create's the reaction section of the post HTML.
 * @param {string} comments contains the comments of the post.
 * @param {string} likes Contains the likes of the post.
 * @returns a constructed HTML node of reactions.
 */
export const postReactions = (comment, likes) => {
  /** Like counter is set to one, if length does not show otherwise */
  let reactionCounter = 0;
  if (likes.length !== 0) {
    for (let y = 0; y < likes.length; y++) {
      reactionCounter += likes[y].count;
    }
  }

/** Creating comment html element */
  const reactionWrapper = document.createElement("div");
  reactionWrapper.className = "d-flex align-items-end justify-content-end flex-fill me-lg-5 p-0";

  const commentWrapper = document.createElement("div");
  commentWrapper.className = "d-flex me-4 me-lg-5 align-items-center fs-5";

  const commentIcon = document.createElement("i");
  commentIcon.className = "fa-solid fa-comment";

  const commentCount = document.createElement("p");
  commentCount.className = "m-0 ms-2";
  commentCount.textContent = comment.length;

  commentWrapper.append(commentIcon, commentCount);

  /** Creating the like html element */
  const likeWrapper = document.createElement("div");
  likeWrapper.className = "d-flex align-items-center fs-5";

  const likeIcon = document.createElement("i");
  likeIcon.className = "fa-solid fa-heart";

  const likeCounter = document.createElement("p");
  likeCounter.className = "m-0 ms-2";
  likeCounter.textContent = reactionCounter;

  likeWrapper.append(likeIcon, likeCounter);

  reactionWrapper.append(commentWrapper, likeWrapper);

  const reactionElement = reactionWrapper;

  return reactionElement;
};

/**
 * This creates the delete button element for the post
 * @param {number} id contains the id value of the post.
 * @returns a constructed HTML element of a cross icon.
 */
export const deleteButton = (id) => {
  const btnContainer = document.createElement("div");
  btnContainer.className = "d-flex justify-content-end";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-xmark fs-4";
  deleteIcon.id = id;

  deleteIcon.addEventListener("click", deletePost);

  btnContainer.appendChild(deleteIcon);

  const deleteButton = btnContainer;

  return deleteButton;
};

/**
 * This function creates the edit post text.
 * @param {number} id Contains the id of the post.
 * @returns a constructed HTML node of the edit button.
 */
export const editButton = (id) => {
  const editContainer = document.createElement("div");
  editContainer.className = "d-flex justify-content-start ps-0";

  const edit = document.createElement("p");
  edit.className = "mb-0 edit-btn";
  edit.textContent = "Edit post";
  edit.id = id;

  edit.addEventListener("click", updatePostForm);

  editContainer.appendChild(edit);

  const editBtn = editContainer;

  return editBtn;
};

/**
 * This function create the view post HTML object.
 * @param {number} id Contains the id of the selected post
 * @returns a constructed HTML node of the view post button.
 */
export const viewButton = (id) => {
  const linkWrapper = document.createElement("div");
  linkWrapper.className = "d-flex justify-content-start ps-0";

  const viewLink = document.createElement("a");
  viewLink.href = `/src/pages/post/index.html?id=${id}`;
  viewLink.className = "edit-btn mb-0 text-decoration-none";
  viewLink.textContent = "View Post";

  if (location.pathname === "/src/pages/post/index.html") {
    viewLink.textContent = "";
  }

  linkWrapper.appendChild(viewLink);

  const link = linkWrapper;
  return link;
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
  let bottomLinkWrapper = document.createElement("div");
  bottomLinkWrapper.className = "d-flex mt-2 justify-content-between p-0";

  if (post.author.name === user.name) {
    bottomLinkWrapper.append(viewButton(post.id), editButton(post.id));
    postDelete = deleteButton(post.id);
  } else {
    bottomLinkWrapper.appendChild(viewButton(post.id));
    postDelete = "";
  }

  const postsBodyContent = postBodyContainer();

  postsBodyContent.append(
    postDelete,
    userAvatar(post.author.name, avatar),
    postInfo(post.author.name, post.updated),
    postContent(post.title, post.body),
    postReactions(post.comments, post.reactions),
    bottomLinkWrapper
  );

  /** Wrapper for all content */
  const contentWrapper = document.createElement("div");
  contentWrapper.className = "card bg-primary border-0 w-100";

  contentWrapper.append(postHeader(post.media), postsBodyContent);

  const posts = contentWrapper;
  return posts;
};
