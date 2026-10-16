import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = (await readFile(new URL("./main.ts", import.meta.url), "utf8"))
  .replace(/import \{ sqlite \} from "https:\/\/esm\.town\/v\/std\/sqlite\/main\.ts";/,
           "const sqlite = {};")
  + "\nexport { parseCommand, messageLink, quote, bodyOf };\n";
const app = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

assert.deepEqual(app.parseCommand("/context 500"), { scope: "local", requested: 500 });
assert.deepEqual(app.parseCommand("/context all 42"), { scope: "all", requested: 42 });
assert.equal(app.parseCommand("/context@other_bot all 42"), null);
assert.equal(app.bodyOf({ voice: {} }), "[голосовое сообщение без подписи]");

const linked = {
  chatId: -1001234, title: "Группа", kind: "supergroup", username: "",
  thread_id: 0, message_id: 7, author: "Миша", body: "Это шутка."
};
assert.equal(app.messageLink(linked), "https://t.me/c/1234/7");
assert.match(app.quote("Шутки:\n• Миша: «Это шутка.»", [linked], 1, false),
             /<a href="https:\/\/t\.me\/c\/1234\/7">«Это шутка\.»<\/a>/);
assert.doesNotMatch(app.quote("Шутки:\n• Миша: «Выдумка.»", [linked], 1, false), /<a /);
assert.equal(app.messageLink({ ...linked, kind: "group" }), null);

console.log("Val Town helper checks passed");
