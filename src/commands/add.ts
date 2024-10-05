import type { Client } from "discord.js";
import { checkIfChannelExist } from "../api/twitchApi.ts";
import {
  alreadyExistAddStreamer,
  invalidAddStreamer,
  successfullyAddStreamer,
} from "../messages/streamers.ts";
import { wrongUsage } from "../messages/utils.ts";
import { addStreamer, isStreamerExist } from "../services/database.ts";

export async function addCommand(
  client: Client,
  stdin: string[],
): Promise<void> {
  if (stdin.length == 1 && stdin[0]) {
    wrongUsage(client, stdin[0]);
    return;
  }
  if (!stdin[1]) {
    return;
  }

  if (!isStreamerExist(stdin[1])) {
    if (!(await checkIfChannelExist(stdin[1]))) {
      invalidAddStreamer(client, stdin[1]);
      return;
    }
    addStreamer(stdin[1]);
    successfullyAddStreamer(client, stdin[1]);
  } else {
    alreadyExistAddStreamer(client, stdin[1]);
  }
}
