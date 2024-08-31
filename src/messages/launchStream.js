function notifyStreamStart(client, streamer, streamChannelName, streamStatus) {
  console.log(`notification de live pour ${streamer} : stream started`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === streamChannelName
  );
  if (channel) {
    channel.send(
      `🚀 @everyone ${streamer.replace('_', '\\_')} vient de commencer un stream sur ${streamStatus[new String(streamer + "_" + "category")]} ! Regardez-le ici: https://www.twitch.tv/${streamer}`
    );
  }
}

module.exports = {
  notifyStreamStart,
};
