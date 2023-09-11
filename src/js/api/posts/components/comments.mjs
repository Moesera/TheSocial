/**
 * This functions create's the reaction section of the post HTML.
 * @param {string} comments contains the comments of the post.
 * @param {string} likes Contains the likes of the post.
 * @returns a constructed HTML node of reactions.
 */
export const postComments = (comment, id) => {
  const commentWrapper = document.createElement("a");
  commentWrapper.href = `/src/pages/post/index.html?id=${id}`;
  commentWrapper.className = "d-flex me-3 me-lg-4 align-items-center fs-5 text-decoration-none";

  const commentIcon = document.createElement("i");
  commentIcon.className = "fa-solid fa-comment";

  const commentCount = document.createElement("p");
  commentCount.className = "m-0 ms-2 text-white";
  commentCount.textContent = comment.length;

  commentWrapper.append(commentIcon, commentCount);

  return commentWrapper;
};
