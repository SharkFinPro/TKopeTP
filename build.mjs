import { exec } from "node:child_process";

exec("npm run build", (err, stdout, stderr) => {
  console.log(stdout);
});