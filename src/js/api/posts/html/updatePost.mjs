import { updatePost, cancelUpdate } from "../handlers/update.mjs";

/**
 * This function creates a html form object.
 * @param {string} postMedia Contains the current image value of the chosen post.
 * @param {string} postTitle Contains the current title value of chosen post.
 * @param {string} postBody Contains the current body value of the chosen post
 * @returns Assembled form html with the current values in the form.
 */
export const createUpdateForm = (postMedia, postTitle, postBody) => {
  // Creating form wrapper
  const updateForm = document.createElement("form");
  updateForm.id = "postUpdate";

  // event listener for form.
  updateForm.addEventListener("submit", updatePost);

  // creating title input
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

  // Creating wrapper for the other inputs.
  const inputsWrapper = document.createElement("div");
  inputsWrapper.className = "bg-primary px-2 pb-4 mb-3 mt-2 box";

  // Creating the update textarea input.
  const txtareaLabel = document.createElement("label");
  txtareaLabel.className = "form-label mt-2 w-100";
  txtareaLabel.for = "body";

  const textarea = document.createElement("textarea");
  textarea.className = "form-control";
  textarea.name = "body";
  textarea.id = "body";
  textarea.rows = 3;
  textarea.value = postBody;
  textarea.placeholder = "Post content";

  // assembling the textArea input
  txtareaLabel.appendChild(textarea);

  // Creating url input
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

  // Assembling url input.
  urlLabel.appendChild(urlInput);

  // creating submit button and cancel button wrapper.
  const buttons = document.createElement("div");
  buttons.className = "d-flex justify-content-between";

  // update Button
  const updateBtn = document.createElement("button");
  updateBtn.className = "btn btn-success text-white";
  updateBtn.textContent = "Update";
  updateBtn.type = "submit";

  // cancel button
  const cancelBtn = document.createElement("a");
  cancelBtn.className = "btn btn-danger text-white";
  cancelBtn.textContent = "Cancel";

  // event listener for cancel button
  cancelBtn.addEventListener("click", cancelUpdate);

  // Assembling buttons
  buttons.append(cancelBtn, updateBtn);

  // Assembling inputs into InputsContainer, except title because of the page design.
  inputsWrapper.append(txtareaLabel, urlLabel, buttons);

  // adding everything to form.
  updateForm.append(titleWrap, inputsWrapper);

  // final html
  const finalForm = updateForm;

  // returning final form.
  return finalForm;
};
