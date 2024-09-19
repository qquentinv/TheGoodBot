import type { Client } from "discord.js";
import { lastStream, notExistStreamer } from "../messages/streamers.ts";
import { wrongUsage } from "../messages/utils.ts";
import { getStreamer, isStreamerExist } from "../services/database.ts";

export function laststreamCommand(client: Client, stdin: any[]): void {
  if (stdin.length == 1) {
    wrongUsage(client, stdin[0]);
    return;
  }
  if (isStreamerExist(stdin[1])) {
    let streamer = getStreamer(stdin[1]);
    lastStream(client, streamer.name, streamer.last_stream);
  } else {
    notExistStreamer(client, stdin[1]);
  }
}
