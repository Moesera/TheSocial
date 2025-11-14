import { getUser } from "../storage/user.mjs";
import { BASE_URL, profileUrl } from "../helpers/constants.mjs";
import { headers } from "../auth/fetchAuth.mjs";

const userName = document.getElementById("userName");

export async function getProfileUser() {
  const stored = getUser({});
  
  if (!stored || !stored.name) {
    console.warn("No stored user — redirect to login or show guest view");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}${profileUrl}/${stored.name}?_followers=true&_following=true`, {
      method: "GET",
      headers: headers(),
    });

    const data = await res.json();

    createProfile(data);
  } catch (err) {
    console.log("error:", err);
  }
}

const createProfile = (data) => {
  userName.textContent = data.name;
};
