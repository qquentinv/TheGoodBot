import { config } from "../config.js";
import { sendReminder } from "../messages/reminderStream.js";
import { getStreamers } from "./database.js";
const msInADay = 24 * 60 * 60 * 1000;

export async function checkForReminders(client, lastStreamTimestamps) {
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
