import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";
import app from "../app";

let server: any;
let baseUrl: string;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address() as any;
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
    const body: any = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.app, "VoteVerse");
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("access-control-allow-origin"), "http://localhost:5174");
  });

  test("returns simulator data", async () => {
    const response = await fetch(`${baseUrl}/api/simulator-steps`);
    const body: any = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(body.steps));
  });

  // Chat test skipped to avoid hitting real Gemini API during CI/CD
  test.skip("returns Gemini AI response for chat", async () => {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "What is voting?" })
    });
    const body: any = await response.json();

    assert.equal(response.status, 200);
    assert.ok(body.reply);
  });

  test("rejects invalid chat payloads", async () => {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" })
    });
    const body: any = await response.json();

    assert.equal(response.status, 400);
    assert.match(body.error, /required/i);
  });
});


