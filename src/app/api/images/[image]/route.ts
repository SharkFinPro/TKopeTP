import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { resolve } from "path";

export async function GET(request: Request, {
  params
}: {
  params: {
    image: string
  }
}): Promise<Response> {

  const filePath: string = resolve('.', `images/${params.image}`);
  const imageBuffer: void | Buffer = await readFile(filePath).catch((err) => console.error(err));

  if (!imageBuffer) {
    return new Response("Image Not Found", { status: 404 });
  }

  return new NextResponse(imageBuffer, {
    headers: {
      'content-type': 'image/png'
    }
  });
}