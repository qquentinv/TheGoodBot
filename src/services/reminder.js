import config from "./../../config.json" with { type: "json" };
import { sendReminder } from "./../messages/reminderStream.js";
const msInADay = 24 * 60 * 60 * 1000;

export async function checkForReminders(client, streamers, lastStreamTimestamps) {
  const now = Date.now();

  for (const streamer of streamers) {
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
