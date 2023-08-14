import { BASE_URL, postUrl } from "../../../helpers/constants.mjs";
import { headers } from "../../../auth/fetchAuth.mjs";

export async function postComment(data) {
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  const body = JSON.stringify(data);

  const res = await fetch(`${BASE_URL}${postUrl}${id}/comment`, {
    method: "POST",
    body,
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error(`Ooops!, something went wrong: failed with error code ${response.status}`)
  }

  window.location.reload();
  return await res.json();
}

export const formDataFromEntries = (event) => {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  return formValues;
};