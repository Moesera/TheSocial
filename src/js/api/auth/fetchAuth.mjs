import { load } from "../storage/user.mjs";

export const headers = () => {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
