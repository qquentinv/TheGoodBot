import type { Client, TextChannel } from "discord.js";
import { escapeUnderscore } from "./utils.ts";

export function notifyCategoryChanged(
  client: Client,
  streamer: string,
  streamChannelName: string,
  streamStatus: any,
) {
  console.log(`notification de live pour ${streamer} : category changed`);
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel => (ch as TextChannel).name === streamChannelName,
  );

  if (channel) {
    const escapedStreamername = escapeUnderscore(streamer);
    channel.send(
      `🚀 @everyone ${escapedStreamername} change de jeu. il est maintenant sur ${streamStatus[`${streamer}_category`]} ! Regardez-le ici: https://www.twitch.tv/${streamer}`,
    );
  }
}
