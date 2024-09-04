const axios = require("axios");
const { notifyStreamStart } = require("./../messages/launchStream");
const { notifyCategoryChanged } = require("./../messages/categoryChanged")
const { twitchClientId, twitchClientSecret } = require("./../../config.json");

async function getTwitchAccessToken() {
  const response = await axios.post("https://id.twitch.tv/oauth2/token", null, {
    params: {
      client_id: twitchClientId,
      client_secret: twitchClientSecret,
      grant_type: "client_credentials",
    },
  });
  return response.data.access_token;
}

async function checkStreams(
  client,
  streamers,
  streamStatus,
  streamChannelName,
  lastStreamTimestamps
) {
  const accessToken = await getTwitchAccessToken();
  console.log("Connect to Twitch");
  for (const streamer of streamers) {
    const response = await axios.get("https://api.twitch.tv/helix/streams", {
      headers: {
        "Client-ID": twitchClientId,
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        user_login: streamer,
      },
    });

    const streamData = response.data.data[0];
    if (streamData) {
      lastStreamTimestamps[streamer] = Date.now();
      if (!streamStatus[streamer]) {
        streamStatus[streamer] = true;
        streamStatus[`${streamer}_category`] = streamData["game_name"]
        notifyStreamStart(client, streamer, streamChannelName, streamStatus);
      }
      else{
        if(streamData["game_name"] != streamStatus[`${streamer}_category`]){
          streamStatus[`${streamer}_category`] = streamData["game_name"]
          notifyCategoryChanged(client, streamer, streamChannelName, streamStatus);
        }
      }
    } else {
      if (streamStatus[streamer]) {
        streamStatus[streamer] = false;
      }
    }
  }
}

module.exports = {
  checkStreams,
};
