import type { CommandInteraction } from "discord.js";
import {
  emptyStreamerList,
  listRegisteredStreamer,
} from "../messages/streamers.ts";
import { getStreamers } from "../services/database.ts";

export async function streamersCommand(
  interaction: CommandInteraction,
): Promise<void> {
  let streamers = getStreamers();
  if (streamers.length > 0) {
    await listRegisteredStreamer(interaction, streamers);
  } else {
    await emptyStreamerList(interaction);
  }
}
