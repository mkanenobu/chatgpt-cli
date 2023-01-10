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
    temperature: 0.7,
    max_tokens: 512,
  });
};

export const extractResponseText = (
  res: Awaited<ReturnType<typeof sendRequest>>
): string => {
  return res.data.choices
    .map((choice) => choice.text)
    .filter(Boolean)
    .join("\n");
};
