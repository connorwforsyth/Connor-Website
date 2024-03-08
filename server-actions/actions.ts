"use server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "@/lib/lib";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

let password = process.env.ACCESS_CODE!;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggiedIn) {
    session.isLoggiedIn = defaultSession.isLoggiedIn;
  }
  return session;
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData,
) => {
  const session = await getSession();

  const formName = formData.get("name") as string;
  const formEmail = formData.get("email") as string;
  const formPassword = formData.get("password") as string;

  if (formPassword !== password) {
    return { error: "Wrong access code." };
  }

  session.name = formName;
  session.isLoggiedIn = true;

  await session.save();
  revalidatePath;
};

export const logout = async () => {};
