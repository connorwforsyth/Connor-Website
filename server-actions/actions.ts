"use server";
import { cookies } from "next/headers";
import { defaultSession, sessionCookie } from "@/lib/lib";

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = sessionCookie.read(
    cookieStore.get(sessionCookie.name)?.value
  );

  // Return only the serializable data
  return {
    email: session.email || "",
    isLoggedIn: session.isLoggedIn || defaultSession.isLoggedIn,
    name: session.name || "",
  };
};

export const verifyAccessCode = async (
  formData: FormData
): Promise<{ success: boolean; error?: string }> => {
  const formPassword = formData.get("password") as string;
  if (formPassword !== process.env.ACCESS_CODE) {
    return { error: "Wrong access code.", success: false };
  }
  return { success: true };
};

export const completeSignUp = async (
  formData: FormData
): Promise<{ success: boolean; error?: string }> => {
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (password !== process.env.ACCESS_CODE) {
    return { error: "Invalid access code.", success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.create({ email, isLoggedIn: true, name }),
    sessionCookie.options
  );

  return { success: true };
};
