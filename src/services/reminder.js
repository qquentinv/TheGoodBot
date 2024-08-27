const { reminderIntervalDays } = require("./../../config.json");
const { sendReminder } = require("./../messages/reminderStream");
const msInADay = 24 * 60 * 60 * 1000;

async function checkForReminders(client, streamers, lastStreamTimestamps) {
  const now = Date.now();

  for (const streamer of streamers) {
    const lastStreamTime = lastStreamTimestamps[streamer];

    if (
      lastStreamTime &&
      now - lastStreamTime > reminderIntervalDays * msInADay
    ) {
      sendReminder(client, streamer);
      lastStreamTimestamps[streamer] = now;
    }
  }
}

module.exports = {
  checkForReminders,
};
