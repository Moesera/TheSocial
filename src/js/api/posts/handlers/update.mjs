import { updatePostFetch } from "../updatePost.mjs";

/**
 * Changes header text, retrieves values from the post,
 * and inserts a new form with the values of the post.
 * @param {object} event Contains the event of the eventListener.
 * @returns An updated form with values from the post.
 */
export const updatePostForm = (event) => {

  // current post media values.
  const postTitle = document.getElementById("editTitle");
  const postTitleContent = document.getElementById("editTitle").textContent;
  console.log(postTitle);

  const postInput = createInput(postTitleContent, "text");
  postInput.className = "card-text w-50 border-0 mb-1";
  postTitle.replaceWith(postInput);

  const postBody = document.getElementById("editBody");
  const postBodyContent = document.getElementById("editBody").textContent;

  const postTextarea = createTextArea(postBodyContent);
  postTextarea.className = "w-100";
  postBody.replaceWith(postTextarea);
  
  const media = event.target.closest(".card").querySelector(".card-img-top");
  console.log(media);
  const mediaContent = event.target.closest(".card").querySelector(".card-img-top").currentSrc;
  const [postMedia, input] = createMediaInput(mediaContent);
  input.className = "w-100 mt-1 border-0"
  media.replaceWith(postMedia, input);
  // takes the id and place it in the url.
  const postId = event.target.id;


  // Adds post id to url without refreshing the page.
  window.history.replaceState(null, null, `?id=${postId}`);

  window.scrollTo(0, 0);
};

const createInput = (content, type) => {

  const input = document.createElement("input");
  input.value = content;
  input.type = type;

  return input;
}

const createTextArea = (content) => {
  const textarea = document.createElement("textarea");

  textarea.textContent = content;
  textarea.className = "";

  return textarea;
}

const createMediaInput = (content) => {

  const img = document.createElement("img");
  img.src = content;
  img.className = "card-img-top";

  const imgInput = createInput(content, "url");
  imgInput.textContent = content;
  imgInput.className = "";

  return [img, imgInput];

}

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
