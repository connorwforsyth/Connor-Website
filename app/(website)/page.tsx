import Link from "next/link";
import "@/styles/icons.css";
import { Collaborators } from "@/components/Collaborators";
import Image from "next/image";
import { Metadata } from "next";
import siteMetadata from "@/config/site-metadata";
import Navbar from "@/components/navbar";
import FeatureItem from "@/components/FeatureItem";
import ProjectLink from "@/components/ProjectLink";
import { FeatureItemProps } from "@/components/FeatureItem";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: "website",
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: {
      url: `${siteMetadata.siteUrl}/api/og/?title=${siteMetadata.title}`,
    },
  },
};

export default function Home() {
  return (
    <div className="flex-col text-pretty">
      {/* <Navbar /> */}
      <Image
        width={64}
        height={64}
        alt="ConnorForsythHeadshot"
        className="sr-only mx-auto w-full max-w-2xl rounded-lg"
        src="/connorforsyth-headshot.jpg"
        priority
        loading="eager"
      />
      <div className="flex flex-col gap-4 sm:h-auto">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 ">
          <h1 className="pb-4 font-rodney text-2xl font-medium text-zinc-800 dark:text-zinc-50 sm:text-3xl">
            <span className="block pr-1 text-zinc-700 dark:text-zinc-300 sm:inline">
              Connor Forsyth.
            </span>
            Product Design Engineer
            <span className="hidden sm:inline">
              {" "}
              with a focus on design systems, AI products and developer tools.
            </span>
          </h1>
          <div
            className="flex flex-col gap-3"
            data-animate=""
            basic-stagger="1"
          >
            <p>
              I currently work at{" "}
              <Link
                href="https://deloitte.com.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deloitte
              </Link>{" "}
              in the strategy, transformation, and AI practice, where I lead the
              development of the enterprise design system from design to code.
              This system is used by product teams to shape the end-to-end
              development of software applications.
            </p>
            <p>
              Outside of work I enjoy taking{" "}
              <Link
                href="https://photos.connorforsyth.co/"
                rel="noopener noreferrer"
              >
                photos
              </Link>{" "}
              and brewing filter coffee.
            </p>
          </div>
        </div>
        <div
          data-animate=""
          basic-stagger="2"
          className="mx-auto flex w-full max-w-2xl flex-col gap-4"
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
            data-animate=""
            basic-stagger="3"
            className="mx-auto flex w-full max-w-2xl  gap-4"
          >
            <Collaborators />
          </div>
          <div
            data-animate=""
            basic-stagger="4"
            className="mx-auto w-full max-w-2xl"
          >
            <h2 className="mb-3 hidden text-zinc-700 dark:text-zinc-100 sm:block">
              <em>Contact</em>
            </h2>
            <p>
              You can reach me on{" "}
              <Link href="https://www.linkedin.com/in/connorwforsyth">
                LinkedIn
              </Link>{" "}
              , <Link href="https://x.com/connorwforsyth">𝕏 (Twitter)</Link> or
              email:{" "}
              <Link href="mailto:c@connorforsyth.co">c@connorforsyth.co</Link>
            </p>
          </div>
        </div>
      </div>

      <div
        data-animate=""
        basic-stagger="5"
        className="mx-auto my-8 flex w-full max-w-screen-2xl flex-col gap-24 py-24 md:gap-36 md:py-36"
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
    title: "Recime",
    figmaproto: true,
    description:
      "Crafting a web based Recipe discovery, organiser and menu planner app for a New York based startup.",
    position: "left",
    icon: (
      <Image
        src="/homepage/recime-icon.svg"
        alt="Recime"
        width={24}
        height={24}
      />
    ),
    image: "/homepage/recime-home.png",
    content: (
      <>
        <p>
          I worked with Recime to design a conceptual prototype of the ReciMe
          homepage to explore how the application would be adapted for web and
          desktop users.
        </p>
        <p>
          This helped establish the start of the overall direction for how the
          mobile app could be migrated to a web experience. It also included the
          foundation of a design system, suitable to bring the ui to the web.
        </p>
        <ProjectLink href="/projects/recime">
          View project and prototype
        </ProjectLink>
      </>
    ),
  },
  {
    title: "Designit",
    description:
      "Service and product design consulting, design workflows and business development.",
    position: "right",
    icon: (
      <Image
        src="/homepage/designit-icon.svg"
        className="p-1"
        alt="Designit"
        width={24}
        height={24}
      />
    ),
    image: "/writing/miro-ds/heroshot.png",
    content: (
      <>
        <p>
          Internally at Designit, I've developed a number of internal tools to
          improve designer workflows, such as a miro workshop design system and
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
  },
  {
    title: "Origin Zero",
    description:
      "Product strategy and design for Australia's leading net zero energy retailer.",
    position: "left",
    figmaproto: true,
    figmaProtoProps: { className: "from-orange-400 to-red-500" },
    icon: (
      <Image
        className="p-0.5"
        src="/homepage/origin-icon.png"
        alt="Origin Zero"
        width={24}
        height={24}
      />
    ),
    image: "/homepage/origin-zero-home.png",
    content: (
      <>
        <p>
          I worked with Origin Zero across multiple design sprints to redesign
          and test energy usage portals that help energy brokers and business
          customers monitor, analyze and manage their net zero energy assets.
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
  },
  {
    title: "Woolworths / WooliesX",
    description:
      "Heuristic evaluation and conversation design for key customer jobs for Australia's leading retail grocery chain.",
    imageWrapperClassName: "bg-white items-end *:scale-110",
    position: "right",
    icon: (
      <Image
        className="p-1"
        src="/homepage/woolies-icon.png"
        alt="WooliesX"
        width={24}
        height={24}
      />
    ),
    image: "/homepage/woolies-hero.png",
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
  },
  {
    title: "TEDxMelbourne",
    description:
      "Leading operations, experience design and technology for Melbourne's very own TEDx community.",
    position: "left",
    imageWrapperClassName:
      "flex w-full  border bg-gradient-to-tr p-4 sm:p-8 lg:p-24 to-red-500 from-red-600",
    icon: (
      <>
        <svg
          className="p-1"
          width="266"
          height="256"
          viewBox="0 0 266 256"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M171.471 255.972L132.502 191.26L94.5004 255.972H0.889771L89.7502 125.127L4.18934 0H97.8284L132.502 61.8667L168.172 0H261.782L176.25 125.156L265.11 256H171.499L171.471 255.972Z"
            fill="#EB0028"
          />
        </svg>
      </>
    ),
    image: "/images/TEDx-Hero.png",
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
  },
  {
    title: "Figma Plugin: Component Instance Looper",
    description:
      "Figma plugin development to improve design workflows leveraging open source libraries like React.",
    position: "right",
    icon: (
      <Image
        src="/homepage/figma-app-icon.png"
        className="h-8 w-8"
        alt="Placeholder"
        width={64}
        height={64}
      />
    ),
    image: "/projects/component-instance-looper/cover.png",
    content: (
      <>
        <p>
          I built a Figma plugin to help designers generate and populate
          component instances with text at scale.
        </p>
        <p>
          The idea of this plugin came from attempting to quickly shift sticky
          notes from a Miro board to a Figma component. Suitable for quickly
          polishing workshop outputs or generating journey maps.
        </p>
        <ProjectLink href="/projects/figma-component-looper">
          View plugin
        </ProjectLink>
        <ProjectLink href="/projects/figma-plugin">
          Read more about plugin development
        </ProjectLink>
      </>
    ),
  },
  {
    title: "Raycast Extension: Pinch SVG",
    description:
      "Building and contributing to open source through a pixel incrementing tool.",
    position: "left",
    icon: (
      <Image
        src="/homepage/raycast-icon.png"
        className=""
        alt="Placeholder"
        width={32}
        height={32}
      />
    ),
    image: "/projects/raycast-extension/SVG spacing.png",
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
  },
];
