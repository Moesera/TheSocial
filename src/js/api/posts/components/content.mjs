/**
 * This function creates the body content HTML elements of the post.
 * @param {string} title Contains the title of the post.
 * @param {string} body Contains the body of the post.
 * @returns a constructed HTML node of the post body content.
 */
export const postContent = (title, body) => {
  const postContentWrapper = document.createElement("section");
  postContentWrapper.className = "px-0";

  const postTitle = document.createElement("h2");
  postTitle.className = "bold-calibri fs-5 card-text mb-2";
  postTitle.textContent = title;
  postTitle.id = "editTitle";

  const postBody = document.createElement("p");
  postBody.id = "editBody";

  if (body) {
    postBody.className = "regular-calibri d-inline-block fs-5 mb-0 rounded-1 card-text editableContext text-truncate";
    postBody.textContent = `${body}`;
    postBody.style = "max-width: 300px;";
  }

  postContentWrapper.append(postTitle, postBody);

  return postContentWrapper;
};
