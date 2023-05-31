import Report from "../../../../../reporting/report";

export async function GET(request: Request): Promise<Response> {
    const body = request.body;
    const report: Report = new Report("./bin/dump.txt");
    return new Response(report.getExcel(), { status: 200 });
}