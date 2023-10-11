import { NextResponse } from "next/server";
import { getProducts } from "../../../productManager";

export async function GET(request: Request): Promise<NextResponse> {
  const body = request.body;

  return NextResponse.json(await getProducts());
}