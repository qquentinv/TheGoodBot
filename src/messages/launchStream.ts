import type { Client, TextChannel } from "discord.js";
import { escapeUnderscore } from "./utils.ts";

export function notifyStreamStart(
  client: Client,
  streamer: string,
  streamChannelName: string,
  streamStatus: any,
) {
  console.log(`Stream notification for ${streamer} : stream started`);
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel => (ch as TextChannel).name === streamChannelName,
  );
  if (channel) {
    const escapedStreamername = escapeUnderscore(streamer);
    channel.send(
      `🚀 @everyone ${escapedStreamername} vient de commencer un stream sur ${
        streamStatus[streamer + "_" + "category"]
      } ! Regardez-le ici: https://www.twitch.tv/${streamer}`,
    );
  }
}
