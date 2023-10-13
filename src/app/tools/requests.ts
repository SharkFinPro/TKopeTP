export async function getRequest(path: string): Promise<any> {
  const data: Response = await fetch(path);

  return data.json();
}

export async function postRequest(path: string, body: string): Promise<Response> {
  return await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body
  });
}