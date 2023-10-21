import { writeFile } from "node:fs/promises";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  let buff: Buffer = Buffer.from(body.imageFile, "base64");

  await writeFile(`images/${body.fileName}.webp`, buff).catch(err => {
    if (err) throw err;
  });

  return NextResponse.json({
    fileName: body.fileName
  }, {
    status: 200
  });
}