import { updatePostFetch } from "../updatePost.mjs";

/**
 * Changes header text, retrieves values from the post,
 * and inserts a new form with the values of the post.
 * @param {object} event Contains the event of the eventListener.
 * @returns An updated form with values from the post.
 */
export const updatePostForm = (event, title, body, mediaValue) => {
  // takes the id and place it in the url.
  const postId = event.target.id;

  updatePost(title, body, mediaValue);

  // Adds post id to url without refreshing the page.
  window.history.replaceState(null, null, `?id=${postId}`);

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
  } else if (location.pathname === "/src/pages/profile/index.html") {
    window.location.replace("/src/pages/profile/index.html");
  } else if (location.pathname === "/src/pages/post/index.html") {
    window.location.reload();
  }
};

/**
 * Gets the values from the post and id from the url
 * and makes a put request to ```updatePostFetch()``` after formData is setup correctly.
 * @param {object} event Contains the submit form event
 * @returns Form data constructed from the values of the form.
 * and then sent further to the ```updatePostFetch()```.
 */
export const updatePost = (title, body, media) => {
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  const data = {
    title,
    body,
    media,
  };

  updatePostFetch(id, data);
};
