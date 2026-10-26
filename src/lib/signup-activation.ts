import { normalizeDigits } from "./localized-number";
import { oauthReturnPath } from "./oauth-return-path";

export const ACTIVATION_KEY = "novin.signup.pending";
export const RESEND_SECONDS = 60;
export type PendingActivation = {
  email: string;
  next: string;
  createdAt: number;
  sentAt: number;
};
export function authDestination(value: string | null) {
  const path = value ? oauthReturnPath(value) : "/user-panel";
  return /^\/(auth|activate-account|recover|reset-password|forgot-password)(?:[/?#]|$)/.test(
    path,
  )
    ? "/user-panel"
    : path;
}
export function pendingActivation(
  email: string,
  next: string,
  now = Date.now(),
  sent = true,
): PendingActivation {
  return {
    email: email.trim().toLowerCase(),
    next: authDestination(next),
    createdAt: now,
    sentAt: sent ? now : 0,
  };
}
export function readActivation(
  raw: string | null,
  now = Date.now(),
): PendingActivation | null {
  try {
    const data = JSON.parse(raw || "null");
    if (
      !data ||
      typeof data.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      data.email.length > 254 ||
      !Number.isFinite(data.createdAt) ||
      !Number.isFinite(data.sentAt) ||
      data.createdAt > now ||
      now - data.createdAt > 86400000 ||
      data.sentAt > now ||
      data.sentAt < 0 ||
      typeof data.next !== "string"
    )
      return null;
    return {
      email: data.email.trim().toLowerCase(),
      next: authDestination(data.next),
      createdAt: data.createdAt,
      sentAt: data.sentAt,
    };
  } catch {
    return null;
  }
}
export function resendRemaining(sentAt: number, now = Date.now()) {
  return sentAt
    ? Math.max(
        0,
        Math.min(
          RESEND_SECONDS,
          Math.ceil((sentAt + RESEND_SECONDS * 1000 - now) / 1000),
        ),
      )
    : 0;
}
export function activationCode(value: string) {
  return normalizeDigits(value).replace(/\D/g, "").slice(0, 6);
}
// Only public Cloudflare test keys on a local development origin; never a production fallback.
export function captchaSiteKey(
  configured: string | undefined,
  development: boolean,
  hostname: string,
) {
  const key = configured?.trim() || "";
  const testKey = /^[123]x0{10,}/i.test(key);
  const local =
    development && ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
  return local ? key || "1x00000000000000000000AA" : testKey ? "" : key;
}
type OtpGateway = {
  verifyOtp: (input: {
    email: string;
    token: string;
    type: "email";
  }) => PromiseLike<{
    data: {
      session: { user: { email?: string; email_confirmed_at?: string } } | null;
    };
    error: { message: string } | null;
  }>;
};
export async function verifyAccountCode(
  auth: OtpGateway,
  email: string,
  token: string,
) {
  const normalized = activationCode(token);
  if (!/^[0-9]{6}$/.test(normalized) || token.length > 6)
    throw Error("invalid_activation");
  const { data, error } = await auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: normalized,
    type: "email",
  });
  if (error) throw error;
  if (
    !data.session?.user.email_confirmed_at ||
    data.session.user.email?.toLowerCase() !== email.trim().toLowerCase()
  )
    throw Error("unconfirmed_activation");
  return data.session;
}
