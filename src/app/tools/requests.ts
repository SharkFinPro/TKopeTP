export async function getRequest(path: string) {
  const data = await fetch(path);

  return data.json();
}

export async function postRequest(path: string, body: string) {
  return await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body
  });
}