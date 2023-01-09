import * as readline from "node:readline";
import { extractResponseText, sendRequest } from "./openai";
import { getSpeak } from "./config";
import { speak } from "./speak";

const helpText = `Commands:
  .send  - Send the message to OpenAI
  .show  - Show message buffer
  .clear - Clear buffer
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
  const isSpeak = getSpeak();

  const onSend = async (buf: string) => {
    const trimmed = buf.trim();
    if (trimmed.length !== 0) {
      console.log("Waiting for response...");
      await sendRequest(trimmed).then((res) => {
        const texts = extractResponseText(res);
        isSpeak && speak(texts.join(" "));
        texts.forEach((text) => {
          console.log(text);
        });
      });
    }
  };

  console.log(helpText);
  rl.prompt();
  rl.on("line", async (input) => {
    const trimmedInput = input.trim();
    switch (trimmedInput) {
      case ".show": {
        console.log(buf);
        break;
      }
      case ".clear": {
        buf = "";
        console.log("Buffer cleared");
        break;
      }
      case ".exit": {
        rl.close();
        break;
      }
      case ".send": {
        try {
          await onSend(buf);
          buf = "";
        } catch (err) {
          console.error("Failed to send", err);
        }
        break;
      }
      case ".help": {
        console.log(helpText);
        break;
      }
      default: {
        buf += `\n${trimmedInput}`;
      }
    }

    rl.setPrompt(prompt);
    rl.prompt();
  }).on("close", () => {
    console.log("\nBye!");
    process.exit(0);
  });
};
