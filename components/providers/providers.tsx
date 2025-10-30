"use client";

import React from "react";
import { QueryProvider } from "./query-provider";

/**
 * App-level client providers.
 * Add other client-side providers here (theme, auth, etc.)
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
