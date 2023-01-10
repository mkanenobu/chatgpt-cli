import * as childProcess from "child_process";

export const speak = (text: string) => {
  return childProcess.exec(`say ${text.split("\n").join(" ")}`);
};
