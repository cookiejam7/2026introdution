import useThemeStore from "../store/themeStore";

function ThemeButton() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-lg px-4 py-2 font-bold ${
        theme === "light" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
}

export default ThemeButton;
