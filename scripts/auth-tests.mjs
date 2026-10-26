import test from "node:test";
import assert from "node:assert/strict";
import {
  activationCode,
  authDestination,
  captchaSiteKey,
  pendingActivation,
  readActivation,
  resendRemaining,
  verifyAccountCode,
} from "../src/lib/signup-activation.ts";

test("activation accepts Persian and Arabic digits without sending formatted digits to Auth", async () => {
  let input;
  const session = {
    user: {
      email: "person@example.com",
      email_confirmed_at: "2026-10-23T09:00:00Z",
    },
  };
  const gateway = {
    verifyOtp: async (params) => {
      input = params;
      return { data: { session }, error: null };
    },
  };
  assert.equal(activationCode("١۲۳۴۵۶"), "123456");
  assert.equal(
    await verifyAccountCode(gateway, " Person@Example.com ", "١۲۳۴۵۶"),
    session,
  );
  assert.deepEqual(input, {
    email: "person@example.com",
    token: "123456",
    type: "email",
  });
});
test("invalid or overlong activation codes never reach the Auth API", async () => {
  let calls = 0;
  const gateway = {
    verifyOtp: async () => {
      calls++;
      throw Error("should not call");
    },
  };
  for (const code of ["12345", "1234567", "12a456", ""]) {
    await assert.rejects(
      verifyAccountCode(gateway, "person@example.com", code),
      /invalid_activation/,
    );
  }
  assert.equal(calls, 0);
});
test("activation rejects an expired code and never treats API failure as a session", async () => {
  await assert.rejects(
    verifyAccountCode(
      {
        verifyOtp: async () => ({
          data: { session: null },
          error: Error("otp_expired"),
        }),
      },
      "person@example.com",
      "123456",
    ),
    /otp_expired/,
  );
});
test("activation requires a confirmed session belonging to the email being verified", async () => {
  for (const session of [
    null,
    { user: { email: "person@example.com" } },
    { user: { email: "other@example.com", email_confirmed_at: "now" } },
  ]) {
    await assert.rejects(
      verifyAccountCode(
        { verifyOtp: async () => ({ data: { session }, error: null }) },
        "person@example.com",
        "123456",
      ),
      /unconfirmed_activation/,
    );
  }
});
test("pending activation stores only email and return route with a bounded lifetime", () => {
  const time = 100000000;
  const pending = pendingActivation(
    " Person@Example.com ",
    "/user-panel?view=wallet",
    time,
  );
  assert.deepEqual(Object.keys(pending).sort(), [
    "createdAt",
    "email",
    "next",
    "sentAt",
  ]);
  assert.deepEqual(readActivation(JSON.stringify(pending), time), pending);
  assert.equal(readActivation(JSON.stringify(pending), time - 1), null);
  assert.equal(readActivation(JSON.stringify(pending), time + 86400001), null);
  assert.equal(readActivation('{"email":"bad"}', time), null);
  assert.equal(readActivation("broken", time), null);
});
test("activation return paths reject external destinations and auth redirect loops", () => {
  assert.equal(authDestination(null), "/user-panel");
  assert.equal(authDestination("https://evil.example"), "/");
  assert.equal(authDestination("//evil.example"), "/");
  assert.equal(authDestination("/activate-account?next=/auth"), "/user-panel");
  assert.equal(authDestination("/auth#token"), "/user-panel");
  assert.equal(
    authDestination("/.lovable/oauth/consent?client_id=public"),
    "/.lovable/oauth/consent?client_id=public",
  );
});
test("resend cooldown survives a reload and cannot be negative", () => {
  assert.equal(resendRemaining(100000, 100000), 60);
  assert.equal(resendRemaining(100000, 130500), 30);
  assert.equal(resendRemaining(100000, 160000), 0);
  assert.equal(resendRemaining(100000, 170000), 0);
  assert.equal(resendRemaining(0, 100000), 0);
  const saved = pendingActivation("person@example.com", "/user-panel", 100000);
  assert.equal(
    resendRemaining(
      readActivation(JSON.stringify(saved), 130000).sentAt,
      130000,
    ),
    30,
  );
});
test("CAPTCHA never falls back to a public test key outside local development", () => {
  assert.equal(
    captchaSiteKey(undefined, true, "127.0.0.1"),
    "1x00000000000000000000AA",
  );
  assert.equal(captchaSiteKey(undefined, false, "127.0.0.1"), "");
  assert.equal(captchaSiteKey(undefined, true, "preview.novinvds.example"), "");
  assert.equal(
    captchaSiteKey("1x00000000000000000000AA", false, "novinvds.example"),
    "",
  );
  assert.equal(
    captchaSiteKey("2x00000000000000000000AB", false, "novinvds.example"),
    "",
  );
  assert.equal(
    captchaSiteKey(" 0x-real-site-key ", false, "novinvds.example"),
    "0x-real-site-key",
  );
});
