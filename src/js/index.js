import { logout, logoutBtn, checkUserAuth } from "./api/auth/userAuth.mjs";
import { registerUser } from "./api/auth/register.mjs";
import { loginUser } from "./api/auth/login.mjs";
import { checkPage } from "./api/routes/page.mjs";
import { avatarLink } from "./api/profile/components/avatar.mjs";

if (!location.pathname.includes("/src/pages/login/") && !location.pathname.includes("/src/pages/register/")) {
  /** checks if user has token, if not is sent to login page. */
  checkUserAuth();

  const profileBox = document.getElementById("profileLink");
  avatarLink(profileBox);

  logoutBtn.addEventListener("click", logout);
}

/** checks if you are on register page or login page, and adds event listener accordingly. */
if (location.pathname.includes("/src/pages/register/")) {
  registerUser();
} else if (location.pathname.includes("/src/pages/login/")) {
  loginUser();
}

/** Checks current page, and runs functions accordingly. */
checkPage();
