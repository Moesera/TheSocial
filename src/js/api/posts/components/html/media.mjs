import { createInput } from "./input.mjs";

export const createMediaInput = (content) => {
  const img = document.createElement("img");
  img.src = content;
  img.className = "card-img-top";

  const imgInput = createInput(content, "url");
  imgInput.textContent = content;
  imgInput.className = "";

  return [img, imgInput];
};
