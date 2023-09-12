import { createContainer } from "./html/container.mjs";

const randomColor = () => {
  var colors = [
    "#0000ff", // Blue
    "#00ff00", // Green
    "#ff0000", // Red
    "#800080", // Purple
    "#ffa500", // Orange
    "#00ffff", // Cyan
    "#ff00ff", // Magenta
    "#008000", // Dark green
    "#000080", // Navy
    "#800000", // Maroon
    "#808000", // Olive
    "#008080", // Teal
  ];

  var randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};

export const postTags = (tags) => {
  const tagsWrapper = createContainer();
  tagsWrapper.className = "d-flex gap-2 flex-fill";

  tags.forEach((tag) => {
    const tagColor = randomColor();

    let postTag = "#";

    if (!tag.includes("#")) {
      postTag = postTag.concat(tag);
    } else {
      postTag = tag;
    }

    const para = document.createElement("p");
    para.textContent = postTag;
    para.className = `m-0`;
    para.style.color = tagColor;

    tagsWrapper.append(para);
  });

  return tagsWrapper;
};
