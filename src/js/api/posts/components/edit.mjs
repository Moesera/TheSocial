import { createInput } from "./html/input.mjs";
import { createTextArea } from "./html/textarea.mjs";
import { createMediaInput } from "./html/media.mjs";
import { updatePostForm } from "../handlers/update.mjs";

export const editButton = (id) => {
  if (location.pathname === "/src/pages/post/index.html") {
    const editButton = document.createElement("button");
    editButton.textContent = "edit";
    editButton.className = "fs-6 regular-calibri bg-transparent border-0 text-black";
    editButton.role = "button";
    editButton.id = id;

    editButton.addEventListener("click", (e) => {
      // current post media values.
      const postTitle = document.getElementById("editTitle");
      const postBody = document.getElementById("editBody");
      const media = e.target.closest(".card").querySelector(".card-img-top");

      if (editButton.textContent === "update") {
        const mediaInput = document.getElementById("editMedia");
        updatePostForm(e, postTitle.value, postBody.value, mediaInput.value);
      }

      const postTitleContent = document.getElementById("editTitle").textContent;
      const postInput = createInput(postTitleContent, "text");
      postInput.className = "card-text w-50 border-0 mb-1 ps-1 input-wrapper box";
      postInput.id = "editTitle";

      postTitle.replaceWith(postInput);

      const postBodyContent = document.getElementById("editBody").textContent;
      const postTextarea = createTextArea(postBodyContent);
      postTextarea.className = "w-100 ps-1 input-wrapper box";
      postTextarea.id = "editBody";

      postBody.replaceWith(postTextarea);

      if (editButton.textContent === "edit") {
        const mediaContent = media.currentSrc;
        const [postMedia, input] = createMediaInput(mediaContent);
        input.className = "w-100 mt-1 border-0 ps-1 input-wrapper box";
        input.id = "editMedia";

        media.replaceWith(postMedia, input);
      }

      editButton.textContent = "update";
      editButton.className = "btn btn-success fs-6 regular-calibri text-white py-1";
    });

    return editButton;
  } else {
    return "";
  }
};
