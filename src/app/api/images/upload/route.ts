import { writeFile } from "fs";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();

  let buff = Buffer.from(body.imageFile, "base64");

  writeFile(`images/${body.fileName}`, buff, (err) => {
    if (err) throw err;
  })

  return new Response("Success!", { status: 200 });
}