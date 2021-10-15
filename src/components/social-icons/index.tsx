import { ReactElement } from "react";
import Gmail from "./gmail.svg";
import Github from "./github.svg";
import Facebook from "./facebook.svg";
import Instagram from "./instagram.svg";
import Youtube from "./youtube.svg";
import Linkedin from "./linkedin.svg";
import Twitter from "./twitter.svg";
import Whatsapp from "./whatsapp.svg";

// Icons taken from: https://simpleicons.org/

const components = {
  gmail: Gmail,
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: Whatsapp,
};

type SocialIconType = ({
  kind,
  href,
}: {
  kind: keyof typeof components;
  href: string;
}) => ReactElement | null;

const SocialIcon: SocialIconType = ({ kind, href }) => {
  if (!href) return null;

  const SocialSvg = components[kind];

  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      <SocialSvg
        className="fill-current hover:text-primary-500 dark:hover:text-primary-400 h-[1em] transition-colors duration-500"
        aria-label={kind}
      />
    </a>
  );
};

export default SocialIcon;
