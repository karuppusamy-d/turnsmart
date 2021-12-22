import { ReactElement } from "react";
import Link from "next/link";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";

const Home = (): ReactElement => {
  return (
    <>
      <PageSeo
        title={`About | ${siteMetadata.title}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 min-h-[80vh]">
        <div className="pt-10 pb-5 xl:pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-5xl">
            About
          </h1>
        </div>

        <div className="pt-6 leading-relaxed">
          <p>
            It is a open source project that simplifies the process of creating
            and integrating IoT projects with Google assistant by providing an
            easy to use API.
          </p>
          <br />

          <p>Here are some of the example projects</p>
          <br />

          <Link href="https://github.com/karuppusamy-d/turnsmart-examples.git">
            <a
              className="btn text-[0.85rem] sm:text-base"
              aria-label="Example projects"
              target="_blank"
            >
              Go to examples
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
