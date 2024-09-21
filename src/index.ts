import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config.ts";
import { handleMessage, startBot } from "./services/bot.ts";

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
  handleMessage(client, msg);
});

client.login(config.discordToken);
