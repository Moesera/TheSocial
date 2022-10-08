import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

/**
 * This functions sends a delete request to the API with the selected post ID.
 * @param {event} event Contains the event of the button.
 * @returns Delete's the post containing the ID provided through the button.
 */
export async function deletePost(event) {
  const id = event.target.id;

  const response = await fetch(`${BASE_URL}${postUrl}${id}`, {
    method: "DELETE",
    headers: headers(),
  });

  console.log(response);

  if (response.ok === false) {
    return;
  } else {
    window.location.reload();
  }

  return await response.json();
}
