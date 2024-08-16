const axios = require('axios');
const dotenv = require('dotenv');
const { notifyStreamStart } = require('./utils');

dotenv.config();

const twitchClientId = process.env.TWITCH_CLIENT_ID;
const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET;

async function getTwitchAccessToken() {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
            client_id: twitchClientId,
            client_secret: twitchClientSecret,
            grant_type: 'client_credentials'
        }
    });
    return response.data.access_token;
}

async function checkStreams(client, streamers, streamStatus, streamChannelName) {
    const accessToken = await getTwitchAccessToken();
    console.log('Connect to Twitch')
    for (const streamer of streamers) {
        const response = await axios.get('https://api.twitch.tv/helix/streams', {
            headers: {
                'Client-ID': twitchClientId,
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                user_login: streamer
            }
        });
        
        const streamData = response.data.data[0];
        if (streamData) {
            if (!streamStatus[streamer]) {
                streamStatus[streamer] = true;
                notifyStreamStart(client, streamer, streamChannelName);
            }
        } else {
            if (streamStatus[streamer]) {
                streamStatus[streamer] = false;
            }
        }
    }
}

module.exports = {
    checkStreams
};