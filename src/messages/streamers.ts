import type { CommandInteraction } from "discord.js";
import { escapeUnderscore } from "./utils.ts";
import type { Streamer } from "../types/streamer.ts";

export async function listRegisteredStreamer(
  interaction: CommandInteraction,
  listStreamers: Streamer[],
): Promise<void> {
  console.log(`List all streamers`);
  const streamers = listStreamers.reduce((acc, current) => {
    return `${acc}\n- ${escapeUnderscore(current.name)} - https://www.twitch.tv/${current.name}`;
  }, "");
  await interaction.reply(
    `Les streamers enregistrés sont les suivants : \n${streamers}`,
  );
}

export async function emptyStreamerList(
  interaction: CommandInteraction,
): Promise<void> {
  console.log(`Empty streamer list`);
  await interaction.reply(
    "Aucun streamer n'a été renseigné pour le moment. Utilisez la commande `/add` pour en ajouter.",
  );
}

export async function successfullyAddStreamer(
  interaction: CommandInteraction,
  name: string,
): Promise<void> {
  console.log(`Added streamer ${name}`);
  await interaction.reply(
    `✅  Les streams de _${escapeUnderscore(name)}_ sont désormais suivis.`,
  );
}

export async function alreadyExistAddStreamer(
  interaction: CommandInteraction,
  name: string,
): Promise<void> {
  await interaction.reply(
    `❗ Les streams de _${escapeUnderscore(name)}_ sont déjà suivis.`,
  );
}

export async function invalidAddStreamer(
  interaction: CommandInteraction,
  name: string,
): Promise<void> {
  await interaction.reply(
    `❗ La chaine twitch de _${escapeUnderscore(name)}_ n'existe pas.`,
  );
}

export async function successfullyRemoveStreamer(
  interaction: CommandInteraction,
  name: string,
): Promise<void> {
  console.log(`Remove streamer ${name}`);
  await interaction.reply(
    `❌  Les streams de _${escapeUnderscore(name)}_ ne sont plus suivis.`,
  );
}
export async function notExistStreamer(
  interaction: CommandInteraction,
  name: string,
): Promise<void> {
  await interaction.reply(
    `❗ Les streams de _${escapeUnderscore(name)}_ ne sont pas suivis.`,
  );
}

export async function lastStream(
  interaction: CommandInteraction,
  name: string,
  date: Date,
) {
  const formatedDate = new Date(date).toLocaleDateString("fr-FR");
  await interaction.reply(
    `📆 Le dernier stream de _${escapeUnderscore(name)}_ date du ${formatedDate}`,
  );
}
