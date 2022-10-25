import { createPost } from "../createPost.mjs";

// Form element selected by id.
export const createPostForm = document.getElementById("createPost");

/**
 * This functions sends the data from the create posts form.
 * @param {event} event Contains the submit event of the form.
 * @returns It returns a constructed object from the html form entries,
 * then sends it to the post request.
 */
export const createPostFormData = (event) => {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  createPost(formValues);
};
