import { config } from "../config.js";
import { escapeUnderscore } from "./utils.js";

export function listRegisteredStreamer(client, listStreamers) {
  console.log(`list all streamers`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    const streamers = listStreamers.reduce((acc, current) => {
      return `${acc}\n- ${escapeUnderscore(current.name)} - https://www.twitch.tv/${current.name}`;
    }, "");
    channel.send(
      `Les streamers enregistrés sont les suivants : \n${streamers}`,
    );
  }
}

export function successfullyAddStreamer(client, name) {
  console.log(`added streamer ${name}`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    channel.send(`✅  Les streams de _${escapeUnderscore(name)}_ sont désormais suivis.`);
  }
}
export function alreadyExistAddStreamer(client, name) {
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    channel.send(`❗ Les streams de _${escapeUnderscore(name)}_ sont déjà suivis.`);
  }
}

export function successfullyRemoveStreamer(client, name) {
  console.log(`remove streamer ${name}`);
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    channel.send(`❌  Les streams de _${escapeUnderscore(name)}_ ne sont plus suivis.`);
  }
}
export function notExistStreamer(client, name) {
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    channel.send(`❗ Les streams de _${escapeUnderscore(name)}_ ne sont pas suivis.`);
  }
}

export function lastStream(client, name, date) {
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    let formatedDate = new Date(date);
    formatedDate = formatedDate.toLocaleDateString("fr-FR");
    channel.send(`📆 Le dernier stream de _${escapeUnderscore(name)}_ date du ${formatedDate}`);
  }
}
