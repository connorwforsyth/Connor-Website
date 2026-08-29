import type { JSX } from "react";
import { DownloadCVButton } from "@/components/DownloadCVButton";

const accessCode: string = process.env.ACCESS_CODE!;

type YearGroup<T> = {
  year: string;
  items: T[];
};

type WorkItem = {
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  description?: string | JSX.Element;
  bullets?: (string | JSX.Element)[];
};

type SideProjectItem = {
  title: string;
  url?: string;
  organization?: string;
  role?: string;
};

type SpeakingItem = {
  title: string;
  venue?: string;
  url?: string;
};

type EducationItem = {
  name: string;
  url?: string;
};

// Data
const data = {
  education: [
    {
      items: [
        {
          name: "Design System University",
          url: "https://designsystem.university",
        },
        { name: "Animations.dev", url: "https://animations.dev" },
        { name: "Buildui.com", url: "https://buildui.com" },
        { name: "svg-animations.how", url: "https://svg-animations.how" },
      ],
      year: "2024",
    },
    {
      items: [
        {
          name: "FrontEnd Masters: JavaScript, React, Full Stack for Frontend Developers",
        },
        { name: "IDEO: Leading Complex Projects" },
      ],
      year: "2023",
    },
    {
      items: [
        { name: "Design Sprint Masterclass & Workshopper Master, AJ&Smart" },
        { name: "CS50x: Introduction to Computer Science, HarvardX" },
      ],
      year: "2022",
    },
    {
      items: [
        { name: "Agile Coaching Certification, ICP-ACC - ICAgile" },
        { name: "Codecademy" },
      ],
      year: "2021",
    },
    {
      items: [
        { name: "Human-Centred Service Design, IDEO" },
        { name: "Agile Explorer, IBM" },
        { name: "Interaction Design Foundation" },
      ],
      year: "2020",
    },
    {
      items: [
        { name: "Service Design Bootcamp, Academy Xi" },
        { name: "UX Design Bootcamp, General Assembly" },
      ],
      year: "2019",
    },
    {
      items: [
        {
          name: "Bachelor of Design (Architecture), The University of Melbourne",
        },
      ],
      year: "2018",
    },
  ] as YearGroup<EducationItem>[],

  sideprojects: [
    {
      items: [
        {
          title: "ReciMe web application design",
          url: "https://connorforsyth.co/projects/recime",
        },
        {
          title: "Figma Plugin: Component Instance Looper",
          url: "https://connorforsyth.co/projects/figma-component-looper",
        },
        {
          title: "Raycast Extension: Pinch SVG",
          url: "https://www.raycast.com/connorforsyth/pinch-svg",
        },
        {
          title: "Miro Workshop Design System",
          url: "https://www.connorforsyth.co/writing/miro-design-system",
        },
      ],
      year: "2024",
    },
    {
      items: [
        {
          title: "Designer, OpenLibrary.org",
          url: "https://openlibrary.org/",
        },
      ],
      year: "2023",
    },
    {
      items: [
        {
          title: "Community Advisor, Earlywork",
          url: "https://www.earlywork.co/",
        },
      ],
      year: "2022",
    },
    {
      items: [
        {
          title: "Designer and Developer, Vipassana At Home",
          url: "https://www.connorforsyth.co/projects/vipassana-at-home",
        },
      ],
      year: "2020",
    },
    {
      items: [
        {
          title: "Design Technologist, Melbourne SOUP",
          url: "http://melbournesoup.org",
        },
      ],
      year: "2019-21",
    },
    {
      items: [
        {
          title: "Design Director, NAAUC",
          url: "https://www.naauc.edu.au/",
        },
      ],
      year: "2018-19",
    },
    {
      items: [
        {
          title: "Student Club President, International House Melbourne",
          url: "https://study.unimelb.edu.au/accommodation/international-house",
        },
      ],
      year: "2016-17",
    },
  ] as YearGroup<SideProjectItem>[],

  speaking: [
    {
      items: [
        {
          title:
            "Lecture: University of Sydney, What design leadership can learn from agile methodologies",
        },
        {
          title:
            "Panel: School of Visual Arts NYC: AI Sins - The future of the design industry with AI",
        },
      ],
      year: "2023",
    },
    {
      items: [
        {
          title:
            "Workshop: SDN (Service Design Network) Youth Conference: Coach-like Service Design",
        },
        {
          title:
            "Host: Tech Talks Sydney + Designit - Sustainability by Design",
        },
      ],
      year: "2022",
    },
    {
      items: [
        {
          title:
            "Seminars: NAAUC National Conference - (1) Diversity in leadership, (2) Universities in a digital world",
        },
      ],
      year: "2018",
    },
  ] as YearGroup<SpeakingItem>[],
  work: [
    {
      items: [
        {
          bullets: [
            "Maintaining the GEL Design System across Figma and Storybook (React).",
            "Leading design for MyAssist, Deloitte's internal AI chat and workflow product.",
          ],
          company: "Deloitte Australia",
          companyUrl: "https://www.deloitte.com.au",
          description:
            "Lead designer for enterprise design systems, AI products, and developer tools.",
          location: "Sydney AUS",
          title: "Design Engineer (Manager)",
        },
      ],
      year: "2025 → Now",
    },
    {
      items: [
        {
          bullets: [
            "Leading design engineering for Ausgrid's BCM portal, using RadixUI, ReactRouter and SharePoint framework (SPFx).", // "Defining and communicating the future vision for statewide road asset maintenance with Transport NSW (Gov).",
            "Product design for Origin Zero's <a href='https://connorforsyth.co/projects/net-zero-energy-concepts/'>B2B Net-Zero energy portal</a> and strategising advanced features for their roadmap.",
            "Leading the digital strategy for <a href='https://www.ozharvest.org.au/'>OzHarvest</a>, partnering with the Founder, C-suite and extended team to identify key challenges to overcome and combat food waste.",
            "Reimagined procurement with Origin Energy, leveraging ServiceNow proposals projected to save $120M in maverick spend across source-to-pay.",
            // "Reimagining and market researching postgraduate study with The University of Sydney Business School's post covid, global learning environment.",

            "Conducted a residency program to explore AI's influence in design and delivered workshops for 30+ students at <a href='https://sva.edu/events/ai-sins-panel-discussion-with-designit'>SVA NYC</a>.",
            // "Major sharepoint intranet redesign for Ausgrid 20+ pages of rework and a heuristic evaluation.",
            "Improving 8+ customer jobs through a <a href='https://connorforsyth.co/projects/chatbot-heuristic'>chatbot heuristic</a> review and redesign for Woolworths Group.",
            // "Established new business opportunities through programs like <a href='https://connorforsyth.co/projects/makeit'>Makeit</a>.",
          ],
          company: "Designit",
          companyUrl: "http://designit.com",
          description:
            "Working at the intersection of innovation, product design, strategy, and technology.",
          location: "Sydney AUS",
          title: "Service & Product Designer",
        },
      ],
      year: "2022 → 2025",
    },
    {
      items: [
        {
          bullets: [
            "I developed and managed the TEDxMelbourne website, implemented organisational systems for project management, CRMs for volunteers, partners, and speakers, and streamlined core operational processes.",
            "Leveraged technology to enhance event experiences such as creating audience interaction tools, implementing live streaming, and using AI to create experimental event concepts.",
          ],
          company: "TEDxMelbourne",
          companyUrl: "https://www.tedxmelbourne.com",
          description:
            "Leading design and technology to deliver world-class events.",
          location: "Melbourne AUS",
          title: "Design Technologist",
        },
      ],
      year: "2018 → 2025",
    },
    {
      items: [
        {
          company: "Design Lab: University of Sydney",
          companyUrl: "https://www.sydney.edu.au",
          description:
            "Teaching 200+ masters of design students at one of Australia's top universities.<br> Subjects: <a href='https://www.sydney.edu.au/units/IDEA9106'>IDEA9106: Design Thinking</a> ‧ <a href='https://www.sydney.edu.au/units/DESN9003'>DESN9003: Strategic Design & Leadership.</a>",
          location: "Sydney AUS",
          title: "Guest Lecturer & Academic Tutor",
        },
      ],
      year: "2022 → 2024",
    },
    {
      items: [
        {
          company: "Civic Disability Services",
          companyUrl: "https://www.civic.org.au",
          description:
            "Leading the service design and research capability for the 800-person organisation. Delivering projects for employee and client onboarding, and establishing agile rituals and OKRs in line with the strategy.",
          location: "Sydney AUS",
          title: "Service Designer",
        },
      ],
      year: "2021 → 2022",
    },
    {
      items: [
        {
          company: "Freelance",
          companyUrl: "https://connorforsyth.co",
          description:
            "Leading experience design with Stone Digital, Vipassana At Home, and Surf Coast Shire (Government).",
          location: "Sydney AUS",
          title: "Service Design & Creative Technologist",
        },
      ],
      year: "2019 → 2022",
    },
    {
      items: [
        {
          company: "Billard Leece Partnership",
          companyUrl: "https://www.blp.com.au",
          description:
            "Architectural design for government Victorian Building Schools. Prototyping for Peter MacCallum Palliative Care and Cancer Centre. User testing with doctors and nurses to design the bed head for cancer patients.",
          location: "Melbourne AUS",
          title: "Design Strategist (Architecture)",
        },
      ],
      year: "2018 → 2019",
    },
  ] as YearGroup<WorkItem>[],
} as const;

const TimelineYearGroup = <T extends { title: string; url?: string }>({
  year,
  items,
}: YearGroup<T>) => (
  <li className="grid grid-cols-[3.5rem_1fr] items-baseline">
    <time className="text-xs">{year}</time>
    <ul className="inline">
      {items.map((item, index) => (
        <li
          className="inline text-xs after:text-muted-foreground after:content-['_/_'] last:after:content-none"
          key={index}
        >
          {item.url ? (
            item.title.includes(", ") ? (
              <>
                {item.title.split(", ")[0]},{" "}
                <a href={item.url}>{item.title.split(", ")[1]}</a>
              </>
            ) : (
              <a href={item.url}>{item.title}</a>
            )
          ) : (
            item.title
          )}
        </li>
      ))}
    </ul>
  </li>
);

const WorkSection = ({
  experience,
  className,
  first,
}: {
  first?: boolean;
  experience: YearGroup<WorkItem>[];
  className?: string;
}) => (
  <>
    <section className={`${className}`}>
      {first && <h2 className="col-span-2">Work Experience</h2>}
      <ul className="grid grid-cols-1 gap-8">
        {experience.map((yearGroup, index) => (
          <li key={index}>
            {yearGroup.items.map((item, itemIndex) => (
              <WorkItem key={itemIndex} {...item} year={yearGroup.year} />
            ))}
          </li>
        ))}
      </ul>
    </section>
  </>
);

const BulletContent = ({ content }: { content: React.ReactNode }) => {
  // Parse string content to handle HTML tags
  if (typeof content === "string") {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: CV bullet content is authored in this repo, not user input
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <>{content}</>;
};

const WorkItem = ({
  title,
  company,
  companyUrl,
  location,
  description,
  bullets,
  year,
}: WorkItem & { year: string }) => (
  <div className="gap-4 text-sm md:grid md:grid-cols-3">
    <h3 className="col-span-1 flex flex-col">
      <span>{title}</span>
      <a href={companyUrl}>{company}</a>
      <div className="mt-2 flex flex-col pb-4 text-muted-foreground *:text-xs md:pb-0">
        <time>{year}</time>
        <i>{location}</i>
      </div>
    </h3>
    <ul className="col-span-2 flex flex-col gap-4 sm:grid">
      {description && (
        <p className="col-span-2 text-sm">
          <BulletContent content={description} />
        </p>
      )}
      {bullets?.map((bullet, index) => (
        <li
          className="relative pl-5 text-sm before:absolute before:left-0 before:content-['—'] sm:text-xs print:text-xs"
          key={index}
        >
          <BulletContent content={bullet} />
        </li>
      ))}
    </ul>
  </div>
);

type ListSectionProps = {
  title: string;

  items: (string | { text: string; url?: string })[];
};

const ListSection = ({ title, items }: ListSectionProps) => (
  <section>
    <h2 className="font-medium">{title}</h2>
    <ul className="">
      {items.map((item, index) => (
        <li
          className="inline text-xs after:text-muted-foreground after:content-['_/_'] last:after:content-['.']"
          key={index}
        >
          {typeof item === "string" ? (
            item
          ) : item.url ? (
            <a href={item.url}>{item.text}</a>
          ) : (
            item.text
          )}
        </li>
      ))}
    </ul>
  </section>
);

interface SecondarySectionProps<
  T extends { title?: string; name?: string; url?: string },
> {
  className?: string;
  title: string;

  yearGroups: YearGroup<T>[];
}

const SecondarySection = <
  T extends { title?: string; name?: string; url?: string },
>({
  title,

  yearGroups,
  className,
}: SecondarySectionProps<T>) => (
  <section className={className}>
    <h2 className="font-medium">{title}</h2>
    <ul className="flex flex-col">
      {yearGroups.map((group, index) => (
        <TimelineYearGroup
          items={group.items.map((item) => ({
            title: item.title || item.name || "",
            url: item.url,
          }))}
          key={index}
          year={group.year}
        />
      ))}
    </ul>
  </section>
);

// Main Page Component
export default function CVPage() {
  return (
    <>
      <DownloadCVButton />
      <div className="page">
        <header className="grid grid-cols-1 flex-col gap-4 md:grid-cols-3">
          <div>
            <h1 className="font-medium text-base">
              <span>Connor Forsyth</span>
              <span className="block font-light text-muted-foreground lg:text-nowrap">
                Design Engineer
              </span>
            </h1>
          </div>
          <div className="col-span-2">
            <article className="col-span-2 flex flex-col gap-4 text-sm md:gap-2">
              <p>
                I'm a designer with 7+ years of experience across interaction
                design, design systems, web technology, and user research.
                Outside of work, you'll find me coding, taking photos, and
                brewing coffee. I currently work at{" "}
                <a href="https://www.deloitte.com.au">Deloitte</a> as a Design
                Engineer.
              </p>
            </article>
            <nav className="col-span-1 mt-2 flex flex-col gap-4 text-xs">
              <ul className="grid grid-cols-3 text-sm *:flex *:flex-col *:gap-1 *:*:pr-2">
                <div className="col-span-1">
                  <li>
                    <a href="https://connorforsyth.co/linkedin">LinkedIn</a>
                  </li>
                  <li>
                    <a href="https://connorforsyth.co/github">GitHub</a>
                  </li>
                </div>
                <div className="col-span-2">
                  <a className="" href="mailto:c@connorforsyth.co">
                    c@connorforsyth.co
                  </a>
                  <span>
                    <a href={`/portfolio?code=${accessCode}`}>
                      connorforsyth.co/portfolio
                      <span className="opacity-50">
                        {`?code=${accessCode}`}
                      </span>
                    </a>
                  </span>
                </div>
              </ul>
            </nav>
          </div>
        </header>
        <WorkSection className="" experience={data.work} first />
      </div>

      <div className="page">
        <SecondarySection
          className="col-span-2"
          title="Education"
          yearGroups={data.education}
        />
        <div className="grid gap-8 sm:grid-cols-2">
          <ListSection
            items={[
              "Service design",
              "Product design",
              "Creative technology",
              "Front-end development",
              "Design research",
              "Agile coaching",
              "Facilitation",
              "Design sprints",
              "Prototyping",
              "Design systems",
            ]}
            title="Skills"
          />
          <ListSection
            items={[
              "Figma",
              "Miro",
              "Raycast",
              "Notion",
              "Arc",
              "GitHub",
              "Cursor",
              "Vercel",
              "React",
              "Nextjs",
              "TypeScript",
              "TailwindCSS",
              "RadixUI",
              "Webflow",
            ]}
            title="Tech stack"
          />
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <SecondarySection
            title="Side Projects"
            yearGroups={data.sideprojects}
          />
          <SecondarySection title="Speaking" yearGroups={data.speaking} />
          <ListSection
            items={[
              "Filter coffee",
              "Photography",
              "Vulfpeck",
              "All 6 seasons of Lost (TV Show)",
              "Moving from architecture to IXD",
              "Vipassana meditation",
            ]}
            title="Ask me about..."
          />
          <ListSection
            items={[
              "Building a timezone picker tool",
              "Hiking",
              "Rumba, Son, Afro-Cuban",
              "Running",
            ]}
            title="This month I'm working on..."
          />
        </div>
      </div>
    </>
  );
}
