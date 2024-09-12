import { Client, Message } from "discord.js";
import { checkStreams } from "../api/twitchApi.ts";
import { addCommand } from "../commands/add.ts";
import { deleteCommand } from "../commands/delete.ts";
import { laststreamCommand } from "../commands/laststream.ts";
import { streamersCommand } from "../commands/streamers.ts";
import { config } from "../config.ts";
import { seeUsage } from "../messages/utils.ts";
import { createWordFile } from "./generateDocx.ts";
import { checkForReminders } from "./reminder.ts";

let streamStatus = {};
let lastStreamTimestamps = {};

export async function startBot(client: Client): Promise<void> {
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

export async function handleMessage(client: Client , msg: Message): Promise<void> {
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
