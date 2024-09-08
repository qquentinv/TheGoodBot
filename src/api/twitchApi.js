import { getStreamers, updateLastStream } from "../services/database.js";
import config from "./../../config.json" with { type: "json" };
import { notifyCategoryChanged } from "./../messages/categoryChanged.js";
import { notifyStreamStart } from "./../messages/launchStream.js";

import assert from "node:assert";

/**
 * @returns {Promise<string>}
 */
async function getTwitchAccessToken() {
  const accessTokenUrl = new URL("https://id.twitch.tv/oauth2/token");
  accessTokenUrl.searchParams.set("client_id", config.twitchClientId)
  accessTokenUrl.searchParams.set("client_secret", config.twitchClientId)
  accessTokenUrl.searchParams.set("grant_type", config.client_credentials)

  const request = await fetch(accessTokenUrl.toString(), {
    method: "POST",
  });

  const response = await request.json();
  assert.ok(response.data.access_token);

  return response.data.access_token;
}

/**
 * @param {string} username
 * @param {string} accessToken
 */
async function getStreamsOf(username, accessToken) {
  const accessTokenUrl = new URL("https://api.twitch.tv/helix/streams");
  accessTokenUrl.searchParams.set("user_login", username);

  const headers = new Headers({
    "Client-ID": config.twitchClientId,
    Authorization: `Bearer ${accessToken}`,
  });
  const request = await fetch(accessTokenUrl.toString(), {
    method: "POST",
    headers,
  });

  const response = await request.json();
  assert.ok(response.data.access_token);
  assert.equal(Array.isArray(response.data), true);

  return response.data;
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
    let streams = null;
    try {
      streams = await getStreamsOf(streamer);
    } catch { }

    const streamData = streams?.[0];
    if (streamData) {
      lastStreamTimestamps[streamer] = Date.now();
      updateLastStream(streamer, Date.now());
      if (!streamStatus[streamer]) {
        streamStatus[streamer] = true;
        streamStatus[`${streamer}_category`] = streamData["game_name"];
        notifyStreamStart(client, streamer, streamChannelName, streamStatus);
      } else if (streamData["game_name"] != streamStatus[`${streamer}_category`]) {
        streamStatus[`${streamer}_category`] = streamData["game_name"];
        notifyCategoryChanged(
          client,
          streamer,
          streamChannelName,
          streamStatus,
        );
      }
    } else if (streamStatus[streamer]) {
      streamStatus[streamer] = false;
    }
  }
}
