import { ReactElement } from "react";
import Link from "next/link";
import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import SocialIcon from "@/components/social-icons";

const Home = (): ReactElement => {
  return (
    <>
      {/* SEO */}
      <PageSeo
        title={`Home | ${siteMetadata.title}`}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />

      <div
        className="flex flex-col mb-10"
        style={{ height: "calc( 100vh - 78px )" }}
      >
        <div className="flex grow flex-col justify-center">
          <div>
            <h1 className="mb-4 text-3xl font-bold leading-snug sm:mb-8 sm:text-[2.75rem] sm:leading-snug md:text-[3.5rem] md:leading-snug">
              Hi,
              <br /> Welcome
              <br />
              to turnsmart
              <span className="text-primary-400 dark:text-primary-500">
                .io
              </span>
            </h1>
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

        {/* Social Icons */}
        <div className="flex my-12 text-2xl space-x-5">
          <SocialIcon kind="gmail" href={`mailto:${siteMetadata.email}`} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} /> */}
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube}/> */}
          <SocialIcon kind="github" href={siteMetadata.github} />
        </div>
      </div>
    </>
  );
};

export default Home;
