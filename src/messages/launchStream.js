import { escapeUnderscore } from "./utils.js";

export function notifyStreamStart(
  client,
  streamer,
  streamChannelName,
  streamStatus,
) {
  console.log(`notification de live pour ${streamer} : stream started`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === streamChannelName,
  );
  if (channel) {
    const escapedStreamername = escapeUnderscore(streamer);
    channel.send(
      `🚀 @everyone ${escapedStreamername} vient de commencer un stream sur ${
        streamStatus[streamer + "_" + "category"]
      } ! Regardez-le ici: https://www.twitch.tv/${escapedStreamername}`,
    );
  }
}
