import type { CommandInteraction } from "discord.js";
import { checkIfChannelExist } from "../api/twitchApi.ts";
import {
  alreadyExistAddStreamer,
  invalidAddStreamer,
  successfullyAddStreamer,
} from "../messages/streamers.ts";
import { addStreamer, isStreamerExist } from "../services/database.ts";

export async function addCommand(
  interaction: CommandInteraction,
): Promise<void> {
  const streamer = interaction.options.getString("streamer");

  // Check if streamer exist in db
  if (isStreamerExist(streamer)) {
    await alreadyExistAddStreamer(interaction, streamer);
    return;
  }

  // Check if streamer exist on twich
  if (!(await checkIfChannelExist(streamer))) {
    await invalidAddStreamer(interaction, streamer);
    return;
  }

  // Add streamer in db
  addStreamer(streamer);
  await successfullyAddStreamer(interaction, streamer);
}
