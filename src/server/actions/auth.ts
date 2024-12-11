"use server";

import { signOut } from "~/server/auth";

export const handleSignOut = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await signOut();
};