import { type CommandInteraction } from "discord.js";
import { getGHContributor } from "../api/githubApi.ts";
import { type ContributorResponse } from "../types/github.ts";

export async function seeUsage(interaction: CommandInteraction) {
  await interaction.reply(`
💻 Liste des commandes disponibles :
* \`/help\` - Voir l'ensemble des commandes.
* \`/streamers\` - Voir tous les streams suivies.
* \`/add <STREAMER>\` - Ajouter un stream à suivre.
* \`/delete <STREAMER>\` - Supprimer un stream suivie.
* \`/laststream <STREAMER>\` - Date du dernier stream.
`);
}

export async function seeContributor(interaction: CommandInteraction) {
  console.log("Display all contributors");

  // récupérer les contributors depuis l'api github
  let contributors: ContributorResponse[] = await getGHContributor(
    "qquentinv",
    "TheGoodBot",
  );

  const message =
    "Merci à toutes les personnes qui ont contribué à ce projet :\n" +
    contributors.reduce<string>((acc, contributor) => {
      acc += `- ${contributor.login}\n`;
      return acc;
    }, "");

  await interaction.reply(message);
}

export function escapeUnderscore(name: string): string {
  return name.replaceAll("_", "\\_");
}
