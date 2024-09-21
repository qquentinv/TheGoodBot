import assert from "node:assert/strict";

function getConfig() {
  const discordToken = process.env.DISCORD_TOKEN;
  const twitchClientId = process.env.TWITCH_CLIENT_ID;
  const twitchClientSecret = process.env.TWITCH_CLIENT_SECRET;
  const streamChannelName = process.env.STREAM_CHANNEL_NAME;
  const twitchRefreshTime = Number.parseInt(
    process.env.TWITCH_REFRESH_TIME ?? '120000',
    10,
  );
  const reminderIntervalDays = Number.parseInt(
    process.env.REMINDER_INTERVAL_DAYS ?? '7',
    10,
  );
  const databasePath = process.env.DATABASE_PATH;

  assert.ok(discordToken, "`DISCORD_TOKEN` doit être défini");
  assert.ok(twitchClientId, "`TWITCH_CLIENT_ID` doit être défini");
  assert.ok(twitchClientSecret, "`TWITCH_CLIENT_SECRET` doit être défini");
  assert.ok(streamChannelName, "`STREAM_CHANNEL_NAME` doit être défini");
  assert.ok(twitchRefreshTime, "`TWITCH_REFRESH_TIME` doit être défini");
  assert.ok(reminderIntervalDays, "`REMINDER_INTERVAL_DAYS` doit être défini");
  assert.ok(databasePath, "`DATABASE_PATH` doit être défini");

  assert.equal(
    Number.isInteger(twitchRefreshTime),
    true,
    "`TWITCH_REFRESH_TIME` doit être un entier !",
  );

  assert.equal(
    Number.isInteger(reminderIntervalDays),
    true,
    "`REMINDER_INTERVAL_DAYS` doit être un entier !",
  );

  return {
    discordToken,
    twitchClientId,
    twitchClientSecret,
    streamChannelName,
    twitchRefreshTime,
    reminderIntervalDays,
    databasePath,
  };
}

export const config = getConfig();
