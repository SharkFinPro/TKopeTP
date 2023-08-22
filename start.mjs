import { exec } from "node:child_process";

exec("npm run dev", (err, stdout, stderr) => {
  console.log(stdout);
});

exec("npm run cdn", (err, stdout, stderr) => {
  console.log(stdout);
});