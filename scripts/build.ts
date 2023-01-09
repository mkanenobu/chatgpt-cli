import { buildSync } from "esbuild";

const outfile = "dist/main.js";
const buildResult = buildSync({
  entryPoints: ["bin/chatgpt-cli.ts"],
  bundle: true,
  outfile,
  platform: "node",
  format: "cjs",
  sourcemap: "inline",
});
console.log(buildResult);
