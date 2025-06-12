import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { resolve } from "path";

export async function GET(request: Request, {
  params
}: {
  params: Promise<{
    image: string
  }>
}): Promise<Response> {
  const resolvedParams = await params;

  let filePath: string = resolve('.', `images/${resolvedParams.image}`);
  let imageBuffer: void | Buffer = await readFile(filePath).catch((err) => console.error(err));

  if (!imageBuffer) {
    filePath += ".webp";
    imageBuffer = await readFile(filePath).catch((err) => console.error(err));

    if (!imageBuffer) {
      return new Response("Image Not Found", { status: 404 });
    }
  }

  return new NextResponse(imageBuffer, {
    headers: {
      'content-type': 'image/png'
    }
  });
}