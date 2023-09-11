export const createTextArea = (content) => {
  const textarea = document.createElement("textarea");

  textarea.textContent = content;
  textarea.className = "";

  return textarea;
};
