import assert from "node:assert/strict";

function getConfig() {
  assert.ok(process.env.DISCORD_TOKEN);
  assert.ok(process.env.TWITCH_CLIENT_ID);
  assert.ok(process.env.TWITCH_CLIENT_SECRET);
  assert.ok(process.env.STREAM_CHANNEL_NAME);
  assert.ok(process.env.TWITCH_REFRESH_TIME);
  assert.ok(process.env.REMINDER_INTERVAL_DAYS);
  assert.ok(process.env.DATABASE_PATH);

  return {
    discordToken: process.env.DISCORD_TOKEN,
    twitchClientId: process.env.TWITCH_CLIENT_ID,
    twitchClientSecret: process.env.TWITCH_CLIENT_SECRET,
    streamChannelName: process.env.STREAM_CHANNEL_NAME,
    twitchRefreshTime: process.env.TWITCH_REFRESH_TIME,
    reminderIntervalDays: process.env.REMINDER_INTERVAL_DAYS,
    databasePath: process.env.DATABASE_PATH,
  };
}

export const config = getConfig();
