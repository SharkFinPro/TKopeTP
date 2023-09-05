import { NextResponse } from "next/server";
import { readFile } from 'fs';
import path from 'path';
import { promisify } from "util";

const readFilePromise = promisify(readFile);

export async function GET(request: Request, { params }: { params: { slug: string } }): Promise<Response> {
  const slug: string = params.slug;

  const filePath: string = path.resolve('.', `images/${slug}`);
  let imageBuffer: void | Buffer = await readFilePromise(filePath).catch((): void => {});

  if (!imageBuffer) {
    return new Response("Image Not Found", { status: 404 });
  }

  return new NextResponse(imageBuffer, { headers: { 'content-type': 'image/png' } });
}