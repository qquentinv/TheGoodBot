import type { Client } from "discord.js";
import {
  notExistStreamer,
  successfullyRemoveStreamer,
} from "../messages/streamers.ts";
import { wrongUsage } from "../messages/utils.ts";
import { isStreamerExist, removeStreamer } from "../services/database.ts";

export function deleteCommand(client: Client, stdin: any[]) {
  if (stdin.length == 1) {
    wrongUsage(client, stdin[0]);
    return;
  }
  if (isStreamerExist(stdin[1])) {
    removeStreamer(stdin[1]);
    successfullyRemoveStreamer(client, stdin[1]);
  } else {
    notExistStreamer(client, stdin[1]);
  }
}
