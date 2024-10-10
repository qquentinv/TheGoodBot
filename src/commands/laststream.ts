import type { CommandInteraction } from "discord.js";
import { lastStream, notExistStreamer } from "../messages/streamers.ts";
import { getStreamer, isStreamerExist } from "../services/database.ts";

export async function laststreamCommand(
  interaction: CommandInteraction,
): Promise<void> {
  const streamer = interaction.options.getString("streamer");

  if (!isStreamerExist(streamer)) {
    await notExistStreamer(interaction, streamer);
  }

  let streamerDb = getStreamer(streamer);
  console.log(streamerDb);
  await lastStream(interaction, streamerDb.name, streamerDb.last_stream);
}
