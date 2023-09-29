import { writeFile } from "fs/promises";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();

  let buff: Buffer = Buffer.from(body.imageFile, "base64");

  writeFile(`images/${body.fileName}.webp`, buff).catch(err => {
    if (err) throw err;
  });

  return new Response("Success!", { status: 200 });
}