import { escapeUnderscore } from "./utils.js";

export function notifyCategoryChanged(client, streamer, streamChannelName, streamStatus) {
    console.log(`notification de live pour ${streamer} : category changed`);
    const channel = client.channels.cache.find(
      (ch) => ch.name === streamChannelName
    );
    if (channel) {
      const escapedStreamername = escapeUnderscore(streamer);
      channel.send(
        `🚀 @everyone ${escapedStreamername} change de jeu. il est maintenant sur ${streamStatus[`${streamer}_category`]} ! Regardez-le ici: https://www.twitch.tv/${escapedStreamername}`
      );
    }
  }
