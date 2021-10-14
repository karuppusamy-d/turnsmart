import { ReactElement } from "react";
import Logo from "@/data/logo.svg";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import { useAuthContext } from "@/components/contexts/useAuthContext";
import { GoogleAuthProvider } from "@firebase/auth";

const Navbar = (): ReactElement => {
  const { currentUser, loginWithPopup, logout } = useAuthContext();
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
                // <Link href="/login" className="px-1 sm:px-4 font-semibold">
                //   Login
                // </Link>
                <button
                  className="px-1 sm:px-4 font-semibold"
                  onClick={() => loginWithPopup(new GoogleAuthProvider())}
                >
                  Login
                </button>
              )}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
