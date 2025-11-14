export const getUser = (fallback = null) => {
  const raw = localStorage.getItem("user");
  if (raw == null) return fallback;
    try { return JSON.parse(raw); } catch (e) { console.warn("getUser parse failed", e, raw); return fallback; }
};

export const setUser = (obj) => {
  try { localStorage.setItem("user", JSON.stringify(obj)); } catch (e) { console.error("setUser failed", e); }
};

export const getToken = () => localStorage.getItem("token");
export const setToken = (t) => localStorage.setItem("token", t);

/**
 * This function retrieves an item from localStorage.
 * @param {string} item Contains the key of the item you want to retrieve from localStorage.
 * @returns The item that has the value of the key.
 */
export const load = (item) => {
  return localStorage.getItem(item);
};
