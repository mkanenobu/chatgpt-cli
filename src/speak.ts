import * as childProcess from "child_process";

export const speak = (text: string) => {
  childProcess.exec(`say ${text}`);
};
