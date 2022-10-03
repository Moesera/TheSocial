export async function editPost() {
  const response = await fetch(`${BASE_URL}${postUrl}`, {
    method: "PUT",
    headers: headers(),
  }).then((response) => response.json());

  return await response.json();
}
