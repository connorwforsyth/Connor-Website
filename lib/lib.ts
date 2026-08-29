import crypto from "node:crypto";

export type SessionData = {
  name?: string;
  email?: string;
  isLoggedIn: boolean;
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

const COOKIE_NAME = "Connor-Session";
const MAX_AGE_SECONDS = 172_800; // 2 days
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

function getKey(): Buffer {
  const secret = process.env.SESSION_ENV;
  if (!secret) {
    throw new Error("Missing SESSION_ENV environment variable");
  }
  return crypto.createHash("sha256").update(secret).digest();
}

type SignedSession = SessionData & { expiresAt: number };

function encodeSession(data: SessionData): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  const payload: SignedSession = {
    ...data,
    expiresAt: Date.now() + MAX_AGE_SECONDS * 1000,
  };
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [iv, ciphertext, authTag]
    .map((buf) => buf.toString("base64url"))
    .join(".");
}

function decodeSession(cookieValue: string): SessionData | null {
  const [ivPart, ciphertextPart, authTagPart] = cookieValue.split(".");
  if (!(ivPart && ciphertextPart && authTagPart)) {
    return null;
  }

  try {
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      getKey(),
      Buffer.from(ivPart, "base64url")
    );
    decipher.setAuthTag(Buffer.from(authTagPart, "base64url"));
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(ciphertextPart, "base64url")),
      decipher.final(),
    ]).toString("utf8");

    const data: SignedSession = JSON.parse(plaintext);
    if (Date.now() > data.expiresAt) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export const sessionCookie = {
  create(data: SessionData): string {
    return encodeSession(data);
  },
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    maxAge: MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  },
  read(value: string | undefined): SessionData {
    if (!value) {
      return defaultSession;
    }
    return decodeSession(value) ?? defaultSession;
  },
};
