import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import path from "path";
import process from "process";

const dbPath: string = process.env.DATABASE_PATH || "thegoodbot.db";
const database = new DatabaseSync(dbPath);

function initializeMigrations() {
  database.exec(`
CREATE TABLE IF NOT EXISTS 'migrations' (
	name VARCHAR(1000) PRIMARY KEY NOT NULL,
	done_at DATE
);
	`);
}

function hasMigrationBeenApplied(name: string) {
  const query = database.prepare(
    `SELECT * FROM migrations WHERE migrations.name = (?)`,
  );
  const res = query.all(name);
  if (res.length >= 1) {
    return true;
  }
  return false;
}

function insertMigration(name: string) {
  const query = database.prepare(
    `INSERT INTO migrations (name, done_at) VALUES (?, ?)`,
  );
  query.run(name, Date.now());
}

function applyMigration(content: string) {
  const query = database.prepare(content);
  query.run();
}

function runMigrations() {
  const migrationsFolder = "src/migrations/changes";

  const filesNames = fs
    .readdirSync(migrationsFolder, { withFileTypes: true })
    .filter((item) => !item.isDirectory() && path.extname(item.name) === ".sql")
    .map((file) => file.name);

  let migrationsApplied = 0;
  for (const fileName of filesNames) {
    let migrationContent;

    try {
      migrationContent = fs.readFileSync(
        path.join(migrationsFolder, fileName),
        "utf8",
      );
    } catch (e) {
      console.error(
        `An error occured while reading migration ${fileName} : ${e}`,
      );
      process.exit(1);
    }

    if (!hasMigrationBeenApplied(fileName)) {
      console.log(`Applying migration ${fileName}`);
      applyMigration(migrationContent);
      insertMigration(fileName);
      migrationsApplied++;
    }
  }

  if (migrationsApplied > 0) {
    console.log("Migration has been applied successfully!");
  } else {
    console.log("No migration to apply.");
  }
}

initializeMigrations();
runMigrations();
