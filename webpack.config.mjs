import { join } from "path";

import nodeExternals from "webpack-node-externals";

export default {
    entry: "./src/index.mjs",
    output: {
        filename: "server.js",
        path: join(process.cwd(), "src/bin")
    },
    mode: "production",
    externalsPresets: { node: true },
    externals: [nodeExternals()]
};