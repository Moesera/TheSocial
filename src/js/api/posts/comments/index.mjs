export const comments = (comments) => {

  const container = document.createElement("section");

  comments.forEach((comment) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bg-primary p-2 g-col-6 rounded-1 w-50 post-comments";
    const author = document.createElement("p");
    author.className = "mb-0 fst-italic fw-semibold";
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
  textarea.className = "w-100";

  const submitButton = document.createElement("button");
  submitButton.textContent = "comment";
  submitButton.type = "submit cta";

  form.append(textarea, submitButton);

  return form;
}
