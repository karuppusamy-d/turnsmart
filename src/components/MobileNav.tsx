import { ReactElement, useState } from "react";
import Link from "./Link";
import { headerNavLinks } from "./Navbar";

const MobileNav = (): ReactElement => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = (): void => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="w-8 h-8 ml-1 mr-1 rounded flex focus:outline-none focus-visible:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Toggle Menu"
          viewBox="0 0 20 20"
          height="100%"
          fill="currentColor"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      <div
        className={`fixed w-9/12 h-full top-18 right-0 bg-gray-200 dark:bg-gray-800 z-10 transform ease-in-out duration-500 ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="fixed h-full mt-4">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-8 py-4">
              <Link
                href={link.href}
                className="text-base font-semibold tracking-wider"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="toggle navmenu"
        className={`fixed w-full h-full top-18 inset-x-0 backdrop-filter backdrop-blur-sm cursor-auto focus:outline-none ${
          navShow ? "block" : "hidden"
        }`}
        onClick={onToggleNav}
      ></button>
    </div>
  );
};

export default MobileNav;
