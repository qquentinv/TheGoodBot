import {
  emptyStreamerList,
  listRegisteredStreamer,
} from "../messages/streamers.js";
import { getStreamers } from "../services/database.js";

export function streamersCommand(client) {
  let streamers = getStreamers();
  console.log(streamers);
  if (streamers.length > 0) {
    listRegisteredStreamer(client, streamers);
  } else {
    emptyStreamerList(client);
  }
}
