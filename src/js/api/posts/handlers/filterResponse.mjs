/**
 * Checks if the user has profile image or not
 * @param {string} avatar contains the avatar value from the api.
 * @returns string from api or placeholder image
 */
export const checkAvatar = (avatar) => {
  if (!avatar || ["string", "https://img.service.com/avatar.jpg", "https://i.picsum.photos/id/1011/5472/3648.jpg"].includes(avatar)) {
    return "/assets/images/default-imgs/avatar-placeholder.png";
  }
  {
    return avatar;
  }
};
