/**
 * This function creates the user avatar HTML elements.
 * @param {string} author Contains the author of the post.
 * @param {string} userAvatar Contains the avatar of the user.
 * @returns a constructed HTML element of the user avatar.
 */
export const userAvatar = (author, userAvatar) => {
  const postAvatarContainer = document.createElement("section");
  postAvatarContainer.className = "col-1 p-0 avatar-size";

  const avatar = document.createElement("img");
  avatar.className = "rounded-circle w-100 h-100 object-fit-cover border";
  avatar.src = userAvatar;
  avatar.alt = `${author}'s avatar`;

  avatar.onerror = function () {
    avatar.src = "../../assets/images/default-imgs/avatar-placeholder.png";
  };

  postAvatarContainer.appendChild(avatar);
  return postAvatarContainer;
};
