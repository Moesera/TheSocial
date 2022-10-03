import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

// CREATE POST FEATURE
export const createPostForm = document.getElementById("createPost");

export async function createPost(event) {
  event.preventDefault();

  const form = event.target;

  const response = await fetch(BASE_URL + postUrl, {
    method: "POST",
    body: JSON.stringify({
      title: form.postTitle.value,
      body: form.createTextarea.value,
      media: form.imageInput.value,
    }),
    headers: headers(),
  });

  setTimeout(() => {
    createPostForm.reset();
  }, 100);

  return await response.json();
}
