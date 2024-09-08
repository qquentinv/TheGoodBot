import config from "../../config.json" with { type: "json" };

export function wrongUsage(client, command) {
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
  );
  if (channel) {
    channel.send(
      `❌ Mauvaise utilisation de \`${command}\`. Utilisez \`!help\` pour voir la liste des commandes.`,
    );
  }
}

export function seeUsage(client) {
  const channel = client.channels.cache.find(
    (ch) => ch.name === config.streamChannelName,
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

/**
 * @param {string} name
 */
export function escapeUnderscore(name) {
  return name.replaceAll("_", "\\_");
}
