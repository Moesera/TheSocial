import * as response from "../handlers/filterResponse.mjs";
import { user } from "../../storage/user.mjs";

import { createContainer } from "./html/container.mjs";
import { postHeaderImage } from "./header.mjs";
import { postInfo } from "./info.mjs";
import { userAvatar } from "./avatar.mjs";
import { postContent } from "./content.mjs";
import { postComments } from "./comments.mjs";
import { postReactions } from "./reactions.mjs";
import { deleteButton } from "./delete.mjs";
import { postTags } from "./tags.mjs";

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
 * This functions is assembling the post HTML nodes into one node.
 * @param {object} post Contains the values from the API.
 * @returns assembled post HTML node.
 */
export const postHtml = (post) => {
  /** Filters bad avatar images and returns placeholder image if there is none. */
  let avatar = response.checkAvatar(post.author.avatar);

  /** Checks if the post belongs to the user and then adds delete and edit button. */
  let postDelete;

  if (post.author.name === user.name) {
    postDelete = deleteButton(post.id);
  } else {
    postDelete = "";
  }

  /** creates a wrapper for the bottom links and checks if post belongs to user and append it to the html node.*/
  let bottomLinkWrapper = createContainer();
  bottomLinkWrapper.className = "d-flex mt-2 justify-content-between p-0";

  const postsBodyContent = postBodyContainer();

  /** Creating comment html element */
  const reactionWrapper = createContainer();
  reactionWrapper.className = "d-flex align-items-end justify-content-end flex-fill p-0 mt-3";
  reactionWrapper.append(postTags(post.tags), postComments(post.comments, post.id), postReactions(post.reactions, post.id));

  const postInfoWrapper = createContainer();
  postInfoWrapper.className = "d-flex p-0 mb-3 mt-2";
  postInfoWrapper.append(userAvatar(post.author.name, avatar), postInfo(post.author.name, post.updated));

  postsBodyContent.append(postContent(post.title, post.body, post.id, post.author.name), reactionWrapper);

  /** Wrapper for all content */
  const contentWrapper = createContainer();
  contentWrapper.className = "card bg-secondary w-100 border p-2 shadow-box";

  contentWrapper.append(postDelete, postInfoWrapper, postHeaderImage(post.media), postsBodyContent);

  const posts = contentWrapper;
  return posts;
};
