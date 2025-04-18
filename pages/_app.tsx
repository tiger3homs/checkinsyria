"use client";

import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../app/globals.css";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure theme is only applied client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider attribute="class">
      {mounted && (
        <>
          <Navbar />
          <div className="pt-16">
            <Component {...pageProps} />
          </div>
        </>
      )}
    </ThemeProvider>
  );
}