"use server";

import { log } from "console";
import { cookies } from "next/headers";

export const setTheme = async (theme: "dark" | "light") => {
  const cookieStore = cookies();

  cookieStore.set("theme", theme, {});

  const newTheme = cookieStore.get("theme");

  return newTheme?.value;
};

export const getTheme = async () => {
  const cookieStore = cookies();

  const theme = cookieStore.get("theme");

  return theme?.value;
};
