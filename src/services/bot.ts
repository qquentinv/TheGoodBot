import { Client, Message } from "discord.js";
import { checkStreams } from "../api/twitchApi.js";
import { addCommand } from "../commands/add.js";
import { deleteCommand } from "../commands/delete.js";
import { laststreamCommand } from "../commands/laststream.js";
import { streamersCommand } from "../commands/streamers.js";
import { config } from "../config.js";
import { seeUsage } from "../messages/utils.js";
import { createWordFile } from "./generateDocx.js";
import { checkForReminders } from "./reminder.js";

let streamStatus = {};
let lastStreamTimestamps = {};

export async function startBot(client: Client) {
  setInterval(() => {
    checkStreams(
      client,
      streamStatus,
      config.streamChannelName,
      lastStreamTimestamps,
    );
    checkForReminders(client, lastStreamTimestamps);
  }, config.twitchRefreshTime);
}

export async function handleMessage(client: Client , msg: Message) {
  if (msg.author.bot) return;
  const stdin = msg.content.trim().split(" ");
  switch (stdin[0]) {
    case "!word":
      await createWordFile(msg);
      break;
    case "!streamers":
      streamersCommand(client);
      break;
    case "!add":
      addCommand(client, stdin);
      break;
    case "!delete":
      deleteCommand(client, stdin);
      break;
    case "!laststream":
      laststreamCommand(client, stdin);
      break;
    case "!help":
      seeUsage(client);
      break;
  }
}
