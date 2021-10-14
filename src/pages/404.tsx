import { ReactElement } from "react";
import Link from "next/link";

const NotFound = (): ReactElement => {
  return (
    <div className="flex flex-col items-start justify-center divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:flex-row md:divide-y-0 md:space-x-6 min-h-[80vh]">
      <div className="pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl md:border-r-2 md:px-6">
          404
        </h1>
      </div>
      <div className="max-w-md pt-5 md:p-0">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn&apos;t find this page.
        </p>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          But don&apos;t worry, you can find plenty of other things on our
          homepage.
        </p>
        <Link href="/">
          <button className="btn">Back to homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
