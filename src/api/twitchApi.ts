import { config } from "../config.ts";
import {
  addToken,
  getStreamers,
  getToken,
  updateLastStream,
  updateToken,
} from "../services/database.ts";
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

const platform: string = "twitch";

async function getTwitchAccessToken(): Promise<string> {
  console.log("Get twitch token");
  const tokenData = getToken(platform);
  const refreshToken = tokenData?.expires_at;
  const now = Date.now();

  // Return if token exist and expire date > 5
  if (tokenData && refreshToken > now + 300 * 1000) {
    console.log("Token from database");
    return tokenData.access_token;
  }

  const authUrl = new URL("https://id.twitch.tv/oauth2/token");
  console.log("Token from twitch api");
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

  // Insert or Update token
  if (!tokenData) {
    console.log("Add twitch token");
    addToken(platform, responseData);
  } else {
    console.log("Update twitch token");
    updateToken(tokenData.id, responseData);
  }

  return responseData.access_token;
}

async function getStreamsOf(
  username: string,
  accessToken: string,
): Promise<StreamerData[]> {
  console.log(`Check if ${username} is on air`);
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

export async function checkIfChannelExist(name: string): Promise<boolean> {
  try {
    const token = await getTwitchAccessToken();
    const twitchApiUrl = new URL("https://api.twitch.tv/helix/users");
    twitchApiUrl.searchParams.set("login", name);

    const headers = new Headers({
      "Client-ID": config.twitchClientId,
      Authorization: `Bearer ${token}`,
    });
    const rawResponse = await fetch(twitchApiUrl.toString(), {
      method: "GET",
      headers,
    });

    const response = await rawResponse.json();
    return (response?.data ?? []).length > 0;
  } catch (error) {
    console.error("Error on twitch channel:", error);
    return false;
  }
}

export async function checkStreams(
  client: Client,
  streamStatus: StreamStatus,
  streamChannelName: string,
  lastStreamTimestamps: { [streamer: string]: number },
) {
  const token = await getTwitchAccessToken();
  const streamers = getStreamers();
  for (const streamerObj of streamers) {
    const streamer = streamerObj.name;
    let streams = null;
    try {
      streams = await getStreamsOf(streamer, token);
    } catch {
      console.log(`Error on twitch data for ${streamer}`);
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
