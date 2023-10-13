import { NextResponse } from "next/server";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { RobustProductData } from "../../../../productTypes";

export async function post(request: Request, action: any): Promise<NextResponse> {
  const productData: RobustProductData = await request.json();

  try {
    await action(productData);
  } catch (e) {
    console.error(e);
    return new NextResponse("Error!", { status: 500 });
  }

  return new NextResponse("Success", { status: 200 });
}