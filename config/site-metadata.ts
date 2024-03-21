// @ts-check
type SiteConfig = {
  title: string;
  author: string;
  headerTitle: string;
  description: string;
  language: string;
  theme: "system" | "dark" | "light";
  siteUrl: string;
  siteRepo?: string;
  siteLogo: string;
  image?: string;
  socialBanner?: string;
  email: string;
  github: string;
  twitter: string;
  facebook?: string;
  youtube?: string;
  linkedin: string;
  locale: string;
};

export const siteMetadata: SiteConfig = {
  title: "Connor Forsyth",
  author: "Connor Forsyth",
  headerTitle: "Connor Forsyth",
  description:
    "I’m a designer and technologist with a background in design sprints, lean ux, agile and web development. I currently work as a service designer at Designit and as an academic tutor at The University of Sydney.",
  language: "en-us",
  theme: "system", // system, dark or light
  siteUrl: "https://connorforsyth.co",
  siteRepo: "https://github.com/connorwforsyth/connorforsyth.co",
  siteLogo: "/",
  image: "",
  email: "c@connorforsyth.co",
  github: "https://github.com/connorwforsyth",
  twitter: "https://twitter.com/connorwforsyth",
  linkedin: "https://www.linkedin.com/in/connorwforsyth",
  locale: "en-AU",
};

export default siteMetadata;
