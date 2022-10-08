import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

/**
 * This function will send the values from the from to the API.
 * @param {event} event Contains the form submit event.
 * @returns The values including an id.
 */
export async function createPost(postData) {
  // checks if the formData has media, delete's it if it's empty.
  if (!postData.media || postData.media === "") {
    delete postData.media;
  }

  const body = JSON.stringify(postData);

  const response = await fetch(BASE_URL + postUrl, {
    method: "POST",
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
