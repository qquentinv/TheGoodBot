import { Client, GatewayIntentBits } from "discord.js";
import { handleMessage, startBot } from "./services/bot.js";
import config from "../config.json" with { type: "json" };
import { initializeDatabase } from "./services/database.js";

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
  initializeDatabase();
  startBot(client);
});

// listener on message
client.on("messageCreate", async (msg) => {
  handleMessage(client, msg);
});

client.login(config.discordToken);
