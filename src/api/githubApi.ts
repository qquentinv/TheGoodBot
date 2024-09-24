import { type ContributorResponse } from "../types/github.ts";
import assert from "node:assert";

export async function getGHContributor(
  owner: string,
  repo: string,
): Promise<ContributorResponse[]> {
  const contributorUrl = new URL(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
  );

  const rawResponse = await fetch(contributorUrl.toString(), {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  const response: ContributorResponse[] =
    (await rawResponse.json()) as ContributorResponse[];

  assert.ok(response);
  assert.equal(Array.isArray(response), true);

  return response;
}
