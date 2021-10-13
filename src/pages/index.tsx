import Link from "next/link";

import { PageSeo } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata.json";
import SocialIcon from "@/components/social-icons";
import { ReactElement } from "react";

const Home = (): ReactElement => {
  return (
    <>
      <PageSeo
        title="Project.io"
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div
        className="flex flex-col "
        style={{ height: "calc( 100vh - 78px )" }}
      >
        <div className="flex-grow flex flex-col justify-center">
          <div>
            <h1 className="mb-4 text-3xl font-bold leading-snug sm:mb-8 sm:text-[2.75rem] sm:leading-snug md:text-[3.5rem] md:leading-snug">
              Hi,
              <br /> Welcome To
              <br />
              Project<span className="text-blue-400">.io</span>
            </h1>
            <Link href="/login">
              <a className="btn text-[0.85rem] sm:text-base" aria-label="Login">
                Login
              </a>
            </Link>
          </div>
        </div>
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
