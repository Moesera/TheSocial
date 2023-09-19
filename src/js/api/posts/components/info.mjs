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
  postInfoWrapper.className = "d-flex flex-column p-0 w-100 ps-3";

  const authorName = document.createElement("p");
  authorName.className = "mb-0 bold-calibri fw-semibold rounded-1 fs-5 card-text";
  authorName.textContent = author;

  const postDate = document.createElement("p");
  postDate.className = "m-0 regular-calibri rounded-1 fst-italic fs-6 card-text";
  postDate.textContent = dateUpdated;

  postInfoWrapper.append(authorName, postDate);
  let postInfo = postInfoWrapper;

  return postInfo;
};
