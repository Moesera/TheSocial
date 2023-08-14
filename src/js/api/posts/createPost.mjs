import { headers } from "../auth/fetchAuth.mjs";
import { BASE_URL, postUrl, feedbackMsg } from "../helpers/constants.mjs";

/**
 * This function will send the values from the from to the API.
 * @param {array} postData Contains the form input values.
 * @returns The values including an id.
 */
export async function createPost(postData) {
  /** checks if the formData has media, delete's it if it's empty. */
  if (!postData.media || postData.media === "") {
    delete postData.media;
  }

  const body = JSON.stringify(postData);

  try {
    const response = await fetch(BASE_URL + postUrl, {
      method: "POST",
      body,
      headers: headers(),
    });

    const data = await response.json();

    if (data.status !== 200) {
      console.log(data);

      throw new Error(data.errors[0].message);
    } else {
      window.location.reload();
    }

    return await data;
  } catch(err) {
    console.log(err);
    feedbackMsg.classList.add("alert-danger");
    feedbackMsg.classList.add("alert");
    feedbackMsg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="me-2 bi bi-exclamation-triangle ps-2" viewBox="0 0 16 16">
    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
    </svg><p class="mb-0"> ${err}</p>`;
  }
}
