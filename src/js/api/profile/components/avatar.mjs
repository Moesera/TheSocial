import { load } from "../../storage/user.mjs";

export function avatarLink(container) {
  const avatar = document.createElement("img");
  avatar.style = "width: 2.3rem; height: 2.3rem; border-radius: 0.3rem;";

  if (location.pathname.includes("/src/pages/profile/")) {
    avatar.classList = "link-btn link-hover active";
  } else {
    avatar.classList = "link-border link-btn link-hover";
  }

  avatar.src = `${load("user").avatar}`;

  avatar.onerror = function () {
    avatar.src = "../../../../../assets/images/default-imgs/avatar-placeholder.png";
  };

  container.prepend(avatar);
}
