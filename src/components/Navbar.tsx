import { ReactElement } from "react";
import Logo from "@/data/logo.svg";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import { useAuthContext } from "@/components/contexts/useAuthContext";

const Navbar = (): ReactElement => {
  const { currentUser, logout } = useAuthContext();
  return (
    <header>
      <div className="fixed top-0 inset-x-0 bg-white dark:bg-gray-900 z-50 shadow-light dark:shadow-dark">
        <nav className="flex items-center justify-between text-gray-800 dark:text-gray-100 mx-auto px-6 py-5 xl:px-0 max-w-3xl xl:max-w-5xl">
          <Link href="/" className="flex items-center justify-between text-xl">
            <Logo aria-label="project.io" />
          </Link>

          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              <Link href="/" className="px-1 sm:px-4 font-semibold">
                Home
              </Link>

              <Link
                href="https://karuppusamy.me/about"
                className="px-1 sm:px-4 font-semibold"
              >
                About
              </Link>

              {currentUser ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-1 sm:px-4 font-semibold"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="px-1 sm:px-4 font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-1 sm:px-4 font-semibold">
                  Login
                </Link>
              )}
            </div>

            {currentUser && (
              <Link
                href="/profile"
                className="w-8 h-8 p-1 ml-1 rounded focus:outline-none focus-visible:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200"
              >
                <img
                  alt="profile"
                  src={currentUser.photoURL || "/images/profile.svg"}
                  className={`object-cover rounded-full ${
                    !currentUser.photoURL && "dark:invert"
                  }`}
                />
              </Link>
            )}

            <ThemeSwitch />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
