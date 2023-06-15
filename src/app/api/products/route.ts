import { NextResponse } from "next/server";
import productManager from "../../../productManager";

export async function GET(request: Request): Promise<NextResponse> {
  const body = request.body;

  return NextResponse.json(await productManager.getProducts());
}