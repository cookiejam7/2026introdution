import { create } from "zustand";
import { persist } from "zustand/middleware"; // 추가

const useThemeStore = create(
  persist(
    // 추가
    (set) => ({
      theme: "light",

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage", // 추가
    },
  ),
);

export default useThemeStore;
