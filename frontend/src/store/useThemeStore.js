import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("widchat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("widchat-theme", theme);
    set({ theme });
  },
}));
