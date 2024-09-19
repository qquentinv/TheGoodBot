import { DatabaseSync } from "node:sqlite";
import { config } from "../config.ts";
import type { Streamer } from "../types/streamer.ts";

export const database = new DatabaseSync(config.databasePath);

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
