import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  showPopup: boolean;
  togglePopup: () => void;
}

const Popup = ({ children, showPopup, togglePopup }: Props): ReactElement => {
  return (
    <div
      className={`fixed w-full h-full top-16 inset-x-0 ${
        showPopup ? "" : "hidden"
      }`}
    >
      <div className="fixed z-10 px-8 py-12 sm:p-12 w-full h-full sm:h-auto sm:w-auto sm:rounded-xl shadow-light overflow-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 sm:dark:border-[1px] dark:border-gray-700">
        {children}
      </div>

      <button
        type="button"
        aria-label="toggle popup"
        className="w-full h-full backdrop-filter backdrop-blur-md cursor-auto focus:outline-none"
        onClick={togglePopup}
      ></button>
    </div>
  );
};

export default Popup;
