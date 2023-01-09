# chatgpt-cli

chat-gpt is a command line interface for OpenAI

# How to use

1. `npm -g install @mkanenobu/chatgpt-cli`
1. Set API Key to `~/.config/chatgpt-cli/config.json`
1. Run `chatgpt-cli`

Config example

```json
{
  "api_key": "...",
  "speak": false // default is true
}
```

# For Developers

Dev

```bash
npm run dev
```

Build

```bash
npm run build
```

Publish


```bash
npm publish --access public
```
