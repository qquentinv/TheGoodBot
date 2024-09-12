import type { Client, TextChannel } from "discord.js";
import { config } from "../config.ts";

export function wrongUsage(client: Client, command: string) {
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
  if (channel) {
    channel.send(
      `❌ Mauvaise utilisation de \`${command}\`. Utilisez \`!help\` pour voir la liste des commandes.`,
    );
  }
}

export function seeUsage(client: Client) {
  const channel = client.channels.cache.find(
    (ch): ch is TextChannel =>
      (ch as TextChannel).name === config.streamChannelName,
  );
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
