const { streamChannelName, streamers } = require("./../../config.json");
const { checkStreams } = require("../api/twitchApi");
const { checkForReminders } = require("./reminder");

let streamStatus = {};
let lastStreamTimestamps = {};

async function startBot(client) {
  setInterval(() => {
    checkStreams(
      client,
      streamers,
      streamStatus,
      streamChannelName,
      lastStreamTimestamps
    );
    checkForReminders(client, streamers, lastStreamTimestamps);
  }, 120000); // Check toutes les deux minutes
}

module.exports = {
  startBot,
};
