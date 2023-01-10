import * as readline from "node:readline";
import { Spinner } from "cli-spinner";
import { extractResponseText, sendRequest } from "./openai";
import { getSpeak } from "./config";
import { speak } from "./speak";
import { ChildProcess } from "child_process";

const helpText = `Commands:
  .exit  - Exit
  .help  - Show this help text
`;

const prompt = "> ";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt,
});

export const startRepl = () => {
  let buf = "";
  let speakProcess: ChildProcess | undefined = undefined;
  const isSpeak = getSpeak();

  const spinner = new Spinner({
    text: "Waiting for response... %s",
  });

  const onSend = async (prompt: string) => {
    spinner.start();
    return sendRequest(prompt)
      .then((res) => {
        const text = extractResponseText(res);
        console.log(text);
        if (isSpeak) {
          speakProcess?.kill();
          speakProcess = speak(text);
        }
      })
      .finally(() => {
        spinner.stop();
      });
  };

  console.log(helpText);

  rl.prompt();
  rl.on("line", async (input) => {
    const trimmedInput = input.trim();
    switch (trimmedInput) {
      case "": {
        break;
      }
      case ".exit": {
        rl.close();
        break;
      }
      case ".help": {
        console.log(helpText);
        break;
      }
      default: {
        try {
          await onSend(trimmedInput);
          buf = "";
        } catch (err) {
          console.error("Failed to send", err);
        }
      }
    }

    rl.setPrompt(prompt);
    rl.prompt();
  }).on("close", () => {
    console.log("\nBye!");
    speakProcess?.kill();
    process.exit(0);
  });
};
