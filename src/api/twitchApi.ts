import { config } from "../config.ts";
import { getStreamers, updateLastStream } from "../services/database.ts";
import { notifyCategoryChanged } from "../messages/categoryChanged.ts";
import { notifyStreamStart } from "../messages/launchStream.ts";

import assert from "node:assert";
import type { Client } from "discord.js";
import type {
  AuthResponse,
  StreamerData,
  StreamerResponse,
} from "../types/twitch";
import type { StreamStatus } from "../types/streamer";

async function getTwitchAccessToken(): Promise<string> {
  const authUrl = new URL("https://id.twitch.tv/oauth2/token");

  const rawResponse = await fetch(authUrl.toString(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: config.twitchClientId,
      client_secret: config.twitchClientSecret,
      grant_type: "client_credentials",
    }),
  });

  const responseData: AuthResponse = (await rawResponse.json()) as AuthResponse;
  assert.ok(responseData.access_token);

  return responseData.access_token;
}

async function getStreamsOf(
  username: string,
  accessToken: string,
): Promise<StreamerData[]> {
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

  const response: StreamerResponse =
    (await rawResponse.json()) as StreamerResponse;
  assert.ok(response.data);
  assert.equal(Array.isArray(response.data), true);

  return response.data;
}

export async function checkStreams(
  client: Client,
  streamStatus: StreamStatus,
  streamChannelName: string,
  lastStreamTimestamps: { [streamer: string]: number },
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
      console.log(
        `Erreur lors de la récupération des données du streamer ${streamer}`,
      );
    }

    const streamData = streams?.[0];
    if (streamData) {
      lastStreamTimestamps[streamer] = Date.now();
      updateLastStream(streamer, Date.now());
      if (!streamStatus[streamer]) {
        streamStatus[streamer] = true;
        streamStatus[`${streamer}_category`] = streamData["game_name"];
        notifyStreamStart(client, streamer, streamChannelName, streamStatus);
      } else if (
        streamData["game_name"] != streamStatus[`${streamer}_category`]
      ) {
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
