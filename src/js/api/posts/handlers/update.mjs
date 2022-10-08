import { createUpdateForm } from "../components/updateForm.mjs";
import { updatePostFetch } from "../updatePost.mjs";

/**
 * Changes header text, retrieves values from the post,
 * and inserts a new form with the values of the post.
 * @param {object} event Contains the event of the eventListener.
 * @returns An updated form with values from the post.
 */
export const updatePostForm = (event) => {
  const formSection = document.getElementById("postForm");

  // updating header h2.
  document.getElementById("formHeader").innerText = "Update Post";

  // current post media values.
  const postTitle = event.path[3].childNodes[3].children[0].innerText;
  const postBody = event.path[3].childNodes[3].children[1].innerText;
  const media = event.path[4].childNodes[0].children[0].currentSrc;

  // takes the id and place it in the url.
  const postId = event.target.id;
  console.log(postId);

  // Adds post id to url without refreshing the page.
  window.history.replaceState(null, null, `?id=${postId}`);

  // replaces create form to update form.
  formSection.replaceChildren(createUpdateForm(media, postTitle, postBody));

  window.scrollTo(0, 0);
};

/**
 * This is the post update cancel button function, it will update the site
 * accordingly to what location you are.
 * @returns Either to home or profile.
 */
export const cancelUpdate = () => {
  if (location.pathname === "/index.html") {
    window.location.replace("/index.html");
  } else if (location.pathname === "/pages/profile.html") {
    window.location.replace("/pages/profile.html");
  }
};

/**
 * Gets the values from the post and id from the url
 * and makes a put request to ```updatePostFetch()``` after formData is setup correctly.
 * @param {object} event Contains the submit form event
 * @returns Form data constructed from the values of the form.
 * and then sent further to the ```updatePostFetch()```.
 */
export const updatePost = (event) => {
  event.preventDefault();

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  const form = event.target;

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());
  formValues.id = id;

  updatePostFetch(formValues);
};
