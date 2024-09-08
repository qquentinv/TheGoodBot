import {
  notExistStreamer,
  successfullyRemoveStreamer,
} from "../messages/streamers.js";
import { wrongUsage } from "../messages/utils.js";
import { isStreamerExist, removeStreamer } from "../services/database.js";

export function deleteCommand(client, stdin) {
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
