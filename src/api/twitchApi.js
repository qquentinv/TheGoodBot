import { config } from "../config.js";
import { getStreamers, updateLastStream } from "../services/database.js";
import { notifyCategoryChanged } from "./../messages/categoryChanged.js";
import { notifyStreamStart } from "./../messages/launchStream.js";

import assert from "node:assert";

/**
 * @returns {Promise<string>}
 */
async function getTwitchAccessToken() {
  const authUrl = new URL("https://id.twitch.tv/oauth2/token");

  const rawResponse = await fetch(authUrl.toString(), {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        client_id: config.twitchClientId,
        client_secret: config.twitchClientSecret,
        grant_type:  "client_credentials"
      }
    )
  });

  const responseData = await rawResponse.json();
  assert.ok(responseData.access_token);

  return responseData.access_token;
}

/**
 * @param {string} username
 * @param {string} accessToken
 */
async function getStreamsOf(username, accessToken) {
  const twitchApiUrl = new URL("https://api.twitch.tv/helix/streams");
  twitchApiUrl.searchParams.set("user_login", username);

  const headers = new Headers({
    "Client-ID": config.twitchClientId,
    Authorization: `Bearer ${accessToken}`,
  });
  const rawResponse = await fetch(twitchApiUrl.toString(), {
    method: "GET",
    headers,
  });

  const response = await rawResponse.json();
  assert.ok(response.data);
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
      streams = await getStreamsOf(streamer, accessToken);
    } catch {
      console.log(`Erreur lors de la récupération des données du streamer ${streamer}`);
    }

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
