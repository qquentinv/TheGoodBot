import type { CommandInteraction } from "discord.js";
import {
  notExistStreamer,
  successfullyRemoveStreamer,
} from "../messages/streamers.ts";
import { isStreamerExist, removeStreamer } from "../services/database.ts";

export async function deleteCommand(
  interaction: CommandInteraction,
): Promise<void> {
  const streamer = interaction.options.getString("streamer");

  if (!isStreamerExist(streamer)) {
    await notExistStreamer(interaction, streamer);
    return;
  }

  removeStreamer(streamer);
  await successfullyRemoveStreamer(interaction, streamer);
}
