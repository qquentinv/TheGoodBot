import { describe, it } from "node:test";
import assert from "node:assert/strict";

export function escapeUnderscore(name: string): string {
  return name.replaceAll("_", "\\_");
}

describe("escape underscore", () => {
  it("should escape for markdown", () => {
    assert.equal(escapeUnderscore("__test__"), "\\_\\_test\\_\\_");
  });
});
