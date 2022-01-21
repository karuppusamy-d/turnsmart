import { ReactElement } from "react";

const Loading = (): ReactElement => {
  return (
    <div className="min-h-[80vh] divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-10 pb-4 space-y-2 xl:space-y-3 xl:pb-6">
        <div className="animate-pulse mb-3 h-5 w-60 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
        <div className="animate-pulse h-4 w-auto bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
      </div>

      <div className="pt-6 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8">
          <div className="p-10 rounded-xl shadow-light dark:bg-gray-800">
            <div className="animate-pulse h-4 w-auto mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
            <div className="animate-pulse h-4 w-auto mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
        <div className="pt-6 pb-8">
          <div className="p-10 rounded-xl shadow-light dark:bg-gray-800">
            <div className="animate-pulse h-4 w-auto mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
            <div className="animate-pulse h-4 w-auto mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
        <div className="pt-6 pb-8">
          <div className="p-10 rounded-xl shadow-light dark:bg-gray-800">
            <div className="animate-pulse h-4 w-auto mt-1 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
            <div className="animate-pulse h-4 w-auto mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
