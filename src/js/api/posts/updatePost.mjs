import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

export async function updatePostFetch(updateData) {
  // checks if the formData has media, delete's it if it's empty.
  if (!updateData.media || updateData.media === "") {
    delete updateData.media;
  }

  // checks if the form data includes an id.
  if (!updateData.id) {
    throw new Error("Update requires a postID");
  }

  const body = JSON.stringify(updateData);

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

  return await response.json();
}
