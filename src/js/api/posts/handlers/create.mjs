import { createPost } from "../createPost.mjs";

export const createPostForm = document.getElementById("createPost");

export const createPostFormData = (event) => {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  createPost(formValues);
};
