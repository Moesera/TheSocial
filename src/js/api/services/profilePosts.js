import { BASE_URL, postUrl } from "./api/helpers/URLparams.mjs";

async function userPosts(url) {
  try {
    const token = "Bearer " + JSON.parse(localStorage.getItem("accessToken"));
    const postsData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const response = await fetch(url, postsData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

userPosts(BASE_URL + postUrl + JSON.parse(localStorage.getItem("username")));
