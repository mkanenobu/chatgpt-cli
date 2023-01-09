import { Configuration, OpenAIApi } from "openai";
import { getApiKey } from "./config";

const configuration = new Configuration({
  apiKey: getApiKey(),
});

const openaiClient = new OpenAIApi(configuration);

export const sendRequest = (prompt: string) => {
  return openaiClient.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.5,
    max_tokens: 1024,
  });
};

export const extractResponseText = (
  res: Awaited<ReturnType<typeof sendRequest>>
): string[] => {
  return res.data.choices
    .map((choice) => choice.text?.split("\n").map((s) => s.trim()))
    .flat()
    .filter(Boolean) as string[];
};
