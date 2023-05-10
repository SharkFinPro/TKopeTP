import Report from "../../../../../reporting/report";

export async function GET(request: Request): Promise<Response> {
    const report: Report = new Report("./bin/dump.txt" + (request.body ? "" : "")); // NOTE: blank string query added to execute at runtime
    return new Response(report.getExcel(), { status: 200 });
}