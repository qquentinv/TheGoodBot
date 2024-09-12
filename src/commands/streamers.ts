import type { Client } from "discord.js";
import {
  emptyStreamerList,
  listRegisteredStreamer,
} from "../messages/streamers.ts";
import { getStreamers } from "../services/database.ts";

export function streamersCommand(client: Client) {
  let streamers = getStreamers();
  console.log(streamers);
  if (streamers.length > 0) {
    listRegisteredStreamer(client, streamers);
  } else {
    emptyStreamerList(client);
  }
}
