export function sendReminder(client, streamer) {
  console.log(`reminder de dernier live pour ${streamer}`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === streamChannelName
  );
  if (channel) {
    channel.send(
      `⏰ Hey ${streamer}, cela fait un moment que vous n'avez pas streamé ! Reprenez votre stream sur https://www.twitch.tv/${streamer}`
    );
  }
}
