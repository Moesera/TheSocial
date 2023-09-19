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
