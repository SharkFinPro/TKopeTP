import { post } from "../post";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { createProduct } from "../../../../../productManager";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  return post(request, createProduct);
}