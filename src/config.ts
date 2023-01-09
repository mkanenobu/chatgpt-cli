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
      apiKey: {
        type: "string",
        default: undefined,
      },
      speak: {
        type: "boolean",
        default: undefined,
      },
    },
  }).values;

export const getApiKey = (): string => {
  const apiKey = configByCliOptions().apiKey || configByFile().apiKey;
  if (typeof apiKey !== "string") {
    throw new Error(
      "API key is not set or is not a string, Set it with --apiKey or ~/.config/chatgpt-cli/config.json"
    );
  }
  return apiKey;
};

export const getSpeak = (): boolean => {
  const speak = configByCliOptions().speak || configByFile().speak;
  if (speak !== null && speak !== undefined && typeof speak !== "boolean") {
    throw new Error(
      "Speak is not set or is not a string, Set it with --speak or ~/.config/chatgpt-cli/config.json"
    );
  }

  return speak ?? true;
};
