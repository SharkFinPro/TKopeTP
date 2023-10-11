import { NextResponse } from "next/server";
import { getProductTypes } from "../../../productManager";

export async function GET(request: Request): Promise<NextResponse> {
  const body = request.body;

  return NextResponse.json(await getProductTypes());
}