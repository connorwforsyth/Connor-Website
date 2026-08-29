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
  keywords: string[];
};

const siteMetadata: SiteConfig = {
  author: "Connor Forsyth",
  description:
    "I'm a designer and technologist with a background in design sprints, lean ux, agile and web development. I currently work as a service designer at Designit and as an academic tutor at The University of Sydney.",
  email: "c@connorforsyth.co",
  github: "https://github.com/connorwforsyth",
  headerTitle: "Connor Forsyth",
  image: "",
  keywords: [
    "design",
    "service design",
    "product design",
    "development",
    "design engineer",
    "design thinking",
    "design sprint",
    "lean ux",
    "agile",
    "web development",
    "designit",
    "the university of sydney",
    "the university of melbourne",
    "tedxmelbourne",
    "tedx",
  ],
  language: "en-us",
  linkedin: "https://www.linkedin.com/in/connorwforsyth",
  locale: "en-AU",
  siteLogo: "/",
  siteRepo: "https://github.com/connorwforsyth/connorforsyth.co",
  siteUrl: "https://connorforsyth.co",
  theme: "system", // system, dark or light
  title: "Connor Forsyth",
  twitter: "https://twitter.com/connorwforsyth",
};

export default siteMetadata;
