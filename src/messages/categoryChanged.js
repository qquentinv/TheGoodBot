function notifyCategoryChanged(client, streamer, streamChannelName, streamStatus) {
    console.log(`notification de live pour ${streamer} : category changed`);
    const channel = client.channels.cache.find(
      (ch) => ch.name === streamChannelName
    );
    if (channel) {
      channel.send(
        `🚀 @everyone ${streamer.replace('_', '\\_')} change de jeu. il est maintenant sur ${streamStatus[`${streamer}_category`]} ! Regardez-le ici: https://www.twitch.tv/${streamer}`
      );
    }
  }
  
  module.exports = {
    notifyCategoryChanged,
  };
  