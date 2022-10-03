import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

export async function deletePost(event) {
  const id = event.target.id;

  const response = await fetch(`${BASE_URL}${postUrl}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });

  window.location.reload();

  return response;
}
