"use server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "@/lib/lib";
import { cookies } from "next/headers";

let password = process.env.ACCESS_CODE!;

const ACCESS_CODE = process.env.ACCESS_CODE!;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const verifyAccessCode = async (formData: FormData): Promise<{ success: boolean; error?: string }> => {
  const formPassword = formData.get("password") as string;
  if (formPassword !== process.env.ACCESS_CODE) {
    return { success: false, error: "Wrong access code." };
  }
  return { success: true };
};

export const completeSignUp = async (formData: FormData): Promise<{ success: boolean; error?: string }> => {
  const session = await getSession();
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (password !== process.env.ACCESS_CODE) {
    return { success: false, error: "Invalid access code." };
  }

  session.isLoggedIn = true;
  session.name = name;
  session.email = email;
  await session.save();

  return { success: true };
};
