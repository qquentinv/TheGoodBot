import config from "../../config.json" with { type: "json" };
import { checkForReminders } from "./reminder.js"
import { checkStreams } from "../api/twitchApi.js"

let streamStatus = {};
let lastStreamTimestamps = {};

export async function startBot(client) {
  setInterval(() => {
    checkStreams(
      client,
      config.streamers,
      streamStatus,
      config.streamChannelName,
      lastStreamTimestamps
    );
    checkForReminders(client, config.streamers, lastStreamTimestamps);
  }, 120000); // Check toutes les deux minutes
}
