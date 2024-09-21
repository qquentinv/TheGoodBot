import type { Client } from "discord.js";
import {
  alreadyExistAddStreamer,
  successfullyAddStreamer,
} from "../messages/streamers.ts";
import { wrongUsage } from "../messages/utils.ts";
import { addStreamer, isStreamerExist } from "../services/database.ts";

export function addCommand(client: Client, stdin: string[]): void {
  if (stdin.length == 1 && stdin[0]) {
    wrongUsage(client, stdin[0]);
    return;
  }
  if (!stdin[1]) {
    return;
  }

  if (!isStreamerExist(stdin[1])) {
    addStreamer(stdin[1]);
    successfullyAddStreamer(client, stdin[1]);
  } else {
    alreadyExistAddStreamer(client, stdin[1]);
  }
}
