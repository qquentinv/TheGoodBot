const { reminderIntervalDays } = require("./../../config.json");
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

function sendReminder(client, streamer) {
  console.log(`reminder de dernier live pour ${streamer}`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === streamChannelName
  );
  if (channel) {
    channel.send(
      `⏰ Hey ${streamer}, cela fait un moment que vous n'avez pas streamé ! Reprenez votre stream sur https://www.twitch.tv/${streamer}`
    );
  }
}

module.exports = {
  checkForReminders,
};
