# Context Recap Bot

Telegram bot that summarizes recent group messages with `/context N`. It also supports `/context all N` in one configured group.

The production bot runs in [Val Town](https://www.val.town/x/brywhit/context-recap-bot). The HTTP endpoint is the existing `main.ts` trigger. Message history is stored in the val's private SQLite database; this repository contains code only.

## Contributing

Open a pull request against `main`. Tests run on pull requests. Once the owner merges a PR, GitHub Actions deploys `main.ts` to the existing Val Town project and verifies that the deployed file matches the commit. Changes to this file can affect all chats using the bot, so review each PR before merging.

## Local checks

```sh
node test.mjs
```

## Deployment setup

The repository owner must set the GitHub Actions secret `VAL_TOWN_API_KEY` to a Val Town API token with val read and write scope. Do not add Telegram or DeepSeek keys to GitHub: they remain in Val Town environment variables. The deployment workflow updates only the existing `main.ts` file, so its HTTP endpoint and SQLite data remain in place. Source edits made directly in the Val Town editor may be overwritten by the next merge.
