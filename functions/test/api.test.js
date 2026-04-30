import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import app from "../app.js";

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe("VoteVerse API", () => {
  test("returns health status and security headers", async () => {
    const response = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: "http://localhost:5174" }
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.app, "VoteVerse");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("access-control-allow-origin"), "http://localhost:5174");
  });

  test("returns simulator data", async () => {
    const response = await fetch(`${baseUrl}/api/simulator-steps`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.steps.length, 4);
    assert.equal(body.steps[0].id, "registration");
  });

  test("matches chat keywords", async () => {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "How do results work?" })
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.match(body.reply, /votes are counted/i);
  });

  test("rejects invalid chat payloads", async () => {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" })
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.error, "Message is required");
  });
}
);
