import Report from "../../../../../reporting/report";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
    const report: Report = new Report("./bin/dump.txt" + (request.body ? "" : "")); // NOTE: blank string query added to execute at runtime
    return NextResponse.json(report.getTimes());
}