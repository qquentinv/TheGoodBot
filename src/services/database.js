import config from "../../config.json" with { type: "json" };
import { DatabaseSync } from "node:sqlite";
export const database = new DatabaseSync(config.databasePath);


export function getStreamers() {
  const query = database.prepare(`SELECT * FROM streamers;`);
  return query.all();
}
export function getStreamer(name) {
  const query = database.prepare(
    `SELECT * FROM streamers WHERE streamers.name = (?)`,
  );
  return query.all(name)[0];
}

export function isStreamerExist(name) {
  const res = getStreamer(name);
  if (res) {
    return true;
  }
  return false;
}

export function addStreamer(name) {
  const query = database.prepare(`INSERT INTO streamers (name) VALUES (?)`);
  query.run(name);
}

export function removeStreamer(name) {
  const query = database.prepare(
    `DELETE FROM streamers WHERE streamers.name = (?)`,
  );
  query.run(name);
}

export function updateLastStream(name, lastStream) {
  const query = database.prepare(
    `UPDATE streamers SET last_stream = (?) WHERE streamers.name = (?)`,
  );
  query.run(lastStream, name);
}
