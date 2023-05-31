import Report from "../../../../../reporting/report";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
    const body = request.body;
    const report: Report = new Report("./bin/dump.txt");
    return NextResponse.json(report.getTimes());
}