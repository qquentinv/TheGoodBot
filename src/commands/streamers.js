import { listRegisteredStreamer } from "../messages/streamers.js";
import { getStreamers } from "../services/database.js";

export function streamersCommand(client) {
  let streamers = getStreamers();
  listRegisteredStreamer(client, streamers);
}
