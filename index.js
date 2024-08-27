const { Client, GatewayIntentBits } = require("discord.js");
const bot = require("./src/services/bot.js");
const { createWordFile } = require("./src/services/generateDocx.js");
const { discordToken } = require("./config.json");

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
  bot.startBot(client);
});

// listener on message
client.on("messageCreate", async (msg) => {
  // check if command === "!word"
  if (msg.author.bot) return;
  if (msg.content.toLowerCase() === "!word") {
    await createWordFile(msg);
  }
});

client.login(discordToken);
