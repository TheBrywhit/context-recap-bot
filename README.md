# Context Recap Bot

Telegram bot that summarizes recent group messages with `/context N`. It also supports `/context all N` in one configured group.

The production bot runs in [Val Town](https://www.val.town/x/brywhit/context-recap-bot). This repository contains the source of its existing `main.ts` HTTP handler. Message history stays in the val's private SQLite database; Telegram and DeepSeek keys stay in its private environment variables.

## Contributing

Fork this repository and open a pull request against `main`. The owner reviews and merges accepted changes. A [separate Val Town deployer](https://www.val.town/x/brywhit/context-recap-deployer/code/sync.ts) checks the protected `main` branch every 15 minutes and updates only the existing bot's `main.ts` when it changes. The bot's HTTP address, saved messages and private environment variables stay in place. Deployment is usually within 15 minutes after merge, subject to Val Town scheduling and GitHub availability.

Run the local helper checks before submitting a PR:

```sh
node test.mjs
```

GitHub Actions are currently unavailable on this account because GitHub reports a billing lock. Therefore this repository has no mandatory CI check. The owner should review PRs carefully before merging; a merged change affects the running bot on the next successful deployer run. Changes made directly in the Val Town editor can be overwritten on the next deployment. Roll back by reverting the merge commit on GitHub; the deployer will pick up the revert on its next run.
