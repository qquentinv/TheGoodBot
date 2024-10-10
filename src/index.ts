import { Client, GatewayIntentBits, CommandInteraction } from "discord.js";
import { config } from "./config.ts";
import { startBot } from "./services/bot.ts";
import { registerCommand, launchCommand } from "./services/command.ts";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// listener on bot ready
client.on("ready", async () => {
  console.log("TheGoodBot is connected");
  await registerCommand();
  startBot(client);
});

// listener on message
client.on("interactionCreate", async (interaction: CommandInteraction) => {
  launchCommand(interaction);
});

client.login(config.discordToken);
