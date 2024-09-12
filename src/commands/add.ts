import {
  alreadyExistAddStreamer,
  successfullyAddStreamer,
} from "../messages/streamers.js";
import { wrongUsage } from "../messages/utils.js";
import { addStreamer, isStreamerExist } from "../services/database.js";

export function addCommand(client, stdin) {
  if (stdin.length == 1) {
    wrongUsage(client, stdin[0]);
    return;
  }
  if (!isStreamerExist(stdin[1])) {
    addStreamer(stdin[1]);
    successfullyAddStreamer(client, stdin[1]);
  } else {
    alreadyExistAddStreamer(client, stdin[1]);
  }
}
