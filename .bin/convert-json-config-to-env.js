import { readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { exit } from "node:process";
import { styleText } from "node:util";

const configPath = "./config.json";

if (!existsSync(configPath)) {
  console.log(
    styleText(
      ["blue"],
      `L'ancien fichier de configuration ("${configPath}") n'est pas présent ici..`,
    ),
  );
  exit();
}

const file = readFileSync(configPath, "utf8");
const jsonContent = JSON.parse(file);

/**
 * @param {string} value
 */
function camelCaseToSnakeCase(value) {
  return value.replace(/[A-Z]/g, (match) => `_${match}`).toUpperCase();
}

const outputFileLines = [];
for (const [key, value] of Object.entries(jsonContent)) {
  const keySnakeCase = camelCaseToSnakeCase(key);
  outputFileLines.push(`${keySnakeCase}=${value}`);
}

writeFileSync("./.env.local", outputFileLines.join("\n"), "utf8");

console.log(
  styleText(
    ["blue"],
    `Le fichier "${configPath}" a été converti vers ".env.local"`,
  ),
);

rmSync(configPath);

console.log(
  styleText(
    ["blue"],
    `Le fichier de configuration "${configPath}" a été supprimé`,
  ),
);
