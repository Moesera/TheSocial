import { updatePost, cancelUpdate } from "../handlers/update.mjs";

/**
 * This function creates a html form element.
 * @param {string} postMedia Contains the current image value of the chosen post.
 * @param {string} postTitle Contains the current title value of chosen post.
 * @param {string} postBody Contains the current body value of the chosen post
 * @returns Assembled form html node with the current values in the form.
 */
export const createUpdateForm = (postMedia, postTitle, postBody) => {

  const updateForm = document.createElement("form");
  updateForm.id = "postUpdate";

  updateForm.addEventListener("submit", updatePost);

  const titleWrap = document.createElement("div");
  titleWrap.className = "bg-primary p-2 box";

  const titleInput = document.createElement("input");
  titleInput.className = "form-control w-50";
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.minlength = "2";
  titleInput.required = true;
  titleInput.value = postTitle;
  titleInput.placeholder = "Title";

  titleWrap.appendChild(titleInput);

  /** Creating wrapper for the other inputs. */
  const inputsWrapper = document.createElement("div");
  inputsWrapper.className = "bg-primary px-2 pb-4 mb-3 mt-2 box";

  const textareaLabel = document.createElement("label");
  textareaLabel.className = "form-label mt-2 w-100";
  textareaLabel.for = "body";

  const textarea = document.createElement("textarea");
  textarea.className = "form-control";
  textarea.name = "body";
  textarea.id = "body";
  textarea.rows = 3;
  textarea.value = postBody;
  textarea.placeholder = "Post content";

  textareaLabel.appendChild(textarea);

  const urlLabel = document.createElement("label");
  urlLabel.className = "form-label";
  urlLabel.for = "media";

  const urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.name = "media";
  urlInput.className = "form-control border-0";
  urlInput.size = 160;
  urlInput.value = postMedia;
  urlInput.placeholder = "Media";

  urlLabel.appendChild(urlInput);

  /** creating submit button and cancel button wrapper. */
  const buttons = document.createElement("div");
  buttons.className = "d-flex justify-content-between";

  const updateBtn = document.createElement("button");
  updateBtn.className = "btn btn-success text-white";
  updateBtn.textContent = "Update";
  updateBtn.type = "submit";

  const cancelBtn = document.createElement("a");
  cancelBtn.className = "btn btn-danger text-white";
  cancelBtn.textContent = "Cancel";

  cancelBtn.addEventListener("click", cancelUpdate);

  buttons.append(cancelBtn, updateBtn);

  /** Assembling inputs into InputsContainer, except title because of page design. */ 
  inputsWrapper.append(textareaLabel, urlLabel, buttons);

  updateForm.append(titleWrap, inputsWrapper);

  const finalForm = updateForm;

  return finalForm;
};
