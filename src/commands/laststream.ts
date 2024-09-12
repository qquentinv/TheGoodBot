import { lastStream, notExistStreamer } from "../messages/streamers.js";
import { wrongUsage } from "../messages/utils.js";
import { getStreamer, isStreamerExist } from "../services/database.js";

export function laststreamCommand(client, stdin) {
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
