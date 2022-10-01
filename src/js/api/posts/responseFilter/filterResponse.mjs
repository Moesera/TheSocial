/**
 * Checks if the user has profile image or not
 * @param {string} avatar contains the avatar value from the api.
 * @returns string from api or placeholder image
 */
export const checkAvatar = (avatar) => {
  if (!avatar || ["string", "https://img.service.com/avatar.jpg"].includes(avatar)) {
    return "/assets/images/default-imgs/avatar-placeholder.png";
  }
  {
    return avatar;
  }
};
