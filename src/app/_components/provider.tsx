"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import React from "react";
export default function Provider({ children }: { children: ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
