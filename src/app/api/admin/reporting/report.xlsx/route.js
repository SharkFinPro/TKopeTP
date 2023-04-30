import Report from "../../../../../reporting/report.mjs";

export async function GET(request) {
    const report = new Report("./bin/dump.txt" + (request.body ? "" : "")); // NOTE: blank string query added to execute at runtime
    return new Response(report.getExcel(), { status: 200 });
}