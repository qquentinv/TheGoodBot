import axios from "axios";
import { notifyStreamStart } from "./../messages/launchStream.js";
import { notifyCategoryChanged } from "./../messages/categoryChanged.js";
import config from "./../../config.json" with { type: "json" };
import { getStreamers, updateLastStream } from "../services/database.js";

async function getTwitchAccessToken() {
  const response = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: config.twitchClientId,
      client_secret: config.twitchClientSecret,
      grant_type: "client_credentials",
    },
  });
  return response.data.access_token;
}

export async function checkStreams(
  client,
  streamStatus,
  streamChannelName,
  lastStreamTimestamps,
) {
  const accessToken = await getTwitchAccessToken();
  console.log("Connect to Twitch");
  const streamers = getStreamers();
  for (const streamerObj of streamers) {
    const streamer = streamerObj.name;
    let response;
    try {
      response = await axios.get("https://api.twitch.tv/helix/streams", {
        headers: {
          "Client-ID": config.twitchClientId,
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          user_login: streamer,
        },
      });
    } catch (e) {
			continue;
    }

    const streamData = response.data.data[0];
    if (streamData) {
      lastStreamTimestamps[streamer] = Date.now();
      updateLastStream(streamer, Date.now());
      if (!streamStatus[streamer]) {
        streamStatus[streamer] = true;
        streamStatus[`${streamer}_category`] = streamData["game_name"];
        notifyStreamStart(client, streamer, streamChannelName, streamStatus);
      } else {
        if (streamData["game_name"] != streamStatus[`${streamer}_category`]) {
          streamStatus[`${streamer}_category`] = streamData["game_name"];
          notifyCategoryChanged(
            client,
            streamer,
            streamChannelName,
            streamStatus,
          );
        }
      }
    } else {
      if (streamStatus[streamer]) {
        streamStatus[streamer] = false;
      }
    }
  }
}
