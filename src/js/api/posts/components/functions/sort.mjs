import { arrayPosts } from "../../postsFeed.mjs";

export const filterContainer = document.getElementById("filterSelect");

/**
 * Sorts the array to newest post first, this is also the standard.
 * @returns a sorted array with newest posts first
 */
export const newSort = () => {
  const SortNewest = arrayPosts.sort((a, b) => {
    if (a.created.toLowerCase() < b.created.toLowerCase()) return 1;
    return -1;
  });

  return SortNewest;
};

/**
 * Sorts the array title from A-Z
 * @returns a sorted array with ascending alphabetical order by title
 */
export const titleAzSort = () => {
  const byAzTitle = arrayPosts.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    return 1;
  });

  return byAzTitle;
};

/**
 * Sorts the array title from Z-A.
 * @returns a sorted array with descending alphabetical order by title
 */
export const titleZaSort = () => {
  const byZaTitle = arrayPosts.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
    return -1;
  });

  return byZaTitle;
};
