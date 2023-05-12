import { NextResponse } from "next/server";
import productManager from "../../../productManager";

export async function GET(): Promise<NextResponse> {
    return NextResponse.json(await productManager.getProducts()); // NOTE: compiles at build time
}