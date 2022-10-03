import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl } from "../helpers/constants.mjs";

export async function deletePost() {
  const response = await fetch(`${BASE_URL}${postUrl}/417`, {
    method: "DELETE",
    headers: headers(),
  });

  if (response === 200) {
    window.location.reload();
  } else {
    console.log("Did not delete target");
  }
}

// ${id}
