import type { Client, TextChannel } from "discord.js";
import { config } from "../config.ts";
import { escapeUnderscore } from "./utils.ts";

export function sendReminder(client: Client, streamer: string) {
  console.log(`reminder de dernier live pour ${streamer}`);
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel => (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    const escapedStreamername = escapeUnderscore(streamer);
    channel.send(
      `⏰ Hey ${escapedStreamername}, cela fait un moment que vous n'avez pas streamé ! Reprenez votre stream sur https://www.twitch.tv/${streamer}`,
    );
  }
}
