import { sync as commandExistsSync } from "command-exists";
import { execSync } from "node:child_process";

export const isGlowAvailable = (): boolean => commandExistsSync("glow");

export const glowing = (input: string): string => {
  return execSync(`echo ${input} | glow - `, { encoding: "utf-8" });
};
