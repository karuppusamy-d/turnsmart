import { ReactElement } from "react";
import Link from "next/link";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";

const ServerError = (): ReactElement => {
  return (
    <>
      <PageSeo
        title={`${siteMetadata.title} | Server Error`}
        url={`${siteMetadata.siteUrl}/500`}
        description="Oops! Something went wrong with our server."
      />

      <div className="flex flex-col items-start justify-center divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:flex-row md:divide-y-0 md:space-x-6 min-h-[80vh] mb-10">
        <div className="pb-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl md:border-r-2 md:px-6">
            500
          </h1>
        </div>
        <div className="max-w-md pt-5 md:p-0">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            Internal Server Error
          </p>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Oops! Something went wrong with our servers. <br />
            Please try refreshing this page or come back later.
          </p>
          <Link href="/">
            <button className="btn">Back to homepage</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServerError;
