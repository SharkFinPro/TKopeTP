import { NextResponse } from "next/server";
import productManager from "../../../productManager";

export async function GET() {
    return NextResponse.json(await productManager.getProductTypes()); // NOTE: compiles at build time
}