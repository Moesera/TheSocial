import { load } from "../../storage/user.mjs";

export function avatarLink(container) {
  const avatar = document.createElement("img");
  avatar.style = "width: 2.3rem; height: 2.3rem; border-radius: 0.3rem;";
  avatar.classList = "shadow link-border";
  avatar.src = `${load("user").avatar}`;

  avatar.onerror = function () {
    avatar.src = "../../assets/images/default-imgs/avatar-placeholder.png";
  };

  container.prepend(avatar);
}
