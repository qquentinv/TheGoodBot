import { ChannelType, type Client, type TextChannel } from "discord.js";
import { config } from "../config.ts";

export function wrongUsage(client: Client, command: string) {
  const channel = getTextChannel(client);
  if (channel) {
    channel.send(
      `❌ Mauvaise utilisation de \`${command}\`. Utilisez \`!help\` pour voir la liste des commandes.`,
    );
  }
}

export function seeUsage(client: Client) {
  const channel = getTextChannel(client);
  if (channel) {
    channel.send(`
💻 Liste des commandes disponibles :
* \`!help\` - Voir l'ensemble des commandes.
* \`!streamers\` - Voir tous les streams suivies.
* \`!add <STREAMER>\` - Ajouter un stream à suivre.
* \`!delete <STREAMER>\` - Supprimer un stream suivie.
* \`!laststream <STREAMER>\` - Date du dernier stream.
`);
  }
}

export function escapeUnderscore(name: string): string {
  return name.replaceAll("_", "\\_");
}

function getTextChannel(client: Client): TextChannel | undefined {
  return client.channels.cache.find(
    (ch): ch is TextChannel =>
      ch.type === ChannelType.GuildText && ch.name === config.streamChannelName,
  );
}
