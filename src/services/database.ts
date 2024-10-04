import { DatabaseSync } from "node:sqlite";
import { config } from "../config.ts";
import type { Streamer } from "../types/streamer.ts";
import type { AuthResponse, TokenData } from "../types/twitch";

export const database = new DatabaseSync(config.databasePath);

// Streamers table
export function getStreamers(): Streamer[] {
  const query = database.prepare(`SELECT * FROM streamers;`);
  return query.all() as Streamer[];
}

export function getStreamer(name: string): Streamer {
  const query = database.prepare(
    `SELECT * FROM streamers WHERE streamers.name = (?)`,
  );
  return query.all(name)[0] as Streamer;
}

export function isStreamerExist(name: string): boolean {
  const res = getStreamer(name);
  if (res) {
    return true;
  }
  return false;
}

export function addStreamer(name: string): void {
  const query = database.prepare(`INSERT INTO streamers (name) VALUES (?)`);
  query.run(name);
}

export function removeStreamer(name: string): void {
  const query = database.prepare(
    `DELETE FROM streamers WHERE streamers.name = (?)`,
  );
  query.run(name);
}

export function updateLastStream(name: string, lastStream: number): void {
  const query = database.prepare(
    `UPDATE streamers SET last_stream = (?) WHERE streamers.name = (?)`,
  );
  query.run(lastStream, name);
}

// Token table
export function getToken(platform: string): TokenData {
  const query = database.prepare(
    `SELECT * FROM token WHERE token.platform = (?)`,
  );
  return query.all(platform)[0] as TokenData;
}

export function addToken(platform: string, tokenInfo: AuthResponse): void {
  const query = database.prepare(
    `INSERT INTO token (platform, type, access_token, expires_at) VALUES (?,?,?,?)`,
  );
  const expiresAt = Date.now() + tokenInfo.expires_in;
  query.run(platform, tokenInfo.token_type, tokenInfo.access_token, expiresAt);
}

export function updateToken(id: number, tokenInfo: AuthResponse): void {
  const query = database.prepare(
    `UPDATE token SET access_token = (?), expires_at = (?) WHERE id = (?)`,
  );
  const expiresAt = Date.now() + tokenInfo.expires_in;
  query.run(tokenInfo.access_token, expiresAt, id);
}
