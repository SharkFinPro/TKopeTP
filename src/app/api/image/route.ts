import { NextResponse } from "next/server";
import { readFile } from 'fs';
import path from 'path';
import { promisify } from "util";

const readFilePromise = promisify(readFile);

export async function POST(request: Request): Promise<Response> {
  const body = await request.json();

  const filePath = path.resolve('.', `images/${body.image}`);

  let imageBuffer = await readFilePromise(filePath).catch((): void => {});

  if (!imageBuffer) {
    return new Response("Error!", { status: 500 });
  }

  return new NextResponse(imageBuffer, { headers: { 'content-type': 'image/png' } });
}