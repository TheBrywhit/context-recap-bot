# Context Recap Bot

Telegram bot that summarizes recent group messages with `/context N`. It also supports `/context all N` in one configured group.

The production bot runs in [Val Town](https://www.val.town/x/brywhit/context-recap-bot). This repository contains the source of its existing `main.ts` HTTP handler. Message history stays in the val's private SQLite database; Telegram and DeepSeek keys stay in its private environment variables.

## Contributing

Fork this repository and open a pull request against `main`. The owner reviews and merges accepted changes. A signed GitHub webhook then asks a [separate Val Town deployer](https://www.val.town/x/brywhit/context-recap-deployer/code/sync.ts) to update the existing bot's `main.ts`. The bot's HTTP address and saved messages stay in place. The deployer checks the webhook signature, repository, branch and latest commit before publishing.

Run the local helper checks before submitting a PR:

```sh
node test.mjs
```

GitHub Actions are currently unavailable on this account because GitHub reports a billing lock. Therefore this repository has no mandatory CI check. The owner should review PRs carefully before merging; a merged change immediately affects the running bot. Changes made directly in the Val Town editor can be overwritten by the next merge. Roll back by reverting the merge commit on GitHub; the revert triggers another deployment.
