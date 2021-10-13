import { ReactElement } from "react";
import { NextSeo } from "next-seo";
import siteMetadata from "@/data/siteMetadata.json";

const SEO = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: "website",
    locale: siteMetadata.language,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: siteMetadata.title,
        width: 2100,
        height: 1200,
      },
    ],
  },
  twitter: {
    handle: siteMetadata.twitter,
    site: siteMetadata.twitter,
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "author",
      content: siteMetadata.author,
    },
  ],
};

type PageSeoType = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => ReactElement;

const PageSeo: PageSeoType = ({ title, description, url }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={encodeURI(url)}
      openGraph={{
        url: encodeURI(url),
        title,
        description,
      }}
    />
  );
};

export { SEO, PageSeo };
