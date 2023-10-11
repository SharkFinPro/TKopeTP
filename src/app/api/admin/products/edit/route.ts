import { NextResponse } from "next/server";
import { updateProduct } from "../../../../../productManager";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { RobustProductData } from "../../../../../productTypes";

export async function POST(request: Request): Promise<NextResponse> {
  const productData: RobustProductData = await request.json();

  try {
    await updateProduct(productData);
  } catch (e) {
    console.error(e);
    return new NextResponse("Error!", { status: 500 });
  }

  return new NextResponse("Success", { status: 200 });
}