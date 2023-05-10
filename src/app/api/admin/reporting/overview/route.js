import Report from "../../../../../reporting/report.ts";
import { NextResponse } from "next/server";

export async function GET(request) {
    const report = new Report("./bin/dump.txt" + (request.body ? "" : "")); // NOTE: blank string query added to execute at runtime
    return NextResponse.json(report.getOverview());
}