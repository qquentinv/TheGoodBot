import { Client } from "discord.js";
import { checkStreams } from "../api/twitchApi.ts";
import { config } from "../config.ts";
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
