import type { Client, TextChannel } from "discord.js";
import { config } from "../config.ts";
import { escapeUnderscore } from "./utils.ts";
import type { Streamer } from "../types/streamer.ts";

export function listRegisteredStreamer(
  client: Client,
  listStreamers: Streamer[],
): void {
  console.log(`list all streamers`);
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
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

export function emptyStreamerList(client: Client): void {
  console.log(`empty streamer list`);
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    channel.send(
      "Aucun streamer n'a été renseigné pour le moment. Utilisez la commande `!add` pour en ajouter.",
    );
  }
}

export function successfullyAddStreamer(client: Client, name: string): void {
  console.log(`added streamer ${name}`);
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    channel.send(
      `✅  Les streams de _${escapeUnderscore(name)}_ sont désormais suivis.`,
    );
  }
}
export function alreadyExistAddStreamer(client: Client, name: string): void {
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    channel.send(
      `❗ Les streams de _${escapeUnderscore(name)}_ sont déjà suivis.`,
    );
  }
}

export function successfullyRemoveStreamer(client: Client, name: string): void {
  console.log(`remove streamer ${name}`);
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    channel.send(
      `❌  Les streams de _${escapeUnderscore(name)}_ ne sont plus suivis.`,
    );
  }
}
export function notExistStreamer(client: Client, name: string): void {
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    channel.send(
      `❗ Les streams de _${escapeUnderscore(name)}_ ne sont pas suivis.`,
    );
  }
}

export function lastStream(client: Client, name: string, date: Date) {
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    const formatedDate = new Date(date).toLocaleDateString("fr-FR");
    channel.send(
      `📆 Le dernier stream de _${escapeUnderscore(name)}_ date du ${formatedDate}`,
    );
  }
}
