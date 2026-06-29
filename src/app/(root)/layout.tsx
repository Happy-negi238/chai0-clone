import { onBoardUser } from "@/features/auth/actions";
import React from "react";

export default async function RootGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await onBoardUser();
  return children;
}
