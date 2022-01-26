import {
  ReactElement,
  ReactNode,
  useContext,
  createContext,
  useState,
} from "react";

// Type definitions
type AlertProviderType = ({
  children,
}: {
  children: ReactNode;
}) => ReactElement;
type ShowAlert = (
  message: string,
  type?: "default" | "success" | "error",
  timeout?: number
) => void;
type ContextValue = {
  showAlert: ShowAlert;
};

// Create the context
const AlertContext = createContext<ContextValue | undefined>(undefined);

// Use the context
const useAlertContext = (): ContextValue => {
  return useContext(AlertContext) as ContextValue;
};

// Create the provider
const AlertProvider: AlertProviderType = ({ children }) => {
  // let hideTimeout: NodeJS.Timeout | null;
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const [status, setStatus] = useState({ show: false, message: "", type: "" });

  /**
   * Show an alert popup
   * @param message - Message to be shown
   * @param type - Type of alert (default, success, error)
   * @param timeout - Timeout in milliseconds (2000ms by default)
   * @returns void
   */
  const showAlert: ShowAlert = (message, type = "default", timeout = 2000) => {
    setStatus({ show: true, message, type });

    // Clear timeout if exists
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }

    // Set new timeout to hide the alert after specified time
    setHideTimeout(
      setTimeout(() => {
        setStatus(({ message, type }) => {
          return { show: false, message, type };
        });
        setHideTimeout(null);
      }, timeout)
    );
  };

  const value = {
    showAlert,
  };

  // Return the provider
  return (
    <AlertContext.Provider value={value}>
      {/* Children */}
      {children}

      {/* Alert popup */}
      <div
        className={`fixed px-5 py-4 top-20 inset-x-4 md:top-[5.5rem] md:right-6 md:left-auto lg:right-0 alert-lg-fix rounded-lg shadow-light-lg bg-opacity-80 dark:shadow-none select-none ${
          status.type === "success"
            ? "bg-green-400 dark:bg-green-500 text-white"
            : status.type == "error"
            ? "bg-red-400 dark:bg-red-500 text-white"
            : "bg-white dark:bg-gray-800 dark:border-[1px] dark:border-gray-700 dark:bg-opacity-80"
        } ${
          status.show
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        } ease-out duration-500 transition-opacity-transform`}
        // Hide the alert popup on click
        onClick={() => {
          if (status.show) {
            // Clear timeout if exists
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              setHideTimeout(null);
            }
            // Hide the alert popup
            setStatus(({ message, type }) => {
              return { show: false, message, type };
            });
          }
        }}
        role={"alert"}
      >
        <div className="md:max-w-lg">{status.message}</div>
      </div>
    </AlertContext.Provider>
  );
};

export { AlertProvider, useAlertContext };
export default AlertContext;
