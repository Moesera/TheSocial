import { createUpdateForm } from "./html/updatePost.mjs";
import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

export const updatePostForm = (event) => {
  const formSection = document.getElementById("postForm");
  const formHeaderText = document.getElementById("formHeader");

  // Changes the header text to update
  formHeaderText.innerText = "Update Post";

  // current post media values.
  const postId = event.target.id;
  const postTitle = event.path[2].childNodes[3].children[0].innerText;
  const postBody = event.path[2].childNodes[3].children[1].innerText;
  const media = event.path[3].childNodes[0].children[0].currentSrc;

  // Adds post id to url without refreshing page.
  window.history.replaceState(null, null, `?id=${postId}`);

  // replaces create form to update form.
  formSection.replaceChildren(createUpdateForm(media, postTitle, postBody));

  window.scrollTo(0, 0);
};

export const cancelUpdate = () => {
  window.location.reload();
};

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

export async function updatePostFetch(updateData) {
  if (!updateData.id) {
    throw new Error("Update requires a postID");
  }
  const body = JSON.stringify(updateData);
  console.log(body);

  const response = await fetch(`${BASE_URL}${postUrl}/${updateData.id}`, {
    method: "PUT",
    body,
    headers: headers(),
  });

  if (response.ok === false) {
    return;
  } else {
    window.location.replace("/index.html");
  }

  console.log(response);

  return await response.json();
}
