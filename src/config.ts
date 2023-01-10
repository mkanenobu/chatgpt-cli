import * as fs from "node:fs";
import { parseArgs } from "node:util";

const configByFile = () => {
  const home = process.env.HOME;
  const f = fs.readFileSync(`${home}/.config/chatgpt-cli/config.json`, "utf8");
  return JSON.parse(f);
};

const configByCliOptions = () =>
  parseArgs({
    options: {
      "api-key": {
        type: "string",
        default: undefined,
      },
      speak: {
        type: "string",
        default: undefined,
      },
    },
    args: process.argv.slice(2),
  }).values;

export const getApiKey = (): string => {
  const apiKey = configByCliOptions()["api-key"] || configByFile().apiKey;
  if (typeof apiKey !== "string") {
    throw new Error(
      "API key is not set or is not a string, Set it with --apiKey or ~/.config/chatgpt-cli/config.json"
    );
  }
  return apiKey;
};

export const getSpeak = (): boolean => {
  const byConfig = configByCliOptions().speak as string | undefined;
  const speak: undefined | boolean =
    (byConfig && byConfig === "true") || configByFile().speak;

  return !!speak;
};
