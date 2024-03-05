import { SessionOptions } from "iron-session";

export type SessionData = {
  name?: string;
  email?: string;
  isLoggiedIn: boolean;
};

export const defaultSession: SessionData = {
  isLoggiedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_ENV!,
  cookieName: "Connor-Session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ttl: 172800,
  },
};
