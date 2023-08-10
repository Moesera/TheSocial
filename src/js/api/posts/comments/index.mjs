import { formDataFromEntries, postComment } from "./handler/index.mjs";

export const comments = (comments) => {

  const container = document.createElement("section");

  comments.forEach((comment) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bg-primary p-2 g-col-6 rounded-1 w-75 post-comments";
    const author = document.createElement("p");
    author.className = "mb-0 font-monospace";
    author.innerText = `- ${comment.owner}`;

    const body = document.createElement("p");
    body.className = "bg-secondary p-1 mb-1 rounded-1";
    body.innerText = comment.body;

    wrapper.append(body, author);
    container.append(wrapper);
  });

  return container;
};

export const form = () => {
  const form = document.createElement("form");
  form.className = "bg-primary p-2 rounded-1 container mt-2"

  const textarea = document.createElement("textarea");
  textarea.placeholder = "comment.."
  textarea.name = "body";
  textarea.className = "w-100 font-inherit ps-1";

  const submitButton = document.createElement("button");
  submitButton.textContent = "comment";
  submitButton.type = "submit";
  submitButton.className = "btn btn-success text-light fw-semibold";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formValues = formDataFromEntries(e);
    postComment(formValues);
  })

  form.append(textarea, submitButton);

  return form;
}