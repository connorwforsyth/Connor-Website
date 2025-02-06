"use client";
import { useEffect, useState } from "react";

const accessCode: string = "freeyourself";

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
  work: [
    {
      year: "2022 → Now",
      items: [
        {
          title: "Service Designer (Consultant)",
          company: "Designit",
          companyUrl: "http://designit.com",
          location: "Sydney AUS & New York USA",
          description:
            "Working at the intersection of innovation, strategy, product design, and technology.",
          bullets: [
            "Defining and communcating the digital transformation future vision for statewide road asset maintenance with Transport NSW (Gov).",
            "Product design for two <a href='https://connorforsyth.co/projects/net-zero-energy-concepts/'>B2B Net-Zero energy portals</a> for Origin Zero and advanced features for their for future roadmap.",
            "Improving 8+ customer jobs through a <a href='https://connorforsyth.co/projects/chatbot-heuristic'>chatbot heuristic</a> review and redesign for Woolworths Group.",
            "Reimagined procurement with Origin Energy, leveraging ServiceNow proposals projected to save $120M in maverick spend across source-to-pay.",
            "Reimagining and market researching postgraduate study with The University of Sydney Business School's post covid, global learning environment.",

            "Conducted a residency program to explore AI's influence in design and delivered an immersion partnership for 30+ students at <a href='https://sva.edu/events/ai-sins-panel-discussion-with-designit'>SVA NYC</a>.",
            "Major sharepoint intranet redesign for Ausgrid 20+ pages of rework and a heuristic evaluation.",
            "Established new business opportunities through programs like <a href='https://connorforsyth.co/projects/makeit'>Makeit</a>.",
          ],
        },
      ],
    },
    {
      year: "2018 → 2025",
      items: [
        {
          title: "Design Technologist",
          company: "TEDxMelbourne",
          companyUrl: "https://www.tedxmelbourne.com",
          location: "Melbourne AUS",
          description:
            "Leading design and technology to deliver world-class events.",
          bullets: [
            "I developed and managed the TEDxMelbourne website, implemented organisational systems for project management, CRMs for volunteers, partners, and speakers, and streamlined core operational processes.",
            "Leveraged technology to enhance event experiences such as creating audience interaction tools, implementing live streaming, and using AI to create experimental event concepts.",
          ],
        },
      ],
    },
    {
      year: "2022 → 2024",
      items: [
        {
          title: "Guest Lecturer & Academic Tutor",
          company: "Design Lab: University of Sydney",
          companyUrl: "https://www.sydney.edu.au",
          location: "Sydney AUS",
          description:
            "Teaching 200+ masters of design students at one of Australia's top Universities.<br> Subjects: <a href='https://www.sydney.edu.au/units/IDEA9106'>IDEA9106: Design Thinking</a> ‧ <a href='https://www.sydney.edu.au/units/DESN9003'>DESN9003: Strategic Design & Leadership.</a>",
        },
      ],
    },
    {
      year: "2021 → 2022",
      items: [
        {
          title: "Service Designer",
          company: "Civic Disability Services",
          companyUrl: "https://www.civic.org.au",
          location: "Sydney AUS",
          description:
            "Leading the service design and research capability for the 800 person organisation. Delivering projects for employee and client onboarding, and establishing agile rituals and OKRs in line with the strategy.",
        },
      ],
    },
    {
      year: "2019 → 2022",
      items: [
        {
          title: "Service Design & Creative Technologist",
          company: "Freelance",
          companyUrl: "https://connorforsyth.co",
          location: "Sydney AUS",
          description:
            "Leading experience design with Stone Digital, Vipassana At Home, and Surf Coast Shire (Government).",
        },
      ],
    },
    {
      year: "2018 → 2019",
      items: [
        {
          title: "Design Strategist (Architecture)",
          company: "Billard Leece Partnership",
          companyUrl: "https://www.blp.com.au",
          location: "Melbourne AUS",
          description:
            "Architectural design for government Victorian Building Schools. Prototyping for Peter MacCallum Palliative Care and Cancer Centre. User testing with doctors and nurses to design the bed head for cancer patients.",
        },
      ],
    },
  ] as YearGroup<WorkItem>[],

  sideprojects: [
    {
      year: "2024",
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
    },
    {
      year: "2023",
      items: [
        {
          title: "Designer, OpenLibrary.org",
          url: "https://openlibrary.org/",
        },
      ],
    },
    {
      year: "2022",
      items: [
        {
          title: "Community Advisor, Earlywork",
          url: "https://www.earlywork.co/",
        },
      ],
    },
    {
      year: "2020",
      items: [
        {
          title: "Designer and Developer, Vipassana At Home",
          url: "https://www.connorforsyth.co/projects/vipassana-at-home",
        },
      ],
    },
    {
      year: "2019-21",
      items: [
        {
          title: "Design Technologist, Melbourne SOUP",
          url: "http://melbournesoup.org",
        },
      ],
    },
    {
      year: "2018-19",
      items: [
        {
          title: "Design Director, NAAUC",
          url: "https://www.naauc.edu.au/",
        },
      ],
    },
    {
      year: "2016-17",
      items: [
        {
          title: "Student Club President, International House Melbourne",
          url: "https://study.unimelb.edu.au/accommodation/international-house",
        },
      ],
    },
  ] as YearGroup<SideProjectItem>[],

  speaking: [
    {
      year: "2023",
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
    },
    {
      year: "2022",
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
    },
    {
      year: "2018",
      items: [
        {
          title:
            "Seminars: NAAUC National Conference - (1) Diversity in leadership, (2) Universities in a digital world",
        },
      ],
    },
  ] as YearGroup<SpeakingItem>[],

  education: [
    {
      year: "2024",
      items: [
        {
          name: "Design System University",
          url: "https://designsystem.university",
        },
        { name: "Animations.dev", url: "https://animations.dev" },
        { name: "Buildui.com", url: "https://buildui.com" },
        { name: "svg-animations.how", url: "https://svg-animations.how" },
      ],
    },
    {
      year: "2023",
      items: [
        {
          name: "FrontEnd Masters: JavaScript, React, Full Stack for Frontend Developers",
        },
        { name: "IDEO: Leading Complex Projects" },
      ],
    },
    {
      year: "2022",
      items: [
        { name: "Design Sprint Masterclass & Workshopper Master, AJ&Smart" },
        { name: "CS50x: Introduction to Computer Science, HarvardX" },
      ],
    },
    {
      year: "2021",
      items: [
        { name: "Agile Coaching Certification, ICP-ACC - ICAgile" },
        { name: "Codecademy" },
      ],
    },
    {
      year: "2020",
      items: [
        { name: "Human-Centred Service Design, IDEO" },
        { name: "Agile Explorer, IBM" },
        { name: "Interaction Design Foundation" },
      ],
    },
    {
      year: "2019",
      items: [
        { name: "Service Design Bootcamp, Academy Xi" },
        { name: "UX Design Bootcamp, General Assembly" },
      ],
    },
    {
      year: "2018",
      items: [
        {
          name: "Bachelor of Design (Architecture), The University of Melbourne",
        },
      ],
    },
  ] as YearGroup<EducationItem>[],
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
          className="inline text-xs after:text-neutral-400 after:content-['_/_'] last:after:content-none"
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
      {first && <h2 className="col-span-2 ">Work Experience</h2>}
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
  <div className="grid-cols-3 gap-4 text-sm md:grid">
    <h3 className="col-span-1 flex flex-col">
      <span>{title}</span>
      <a href={companyUrl}>{company}</a>
      <div className="mt-2 flex flex-col pb-4 text-neutral-500 *:text-xs md:pb-0">
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
      {bullets &&
        bullets.map((bullet, index) => (
          <li
            className="relative pl-5 text-sm before:absolute before:left-0  before:content-['—'] sm:text-xs print:text-xs"
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
          className="inline text-xs after:text-neutral-400 after:content-['_/_'] last:after:content-['.']"
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
  title: string;

  yearGroups: YearGroup<T>[];
  className?: string;
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
          key={index}
          year={group.year}
          items={group.items.map((item) => ({
            title: item.title || item.name || "",
            url: item.url,
          }))}
        />
      ))}
    </ul>
  </section>
);

// Main Page Component
export default function CVPage() {
  const [showGuides, setShowGuides] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "x") {
        setShowGuides(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "x") {
        setShowGuides(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <button
        aria-label="print"
        id="print"
        className="print-button"
        onClick={() => window.print()}
        onTouchStart={() => window.print()}
      >
        💾
      </button>
      <div className="page">
        <header className="grid grid-cols-1 flex-col gap-4 md:grid-cols-3 md:gap-8 ">
          <div>
            <h1 className="flex flex-col text-base font-medium">
              <span>Connor Forsyth</span>
              <span className="font-light text-neutral-500">
                Multdisciplinary Service Designer
              </span>
            </h1>
          </div>
          <div className="col-span-2">
            <article className="col-span-2 flex flex-col gap-4 text-sm md:gap-2">
              <p>
                I am a designer with 6+ years experience. I have an interest in
                technology, design systems, research, user experience, events,
                education, facilitation, and open source. Outside of work you'll
                find me coding, hiking, taking{" "}
                <a href="https://photos.connorforsyth.co">photos</a>, and
                brewing coffee. I currently work at{" "}
                <a href="https://www.designit.com">Designit</a> as a Service
                Designer.
              </p>
            </article>
            <nav className="col-span-1 mt-2 flex flex-col gap-4 text-xs">
              <ul className="grid grid-cols-3 text-sm *:flex *:flex-col *:gap-1 *:*:pr-2">
                <div className="col-span-1">
                  <li>
                    <a href="https://connorforsyth.co/linkedin">LinkedIn</a>
                  </li>
                  <li>
                    <a href="https://connorforsyth.co/github">Github</a>
                  </li>
                  <li>
                    <a href="https://connorforsyth.co/chat">Chat</a>
                  </li>
                </div>
                <div className="col-span-2">
                  <a className="" href="mailto:c@connorforsyth.co">
                    c@connorforsyth.co
                  </a>
                  <span>
                    <a className="" href="https://connorforsyth.co/portfolio">
                      connorforsyth.co/portfolio
                    </a>
                  </span>
                  <span className="">
                    Access code:
                    <code className="highlight ml-1 px-1 py-0.5 font-mono text-xs font-normal text-red-500 print:text-blue-800">
                      {accessCode}
                    </code>
                  </span>
                </div>
              </ul>
            </nav>
          </div>
        </header>
        <WorkSection first className="" experience={data.work} />
      </div>

      <div className="page">
        <SecondarySection
          className="col-span-2"
          title="Education"
          yearGroups={data.education}
        />
        <div className="grid gap-8 sm:grid-cols-2">
          <ListSection
            title="Skills"
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
          />
          <ListSection
            title="Tech stack"
            items={[
              "Figma",
              "Miro",
              "Raycast",
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
          />
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <SecondarySection
            title="Side Projects"
            yearGroups={data.sideprojects}
          />
          <SecondarySection title="Speaking" yearGroups={data.speaking} />
          <ListSection
            title="Ask me about..."
            items={[
              "Filter coffee",
              "Photography",
              "Vulfpeck",
              "All 6 seasons of Lost (TV Show)",
              "Moving from architecture to tech",
              "Vipassana meditation",
            ]}
          />
          <ListSection
            title="This month I'm working on..."
            items={[
              "Building a timezone picker tool",
              "Ocean swimming",
              "Fretless bass",
            ]}
          />
        </div>
      </div>
    </>
  );
}
