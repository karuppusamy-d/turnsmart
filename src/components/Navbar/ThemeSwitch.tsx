import { ReactElement, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = (): ReactElement => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      className="w-8 h-8 p-1 ml-1 mr-1 rounded md:ml-3 focus:outline-none focus-visible:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200"
      onClick={() =>
        setTheme(
          theme === systemTheme
            ? "system"
            : theme === "light"
            ? "dark"
            : theme === "dark"
            ? "light"
            : systemTheme === "dark"
            ? "light"
            : "dark"
        )
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Toggle Theme"
        viewBox="0 0 20 20"
        height="100%"
        fill="currentColor"
      >
        {mounted &&
          (theme === "light" ? (
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          ) : theme === "dark" ? (
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 1010.586 10.586z" />
          ) : (
            <>
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 1010.586 10.586z" />
              <path d="M14.864 9.521a1.713 1.713 0 01.073.278.174.174 0 01-.039.156.32.32 0 01-.19.059 3.719 3.719 0 01-.376.015q-.249 0-.391-.01a1 1 0 01-.21-.024.206.206 0 01-.1-.063.334.334 0 01-.049-.1l-.425-1.27h-2.375l-.4 1.235a.388.388 0 01-.054.117.214.214 0 01-.1.073.807.807 0 01-.2.034q-.127.01-.337.01a3.239 3.239 0 01-.352-.015.276.276 0 01-.176-.068.2.2 0 01-.034-.161 1.591 1.591 0 01.071-.275l1.948-5.605a.454.454 0 01.068-.132.222.222 0 01.122-.078.872.872 0 01.239-.034q.151-.01.4-.01.288 0 .459.01a1.017 1.017 0 01.264.037.232.232 0 01.137.078.439.439 0 01.073.146zm-2.9-4.634l-.894 2.686h1.792z" />
            </>
          ))}
      </svg>
    </button>
  );
};

export default ThemeSwitch;
