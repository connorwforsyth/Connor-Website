import Link from "next/link";
import "@/styles/icons.css";
import type { Metadata } from "next";
import Image from "next/image";
import { Collaborators } from "@/components/Collaborators";
import FeatureItem, { type FeatureItemProps } from "@/components/FeatureItem";
import ProjectLink from "@/components/ProjectLink";
import siteMetadata from "@/config/site-metadata";

export const metadata: Metadata = {
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: {
    description: siteMetadata.description,
    images: {
      url: `${siteMetadata.siteUrl}/api/og/?title=${siteMetadata.title}`,
    },
    siteName: siteMetadata.title,
    title: siteMetadata.title,
    type: "website",
    url: siteMetadata.siteUrl,
  },
  title: siteMetadata.title,
};

export default function Home() {
  return (
    <div className="flex-col text-pretty">
      {/* <Navbar /> */}
      <Image
        alt="ConnorForsythHeadshot"
        className="sr-only mx-auto w-full max-w-2xl rounded-lg"
        height={64}
        loading="eager"
        priority
        src="/connorforsyth-headshot.jpg"
        width={64}
      />
      <div className="flex flex-col gap-4 sm:h-auto">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          <h1 className="pb-4 font-medium font-rodney text-2xl text-foreground sm:text-3xl">
            <span className="block pr-1 text-foreground/80 sm:inline">
              Connor Forsyth.
            </span>
            Product Design Engineer
            <span className="hidden sm:inline">
              {" "}
              with a focus on design systems, AI products, and developer tools.
            </span>
          </h1>
          <div
            basic-stagger="1"
            className="flex flex-col gap-3"
            data-animate=""
          >
            <p>
              I currently work at{" "}
              <Link
                href="https://deloitte.com.au"
                rel="noopener noreferrer"
                target="_blank"
              >
                Deloitte
              </Link>{" "}
              in the strategy, transformation, and AI practice, where I lead the
              development of the enterprise design system from design to code.
              This system is used by product teams to shape the end-to-end
              development of software applications.
            </p>
            <p>Outside of work, I take photos and brew filter coffee.</p>
          </div>
        </div>
        <div
          basic-stagger="2"
          className="mx-auto flex w-full max-w-2xl flex-col gap-4"
          data-animate=""
        >
          <div className="flex flex-row gap-4">
            <ProjectLink href="/projects">All Projects</ProjectLink>
            <ProjectLink href="/writing">Writing</ProjectLink>
            <ProjectLink href="https://github.com/connorwforsyth">
              GitHub
            </ProjectLink>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-4 sm:flex-col">
          <div
            basic-stagger="3"
            className="mx-auto flex w-full max-w-2xl gap-4"
            data-animate=""
          >
            <Collaborators />
          </div>
          <div
            basic-stagger="4"
            className="mx-auto w-full max-w-2xl"
            data-animate=""
          >
            <h2 className="mb-3 hidden text-foreground/80 sm:block">
              <em>Contact</em>
            </h2>
            <p>
              You can reach me on{" "}
              <Link href="https://www.linkedin.com/in/connorwforsyth">
                LinkedIn
              </Link>
              , <Link href="https://x.com/connorwforsyth">X (Twitter)</Link>, or
              email:{" "}
              <Link href="mailto:c@connorforsyth.co">c@connorforsyth.co</Link>
            </p>
          </div>
        </div>
      </div>

      <div
        basic-stagger="5"
        className="mx-auto my-8 flex w-full max-w-screen-2xl flex-col gap-24 py-24 md:gap-36 md:py-36"
        data-animate=""
      >
        {featuredItems.map((feature) => (
          <FeatureItem key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}

const featuredItems: FeatureItemProps[] = [
  {
    content: (
      <>
        <p>
          I worked with ReciMe to design a conceptual prototype of the ReciMe
          homepage to explore how the application would be adapted for web and
          desktop users.
        </p>
        <p>
          This helped establish the start of the overall direction for how the
          mobile app could be migrated to a web experience. It also included the
          foundation of a design system suitable for bringing the UI to the web.
        </p>
        <ProjectLink href="/projects/recime">
          View project and prototype
        </ProjectLink>
      </>
    ),
    description:
      "Crafting a web-based recipe discovery, organiser, and menu-planner app for a New York-based startup.",
    icon: (
      <Image
        alt="ReciMe"
        height={24}
        src="/homepage/recime-icon.svg"
        width={24}
      />
    ),
    media: { src: "/homepage/recime-home.png", variant: "framed" },
    position: "left",
    title: "ReciMe",
  },
  {
    content: (
      <>
        <p>
          Internally at Designit, I've developed a number of internal tools to
          improve designer workflows, such as a Miro workshop design system and
          exercise library for our global teams.
        </p>
        <ProjectLink href="/writing/miro-design-system">
          View Miro Design System
        </ProjectLink>
        <p className="pt-2">
          I've also developed a platform for our team to host regular design
          hackathons with new clients. We call this platform Makeit. I led the
          overall strategy, design and development of the project.
        </p>
        <ProjectLink href="/projects/makeit">View Makeit</ProjectLink>
      </>
    ),
    description:
      "Service and product design consulting, design workflows and business development.",
    icon: (
      <Image
        alt="Designit"
        className="p-1"
        height={24}
        src="/homepage/designit-icon.svg"
        width={24}
      />
    ),
    media: { src: "/writing/miro-ds/heroshot.png" },
    position: "right",
    title: "Designit",
  },
  {
    content: (
      <>
        <p>
          I worked with Origin Zero across multiple design sprints to redesign
          and test energy usage portals that help energy brokers and business
          customers monitor, analyse, and manage their net-zero energy assets.
        </p>
        <p>
          I was responsible for pulling together the final prototype, leading
          workshops, and designing many of the search features.
        </p>
        <ProjectLink href="/projects/net-zero-energy-concepts">
          View project
        </ProjectLink>
      </>
    ),
    description:
      "Product strategy and design for Australia's leading net-zero energy retailer.",
    icon: (
      <Image
        alt="Origin Zero"
        className="p-0.5"
        height={24}
        src="/homepage/origin-icon.png"
        width={24}
      />
    ),
    media: {
      frameClassName: "from-orange-400 to-red-500",
      src: "/homepage/origin-zero-home.png",
      variant: "framed",
    },
    position: "left",
    title: "Origin Zero",
  },
  {
    content: (
      <>
        <p>
          I worked with Woolworths to conduct a heuristic evaluation of key
          customer journeys within their chatbot and IVR systems.{" "}
        </p>
        <p>
          The analysis identified several opportunities to improve the
          experience and performance of common customer tasks.
        </p>
        <ProjectLink href="/projects/chatbot-heuristic">
          View chatbot heuristic
        </ProjectLink>
      </>
    ),
    description:
      "Heuristic evaluation and conversation design for key customer jobs for Australia's leading retail grocery chain.",
    icon: (
      <Image
        alt="WooliesX"
        className="p-1"
        height={24}
        src="/homepage/woolies-icon.png"
        width={24}
      />
    ),
    imageWrapperClassName: "bg-white items-end",
    media: { src: "/homepage/woolies-hero.png" },
    position: "right",
    title: "Woolworths / WooliesX",
  },
  {
    content: (
      <>
        I lead the design and technology team with TEDxMelbourne, in which I
        design and implement experiences across platforms and touchpoints.
        <ProjectLink href="/projects/tedxmelbourne">
          View TEDxMelbourne Website Project
        </ProjectLink>
        <ProjectLink href="/projects/tedxmelbourne-united">
          View Hybrid event experience design project
        </ProjectLink>
      </>
    ),
    description:
      "Leading operations, experience design and technology for Melbourne's very own TEDx community.",
    icon: (
      <>
        <svg
          className="p-1"
          fill="none"
          height="256"
          viewBox="0 0 266 256"
          width="266"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M171.471 255.972L132.502 191.26L94.5004 255.972H0.889771L89.7502 125.127L4.18934 0H97.8284L132.502 61.8667L168.172 0H261.782L176.25 125.156L265.11 256H171.499L171.471 255.972Z"
            fill="#EB0028"
          />
        </svg>
      </>
    ),
    imageWrapperClassName:
      "w-full bg-gradient-to-tr p-4 *:scale-75 sm:p-8 lg:p-24 to-red-500 from-red-600",
    media: { src: "/images/TEDx-Hero.png" },
    position: "left",
    title: "TEDxMelbourne",
  },
  {
    content: (
      <>
        <p>
          I built a Figma plugin to help designers generate and populate
          component instances with text at scale.
        </p>
        <p>
          The idea of this plugin came from attempting to shift sticky notes
          from a Miro board to a Figma component. Suitable for polishing
          workshop outputs or generating journey maps.
        </p>
        <ProjectLink href="/projects/figma-component-looper">
          View plugin
        </ProjectLink>
        <ProjectLink href="/projects/figma-plugin">
          Read more about plugin development
        </ProjectLink>
      </>
    ),
    description:
      "Figma plugin development to improve design workflows leveraging open source libraries like React.",
    icon: (
      <Image
        alt="Placeholder"
        className="h-8 w-8"
        height={64}
        src="/homepage/figma-app-icon.png"
        width={64}
      />
    ),
    imageWrapperClassName:
      "*:object-contain bg-cover bg-[url(/projects/component-instance-looper/cover.png)]",
    media: { src: "/projects/component-instance-looper/cover.png" },
    position: "right",
    title: "Figma Plugin: Component Instance Looper",
  },
  {
    content: (
      <>
        <p>
          I built a tool to help designers create and copy pixel spacing
          increments using Raycast.
        </p>{" "}
        <p>
          This helps designers build polished and consistent visual designs no
          matter what tool they use to craft.
        </p>
        <ProjectLink href="/projects/raycast-extension">
          View raycast extension
        </ProjectLink>
      </>
    ),
    description:
      "Building and contributing to open source through a pixel incrementing tool.",
    icon: (
      <Image
        alt="Placeholder"
        className=""
        height={32}
        src="/homepage/raycast-icon.png"
        width={32}
      />
    ),
    media: { src: "/projects/raycast-extension/SVG spacing.png" },
    position: "left",
    title: "Raycast Extension: Pinch SVG",
  },
];
