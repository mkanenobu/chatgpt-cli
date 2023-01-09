import { buildSync } from "esbuild";

const outfile = "dist/main.js";
const buildResult = buildSync({
  entryPoints: ["bin/chat-gpt-cli.ts"],
  bundle: true,
  outfile,
  platform: "node",
  format: "cjs",
  sourcemap: "inline",
});
console.log(buildResult);
