import config from "../../config.json" with { type: "json" };
import { checkForReminders } from "./reminder.js";
import { checkStreams } from "../api/twitchApi.js";
import { createWordFile } from "./generateDocx.js";
import {
  addStreamer,
  getStreamer,
  getStreamers,
  isStreamerExist,
  removeStreamer,
} from "./database.js";
import {
  alreadyExistAddStreamer,
  lastStream,
  listRegisteredStreamer,
  notExistStreamer,
} from "../messages/streamers.js";
import {
  successfullyAddStreamer,
  successfullyRemoveStreamer,
} from "../messages/streamers.js";
import { seeUsage, wrongUsage } from "../messages/utils.js";

let streamStatus = {};
let lastStreamTimestamps = {};

export async function startBot(client) {
  setInterval(() => {
    checkStreams(
      client,
      streamStatus,
      config.streamChannelName,
      lastStreamTimestamps,
    );
    checkForReminders(client, lastStreamTimestamps);
  }, 12000); // Check toutes les deux minutes
}

export async function handleMessage(client, msg) {
  if (msg.author.bot) return;
  const stdin = msg.content.trim().split(" ");
  switch (stdin[0]) {
    case "!word":
      await createWordFile(msg);
      break;
    case "!streamers":
      let streamers = getStreamers();
      listRegisteredStreamer(client, streamers);
      break;
    case "!add":
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
      break;
    case "!delete":
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
      break;
    case "!laststream":
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
      break;
    case "!help":
      seeUsage(client);
      break;
  }
}
