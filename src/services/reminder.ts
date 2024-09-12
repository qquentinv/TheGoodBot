import type { Client } from "discord.js";
import { config } from "../config.ts";
import { sendReminder } from "../messages/reminderStream.ts";
import { getStreamers } from "./database.ts";

const msInADay = 24 * 60 * 60 * 1000;

export async function checkForReminders(
  client: Client,
  lastStreamTimestamps: { [x: string]: number; },
) {
  const now = Date.now();

  const streamers = getStreamers();
  for (const streamerObj of streamers) {
    const streamer = streamerObj.name;
    const lastStreamTime = lastStreamTimestamps[streamer];

    if (
      lastStreamTime &&
      now - lastStreamTime > config.reminderIntervalDays * msInADay
    ) {
      sendReminder(client, streamer);
      lastStreamTimestamps[streamer] = now;
    }
  }
}
