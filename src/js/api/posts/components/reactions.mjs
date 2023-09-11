export const postReactions = (likes) => {
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
  likeCounter.textContent = reactionCounter;

  likeWrapper.append(likeIcon, likeCounter);

  return likeWrapper;
};
