import { Client, GatewayIntentBits } from "discord.js";
import { startBot } from "./services/bot.js";
import { createWordFile } from "./services/generateDocx.js";
import config from "../config.json" with { type: "json" };

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// listener on bot ready
client.on("ready", () => {
  console.log("Discord bot is connected");
  startBot(client);
});

// listener on message
client.on("messageCreate", async (msg) => {
  // check if command === "!word"
  if (msg.author.bot) return;
  if (msg.content.toLowerCase() === "!word") {
    await createWordFile(msg);
  }
});

client.login(config.discordToken);
