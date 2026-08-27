"use server";
import { sessionCookie, defaultSession } from "@/lib/lib";
import { cookies } from "next/headers";

const ACCESS_CODE = process.env.ACCESS_CODE!;

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = sessionCookie.read(
    cookieStore.get(sessionCookie.name)?.value,
  );

  // Return only the serializable data
  return {
    isLoggedIn: session.isLoggedIn || defaultSession.isLoggedIn,
    name: session.name || "",
    email: session.email || "",
  };
};

export const verifyAccessCode = async (
  formData: FormData,
): Promise<{ success: boolean; error?: string }> => {
  const formPassword = formData.get("password") as string;
  if (formPassword !== process.env.ACCESS_CODE) {
    return { success: false, error: "Wrong access code." };
  }
  return { success: true };
};

export const completeSignUp = async (
  formData: FormData,
): Promise<{ success: boolean; error?: string }> => {
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (password !== process.env.ACCESS_CODE) {
    return { success: false, error: "Invalid access code." };
  }

  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.create({ isLoggedIn: true, name, email }),
    sessionCookie.options,
  );

  return { success: true };
};
