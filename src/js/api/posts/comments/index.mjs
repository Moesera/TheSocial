export const postComments = (comments) => {
  console.log(comments);
  
const container = document.createElement("section");

comments.forEach((comment) => {
  const wrapper = document.createElement("div");
  wrapper.className = "bg-primary w-100 p-2 g-col-6 rounded-1"

  const author = document.createElement("p");
  author.className = "mb-0 fst-italic fw-semibold"
  author.innerText = `- ${comment.owner}`;

  const body = document.createElement("p");
  body.className = "bg-secondary p-1 mb-1 rounded-1";
  body.innerText = comment.body;

  wrapper.append(body, author);

  container.append(wrapper);
})

return container;
}