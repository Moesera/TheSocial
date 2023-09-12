import { BASE_URL, postUrl } from "../../helpers/constants.mjs";
import { headers } from "../../auth/fetchAuth.mjs";

export const postReactions = (likes, id) => {
  /** Like counter is set to one, if length does not show otherwise */
  let reactionCounter = 0;

  if (likes.length !== 0) {
    for (let y = 0; y < likes.length; y++) {
      reactionCounter += likes[y].count;
    }
  }

  /** Creating the like html element */
  const likeWrapper = document.createElement("div");
  likeWrapper.className = "d-flex align-items-center fs-5";

  const likeIcon = document.createElement("i");
  likeIcon.className = "fa-solid fa-heart";

  const likeCounter = document.createElement("p");
  likeCounter.className = "m-0 ms-2";
  likeCounter.innerHTML = reactionCounter;

  likeIcon.addEventListener("click", () => {
    postLike(1, "heart", id);
    reactionCounter += 1;

    likeCounter.innerHTML = reactionCounter;
  });

  likeWrapper.append(likeIcon, likeCounter);

  return likeWrapper;
};

export async function postLike(count, symbol, id) {
  const res = await fetch(`${BASE_URL}${postUrl}${id}/react/❤️`, {
    method: "PUT",
    body: JSON.stringify({
      symbol: symbol,
      count: count,
      postId: id,
    }),
    headers: headers(),
  });

  return await res.json();
}
