export const createInput = (content, type) => {
  const input = document.createElement("input");
  input.value = content;
  input.type = type;

  return input;
};
