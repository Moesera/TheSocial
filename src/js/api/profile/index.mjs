import { user } from "../storage/user.mjs";
import { BASE_URL, profileUrl } from "../helpers/constants.mjs";
import { headers } from "../auth/fetchAuth.mjs";

const userName = document.getElementById("userName");
const userBirth = document.getElementById("userBirth");
const userFriends = document.getElementById("userFriends");




async function getUser() {
try {
  const res = await fetch(`${BASE_URL}${profileUrl}/${user.name}`);

  const data = res.json();

  console.log(data);
  
} catch (err) {
  console.log("error:", err);
}
}
