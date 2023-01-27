import Report from "../../../../reporting/report.mjs";

export default async (req, res) => {
    const report = new Report("./bin/dump.txt");
    res.status(200).json(report.getOverview());
}