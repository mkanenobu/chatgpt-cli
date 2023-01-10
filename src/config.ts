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

const getConfig = () => {
  const byFile = configByFile();
  const cliOptions = configByCliOptions();
  return {
    apiKey: cliOptions["api-key"] ?? byFile.apiKey,
    speak: cliOptions.speak === "true" || byFile.speak === true,
    glow: byFile.glow === true,
  };
};

let _config: ReturnType<typeof getConfig>;

export const config = () => {
  if (!_config) {
    _config = getConfig();
  }
  return _config;
};

export const getApiKey = (): string => {
  if (typeof config().apiKey !== "string") {
    throw new Error(
      "API key is not set or is not a string, Set it with --apiKey or ~/.config/chatgpt-cli/config.json"
    );
  }
  return config().apiKey;
};

export const getSpeak = (): boolean => {
  return config().speak;
};

export const getGlow = (): boolean => {
  return config().glow;
};
