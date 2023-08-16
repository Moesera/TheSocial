import { user } from "../storage/user.mjs";
import { BASE_URL, profileUrl } from "../helpers/constants.mjs";
import { headers } from "../auth/fetchAuth.mjs";

const userName = document.getElementById("userName");




export async function getUser() {
try {
  const res = await fetch(`${BASE_URL}${profileUrl}/${user.name}?_followers=true&_following=true`, {
    method: "GET",
    headers: headers(),
  }
  );

  const data = await res.json();

  createProfile(data);

} catch (err) {
  console.log("error:", err);
}
}


const createProfile = (data) => {

userName.textContent = data.name;

}

