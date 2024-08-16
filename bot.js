const { checkStreams } = require('./twitchApi');

let streamStatus = {};
const streamChannelName = 'stream';
const streamers = ['bmehdi777', 'striikerrr_', 'theyovach']

async function startBot(client) {
    setInterval(() => checkStreams(client, streamers, streamStatus, streamChannelName), 120000); // Check toutes les deux minutes
}

module.exports = {
    startBot
};