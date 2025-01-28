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
  description?: JSX.Element;
  bullets?: JSX.Element[];
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
      year: "2022-Now",
      items: [
        {
          title: "Service Designer",
          company: "Designit",
          companyUrl: "http://designit.com",
          location: "Sydney AUS & New York USA",
          description:
            "Working at the intersection of innovation, strategy, product design, and technology.",
          bullets: [
            "Improving 8+ customer jobs through a <a href='https://connorforsyth.co/projects/chatbot-heuristic'>chatbot heuristic</a> review and redesign for Woolworths Group.",
            "Major intranet redesign for Ausgrid including the rework of 20+ pages and heuristic evaluation.",
            "Delivering an AI discovery program for 30+ students and partnership with <a href='https://sva.edu/events/ai-sins-panel-discussion-with-designit'>SVA NYC</a>.",
            "Landing 3 new business opportunities for Designit through creating new products such as <a href='https://connorforsyth.co/projects/makeit'>Makeit</a>.",
            "Helping The University of Sydney define their <a href='https://connorforsyth.co/projects/new-educational-product-offering'>product strategy</a> and market test 30+ new courses.",
            "Product design for two <a href='https://connorforsyth.co/projects/net-zero-energy-concepts/'>B2B Net-Zero energy portals</a> for Origin Zero. As well as creating 10+ new features.",
          ],
        },
      ],
    },
    {
      year: "2018-Now",
      items: [
        {
          title: "Design Technologist",
          company: "TEDxMelbourne",
          companyUrl: "https://www.tedxmelbourne.com",
          location: "Melbourne AUS",
          description:
            "Leading the experience design of events as well as internal operational systems and technology.",
          bullets: [
            "<a href='https://connorforsyth.co/projects/tedxmelbourne'>Redesigned and developed the TEDxMelbourne website</a> improving community experience and team velocity.",
            "Delivered an AI event with 8+ virtual speakers. Tuned AI models with previous TEDx transcripts.",
          ],
        },
      ],
    },
    {
      year: "2023-24",
      items: [
        {
          title: "Guest Lecturer & Academic Tutor",
          company: "Design Lab: University of Sydney",
          companyUrl: "https://www.sydney.edu.au",
          location: "Sydney AUS",
          description:
            "Teaching 200+ masters of design students at one of the top Australian Universities.<br> Subjects: <a href='https://www.sydney.edu.au/units/IDEA9106'>IDEA9106: Design Thinking</a> ‧ <a href='https://www.sydney.edu.au/units/DESN9003'>DESN9003: Strategic Design & Leadership.</a>",
        },
      ],
    },
    {
      year: "2021-22",
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
      year: "2019-22",
      items: [
        {
          title: "Service Design & Creative Technologist",
          company: "Freelance",
          companyUrl: "https://connorforsyth.co",
          location: "Sydney AUS",
        },
      ],
    },
    {
      year: "2018-19",
      items: [
        {
          title: "Design Strategist",
          company: "Billard Leece Partnership",
          companyUrl: "https://www.blp.com.au",
          location: "Melbourne AUS",
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
          title:
            "Creative Director, NAAUC: National Association of Australian University Colleges",
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
            "Panel: School of Visual Arts NYC: AI Sins - The future of the design industry with AI",
        },
        {
          title:
            "Lecture: University of Sydney, Design Leadership - What design leadership can learn from agile methodologies",
        },
      ],
    },
    {
      year: "2022",
      items: [
        {
          title:
            "Host: Tech Talks Sydney + Designit - Service Design Industry Event",
        },
        {
          title:
            "Workshop: Service Design Network Conference - Coach-like Service Design",
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
        { name: "Animations.dev", url: "https://animations.dev" },
        { name: "Buildui.com", url: "https://buildui.com" },
        {
          name: "Design System University",
          url: "https://designsystem.university",
        },
        { name: "svg-animations.how", url: "https://svg-animations.how" },
      ],
    },
    {
      year: "2023",
      items: [
        { name: "FrontEnd Masters: JavaScript, React" },
        { name: "Fireship.io" },
        { name: "IDEO: Leading Complex Projects" },
      ],
    },
    {
      year: "2022",
      items: [
        { name: "CS50x: Introduction to Computer Science, HarvardX" },
        { name: "Design Sprint Masterclass, AJ&Smart" },
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
    {
      year: "2014",
      items: [
        { name: "Victorian Certificate of Education, Geelong Grammar School" },
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
}: {
  experience: YearGroup<WorkItem>[];
  className?: string;
}) => (
  <section className={`col-span-3 ${className}`}>
    <h2>💻 Work Experience</h2>
    <ul className="grid grid-cols-1 gap-6">
      {experience.map((yearGroup, index) => (
        <li key={index}>
          {yearGroup.items.map((item, itemIndex) => (
            <WorkItem key={itemIndex} {...item} year={yearGroup.year} />
          ))}
        </li>
      ))}
    </ul>
  </section>
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
  <div className="flex flex-col gap-1">
    <h3 className="flex w-full flex-col items-baseline justify-between gap-1 text-base">
      <div>
        <span className="after:content-[':_']">{title}</span>
        <a href={companyUrl}>{company}</a>
      </div>
      <div className="flex gap-2">
        <time>{year}</time>
        <i>{location}</i>
      </div>
    </h3>
    {description && (
      <p>
        <BulletContent content={description} />
      </p>
    )}
    {bullets && (
      <ul className="grid grid-cols-2 gap-4">
        {bullets.map((bullet, index) => (
          <li
            className="relative pl-5 text-neutral-700 before:absolute before:left-0 before:text-neutral-700 before:content-['—']"
            key={index}
          >
            <BulletContent content={bullet} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

type ListSectionProps = {
  title: string;
  emoji: string;
  items: (string | { text: string; url?: string })[];
};

const ListSection = ({ title, emoji, items }: ListSectionProps) => (
  <section>
    <h2 className="font-medium">
      {emoji} {title}
    </h2>
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
  emoji: string;
  yearGroups: YearGroup<T>[];
  className?: string;
}

const SecondarySection = <
  T extends { title?: string; name?: string; url?: string },
>({
  title,
  emoji,
  yearGroups,
  className,
}: SecondarySectionProps<T>) => (
  <section className={className}>
    <h2 className="font-medium">
      {emoji} {title}
    </h2>
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
        <header className="flex flex-col gap-4 [&_a]:text-blue-800">
          <h1 className="py-2 text-base font-medium">Connor Forsyth</h1>
          <article className="flex flex-col gap-2">
            <p>
              I am a designer with 6+ years experience. I have an interest in
              web technology, design systems, user experience, events,
              education, facilitation, and open source. Outside of work you'll
              find me coding, hiking, learning, taking{" "}
              <a href="https://photos.connorforsyth.co">photos</a>, and brewing
              coffee. I currently work at{" "}
              <a href="https://www.designit.com">Designit</a> as a Service
              Designer.
            </p>
          </article>
          <nav className="text-sm">
            <p>
              <span className="pr-1">Portfolio:</span>
              <a href="https://connorforsyth.co/portfolio">
                connorforsyth.co/portfolio
              </a>
              <span className="px-1">access code:</span>
              <code className="highlight px-1 py-0.5 font-mono text-sm text-red-600">
                {accessCode}
              </code>
            </p>
            <ul className="*:inline-flex *:*:pr-2">
              <li>
                <span className="pr-1">Email:</span>
                <a href="mailto:c@connorforsyth.co">c@connorforsyth.co</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/connorwforsyth">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/connorwforsyth">GitHub</a>
              </li>
              <li>
                <a href="http://connorforsyth.co/chat">Chat</a>
              </li>
            </ul>
          </nav>
        </header>
        <WorkSection className="col-span-8" experience={data.work} />
      </div>

      <div className="page">
        <SecondarySection
          className="col-span-2"
          title="Education"
          emoji="🎓"
          yearGroups={data.education}
        />
        <div className="grid gap-8 sm:grid-cols-2">
          <ListSection
            title="Skills"
            emoji="🦸‍♂️"
            items={[
              "Service design",
              "Product design",
              "Creative technology",
              "Front-end development",
              "User research",
              "Agile coaching",
              "Facilitation",
              "Design sprints",
              "Prototyping",
              "Design systems",
            ]}
          />
          <ListSection
            title="Stack"
            emoji="🛠"
            items={[
              "Figma",
              "Miro",
              "GitHub",
              "Vercel",
              "React",
              "Nextjs",
              "TypeScript",
              "JavaScript",
              "TailwindCSS",
              "RadixUI",
              "HTML",
              "CSS",
              "Raycast",
              "Netlify",
              "Webflow",
              "PostHog",
              "Notion",
              "Airtable",
              "Dovetail",
              "Arc",
            ]}
          />
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <SecondarySection
            title="Side Projects"
            emoji="🧢"
            yearGroups={data.sideprojects}
          />
          <SecondarySection
            title="Speaking"
            emoji="🎤"
            yearGroups={data.speaking}
          />
          <ListSection
            title="Ask me about..."
            emoji="👋"
            items={[
              "Filter coffee",
              "Photography",
              "Vulfpeck (Music)",
              "All 6 seasons of Lost (TV Show)",
              "Watching Three Body Problem",
              "Moving from architecture to tech",
              "Vipassana meditation",
            ]}
          />
          <ListSection
            title="This month I'm working on..."
            emoji="✨"
            items={[
              "Building a time picker tool",
              "Web development libraries such as radix-ui, Stitches, next-intl, framer-motion.",
              {
                text: "Learning at: svg-animations.how",
                url: "https://svg-animations.how",
              },
              {
                text: "Working on photos.connorforsyth.co",
                url: "https://photos.connorforsyth.co",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
