"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "vibrant" | "luxury";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("vibrant");

  useEffect(() => {
    // Initialize from localStorage
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const initial: Theme = saved === "luxury" || saved === "vibrant" ? saved : "vibrant";
    applyTheme(initial);
    setTheme(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("theme-vibrant", "theme-luxury");
    root.classList.add(t === "vibrant" ? "theme-vibrant" : "theme-luxury");
    localStorage.setItem("theme", t);
  };

  const toggle = () => {
    const next: Theme = theme === "vibrant" ? "luxury" : "vibrant";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={theme === "vibrant" ? "Switch to Luxury Dark" : "Switch to Vibrant"}
      className="fixed z-50 top-4 right-4 sm:top-5 sm:right-5 inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-colors"
    >
      {theme === "vibrant" ? (
        <Moon className="w-5 h-5 text-white" />
      ) : (
        <Sun className="w-5 h-5 text-white" />
      )}
    </button>
  );
}
