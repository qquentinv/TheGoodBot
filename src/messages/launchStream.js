function notifyStreamStart(client, streamer, streamChannelName) {
  console.log(`notification de live pour ${streamer}`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === streamChannelName
  );
  if (channel) {
    channel.send(
      `🚀 @everyone ${streamer.replace('_', '\\_')} vient de commencer un stream! Regardez-le ici: https://www.twitch.tv/${streamer}`
    );
  }
}

module.exports = {
  notifyStreamStart,
};
