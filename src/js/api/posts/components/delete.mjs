import { deletePost } from "../deletePost.mjs";
import { editButton } from "../components/edit.mjs";

/**
 * This creates the delete button element for the post
 * @param {number} id contains the id value of the post.
 * @returns a constructed HTML element of a cross icon.
 */
export const deleteButton = (id) => {
  const deleteContainer = document.createElement("div");
  deleteContainer.className = "d-flex justify-content-end p-0 align-items-center mb-2";

  if (location.pathname === "/src/pages/post/index.html") {
    deleteContainer.className = "d-flex justify-content-between p-0 align-items-center mb-2";
  }

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-xmark fs-5";
  deleteIcon.id = id;

  deleteIcon.addEventListener("click", deletePost);

  deleteContainer.append(editButton(id), deleteIcon);

  return deleteContainer;
};
