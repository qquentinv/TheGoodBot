import { readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { exit } from "node:process";
import { styleText, parseArgs } from "node:util";

const {
  values: { config },
} = parseArgs({
  options: {
    config: {
      type: "string",
      default: "./config.json",
      short: "c",
    },
  },
});

if (!existsSync(config)) {
  console.log(
    styleText(
      ["blue"],
      `L'ancien fichier de configuration ("${config}") n'est pas présent ici..`,
    ),
  );
  exit();
}

const file = readFileSync(config, "utf8");
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
    `Le fichier "${config}" a été converti vers ".env.local"`,
  ),
);

rmSync(config);

console.log(
  styleText(["blue"], `Le fichier de configuration "${config}" a été supprimé`),
);
