import { NextResponse } from "next/server";
import productManager from "../../../../../productManager";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { RobustProductData } from "../../../../../productTypes";

export async function POST(request: Request): Promise<NextResponse> {
  const productData: RobustProductData = await request.json();
  productManager.createProduct(productData);

  return NextResponse.json({}); // NOTE: compiles at build time
}