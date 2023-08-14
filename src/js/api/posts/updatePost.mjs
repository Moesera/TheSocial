import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

/**
 * This functions sends a PUT request to the api.
 * @param {formData} updateData Contains the values from the form to be updated.
 * @returns Changed post elements.
 */
export async function updatePostFetch(id, updateData) {
  /** checks if the formData has media, delete's it if it's empty. */
  if (!updateData.media || updateData.media === "") {
    delete updateData.media;
  }

  /** checks if the form data includes an id. */
  if (!id) {
    throw new Error("Update requires a postID");
  }

  const body = JSON.stringify(updateData);

  const response = await fetch(`${BASE_URL}${postUrl}${id}`, {
    method: "PUT",
    body,
    headers: headers(),
  });

  if (response.ok === false) {
    return;
  } else {
    window.location.reload();
  }

  return await response.json();
}
