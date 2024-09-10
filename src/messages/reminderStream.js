import { config } from "../config.js";
import { escapeUnderscore } from "./utils.js";

export function sendReminder(client, streamer) {
  console.log(`reminder de dernier live pour ${streamer}`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    const escapedStreamername = escapeUnderscore(streamer);
    channel.send(
      `⏰ Hey ${escapedStreamername}, cela fait un moment que vous n'avez pas streamé ! Reprenez votre stream sur https://www.twitch.tv/${escapedStreamername}`,
    );
  }
}
