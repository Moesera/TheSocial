// URLS for fetch
export const BASE_URL = "https://nf-api.onrender.com";
export const statusUrl = "/status";
export const registerUrl = "/api/v1/social/auth/register";
export const loginUrl = "/api/v1/social/auth/login";
export const postUrl = "/api/v1/social/posts";
export const postsOption = "/?_author=true&_comments=true&reactions=true";
export const profileUrl = `/api/v1/social/profiles`;
export const profileOption = "?_posts=true&_following=true&_followers=true";

// error message feedback container
export const feedbackMsg = document.querySelector("#feedback");
