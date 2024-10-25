import { Routes } from "discord.js";
import { addCommand } from "../commands/add.ts";
import { deleteCommand } from "../commands/delete.ts";
import { REST, CommandInteraction } from "discord.js";
import { laststreamCommand } from "../commands/laststream.ts";
import { streamersCommand } from "../commands/streamers.ts";
import { config } from "../config.ts";
import { seeUsage, seeContributor } from "../messages/utils.ts";
// import { createWordFile } from "./generateDocx.ts";

export async function registerCommand(): Promise<void> {
  const commands = [
    {
      name: "word",
      description: "Crée un fichier Word.",
    },
    {
      name: "streamers",
      description: "Affiche la liste des streamers",
    },
    {
      name: "add",
      description: "Ajoute un streamer",
      options: [
        {
          name: "streamer",
          description: "Nom de la chaine twitch",
          type: 3, // Type string
          required: true,
        },
      ],
    },
    {
      name: "delete",
      description: "Supprime un streamer",
      options: [
        {
          name: "streamer",
          description: "Nom de la chaine twitch",
          type: 3, // Type string
          required: true,
        },
      ],
    },
    {
      name: "laststream",
      description: "Affiche les informations du dernier stream.",
      options: [
        {
          name: "streamer",
          description: "Nom de la chaine twitch",
          type: 3, // Type string
          required: true,
        },
      ],
    },
    {
      name: "help",
      description: "Affiche l'aide.",
    },
    {
      name: "contributor",
      description: "Affiche la liste des contributeurs du projet.",
    },
  ];

  const rest = new REST({ version: "10" }).setToken(config.discordToken);

  try {
    console.log("Register discord command");

    await rest.put(Routes.applicationCommands(config.discordApplicationId), {
      body: commands,
    });

    console.log("Discord command successfully register");
  } catch (error) {
    console.error("Error on discord command register", error);
  }
}

export async function launchCommand(
  interaction: CommandInteraction,
): Promise<void> {
  console.log(
    `User @${interaction.user.username} launch ${interaction.commandName} command`,
  );
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "word":
      await interaction.reply("HS pour le moment");
      // await createWordFile(interaction);
      break;
    case "streamers":
      await streamersCommand(interaction);
      break;
    case "add":
      await addCommand(interaction);
      break;
    case "delete":
      await deleteCommand(interaction);
      break;
    case "laststream":
      await laststreamCommand(interaction);
      break;
    case "help":
      await seeUsage(interaction);
      break;
    case "contributor":
      await seeContributor(interaction);
      break;
    default:
      await interaction.reply({
        content: "Commande inconnue.",
        ephemeral: true,
      });
      break;
  }
}
