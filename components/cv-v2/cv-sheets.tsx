import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";

// CV content mirrored from the "Polish v9" iteration in Paper.

const accessCode = process.env.ACCESS_CODE ?? "";

type Role = {
  title: string;
  company: string;
  companyUrl?: string;
  meta: string;
  subline: string;
  bullets?: string[];
};

const roles: Role[] = [
  {
    bullets: [
      "Maintaining the GEL Design System across Figma and Storybook (React), used by 10+ applications.",
      "Leading design for MyAssist, Deloitte's internal AI chat and workflow product with 15,000 users.",
    ],
    company: "Deloitte Australia",
    companyUrl: "https://www.deloitte.com.au",
    meta: "Sydney AUS · 2025 – Present",
    subline:
      "Lead designer for enterprise design systems, AI products and developer tools.",
    title: "Design Engineer (Manager),",
  },
  {
    bullets: [
      "Reimagined procurement with Origin Energy, leveraging ServiceNow proposals projected to save $120M in maverick spend across source-to-pay.",
      "Led design engineering for Ausgrid's BCM portal, using Radix UI, React Router and SharePoint Framework (SPFx).",
      "Designed Origin Zero's B2B Net-Zero energy portal and strategised advanced features for their roadmap.",
      "Led the digital strategy for OzHarvest, partnering with the Founder, C-suite and extended team to identify key challenges and combat food waste.",
      "Redesigned 8 core customer journeys via a chatbot heuristic review for Woolworths Group.",
      "Conducted a residency program to explore AI's influence in design and delivered workshops for 30+ students at SVA NYC.",
    ],
    company: "Designit",
    companyUrl: "https://designit.com",
    meta: "Sydney AUS · 2022 – 2025",
    subline:
      "Worked at the intersection of innovation, product design, strategy and technology.",
    title: "Service & Product Designer,",
  },
  {
    bullets: [
      "Developed and managed the TEDxMelbourne website, plus CRM and project-management systems for volunteers, partners, and speakers.",
      "Built audience interaction tools, live streaming, and experimental AI event concepts.",
    ],
    company: "TEDxMelbourne",
    companyUrl: "https://www.tedxmelbourne.com",
    meta: "Melbourne AUS · 2018 – 2025",
    subline: "Led design and technology to deliver world-class events.",
    title: "Lead Design Technologist,",
  },
  {
    company: "Design Lab: University of Sydney",
    companyUrl: "https://www.sydney.edu.au",
    meta: "Sydney AUS · 2022 – 2024",
    subline:
      "Taught 200+ Master of Design students at one of Australia's top universities. Subjects: IDEA9106 Design Thinking, DESN9003 Strategic Design & Leadership.",
    title: "Guest Lecturer & Academic Tutor,",
  },
  {
    company: "Civic Disability Services",
    companyUrl: "https://www.civic.org.au",
    meta: "Sydney AUS · 2021 – 2022",
    subline:
      "Led the service design and research capability for the 800-person organisation. Delivered employee and client onboarding projects, and established agile rituals and OKRs in line with the strategy.",
    title: "Service Designer,",
  },
  {
    company: "Independent",
    meta: "Sydney AUS · 2019 – 2022",
    subline:
      "Led experience design with Stone Digital, Vipassana At Home, and Surf Coast Shire (Government).",
    title: "Service Design & Creative Technologist,",
  },
  {
    company: "Billard Leece Partnership",
    companyUrl: "https://www.blp.com.au",
    meta: "Melbourne AUS · 2018 – 2019",
    subline:
      "Architectural design for government Victorian Building Schools. Prototyping for Peter MacCallum Palliative Care and Cancer Centre. User testing with doctors and nurses to design the bed head for cancer patients.",
    title: "Design Strategist (Architecture),",
  },
];

type DatedRow = { text: string; year: string };

const education: DatedRow[] = [
  { text: "Interface Craft", year: "2026" },
  { text: "Devouring Details, Rauno Freiberg", year: "2025" },
  {
    text: "Design System University · Animations.dev · Buildui.com · svg-animations.how",
    year: "2024",
  },
  {
    text: "FrontEnd Masters: JavaScript, React, Full Stack for Frontend Developers · IDEO: Leading Complex Projects",
    year: "2023",
  },
  {
    text: "Design Sprint Masterclass & Workshopper Master, AJ&Smart · CS50x: Introduction to Computer Science, HarvardX",
    year: "2022",
  },
  {
    text: "Agile Coaching Certification, ICP-ACC – ICAgile · Codecademy",
    year: "2021",
  },
  {
    text: "Human-Centred Service Design, IDEO · Agile Explorer, IBM · Interaction Design Foundation",
    year: "2020",
  },
  {
    text: "Service Design Bootcamp, Academy Xi · UX Design Bootcamp, General Assembly",
    year: "2019",
  },
  {
    text: "Bachelor of Design (Architecture), The University of Melbourne",
    year: "2018",
  },
];

const sideProjects: DatedRow[] = [
  {
    text: "ReciMe web application design · Figma Plugin: Component Instance Looper · Raycast Extension: Pinch SVG · Miro Workshop Design System",
    year: "2024",
  },
  { text: "Designer, OpenLibrary.org", year: "2023" },
  { text: "Community Advisor, Earlywork", year: "2022" },
  { text: "Designer and Developer, Vipassana At Home", year: "2020" },
  { text: "Design Technologist, Melbourne SOUP", year: "2019 – 21" },
  { text: "Design Director, NAAUC", year: "2018 – 19" },
  {
    text: "Student Club President, International House Melbourne",
    year: "2016 – 17",
  },
];

const speaking: DatedRow[] = [
  {
    text: "Co-host: AI Design Studio, Atlassian Sydney – cross-company AI practitioner community",
    year: "2026",
  },
  {
    text: "Lecture: University of Sydney, What design leadership can learn from agile methodologies · Panel: School of Visual Arts NYC: AI Sins – The future of the design industry with AI",
    year: "2023",
  },
  {
    text: "Workshop: SDN (Service Design Network) Youth Conference: Coach-like Service Design · Host: Tech Talks Sydney + Designit – Sustainability by Design",
    year: "2022",
  },
  {
    text: "Seminars: NAAUC National Conference – (1) Diversity in leadership, (2) Universities in a digital world",
    year: "2018",
  },
];

const SectionRule = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2.5">
    <h2 className="shrink-0 font-semibold text-[#202020]">{title}</h2>
    <div className="h-px grow bg-[#D9D9D9]" />
  </div>
);

const Bullet = ({ text }: { text: string }) => (
  <li className="flex gap-3 pl-1.5">
    <span aria-hidden className="w-2 shrink-0 text-[#646464]">
      •
    </span>
    <span>{text}</span>
  </li>
);

const RoleEntry = ({ role }: { role: Role }) => (
  <section className="flex flex-col gap-1">
    <div className="flex flex-wrap items-baseline gap-2">
      <h3 className="font-medium">{role.title}</h3>
      {role.companyUrl ? (
        <a className="text-[#0A37CD] no-underline" href={role.companyUrl}>
          {role.company}
        </a>
      ) : (
        <span>{role.company}</span>
      )}
      <span className="ml-auto text-[#646464]">{role.meta}</span>
    </div>
    <p className="text-[#646464]">{role.subline}</p>
    {role.bullets && (
      <ul className="flex flex-col gap-1">
        {role.bullets.map((bullet) => (
          <Bullet key={bullet} text={bullet} />
        ))}
      </ul>
    )}
  </section>
);

const DatedList = ({ rows }: { rows: DatedRow[] }) => (
  <ul className="flex flex-col gap-2">
    {rows.map((row) => (
      <li className="flex items-baseline justify-between gap-6" key={row.text}>
        <span>{row.text}</span>
        <span className="shrink-0 text-[#646464] tabular-nums">{row.year}</span>
      </li>
    ))}
  </ul>
);

const contactIconClass = "shrink-0 text-[#646464]";
const linkClass = "text-[#0A37CD] no-underline";

export function CvSheets() {
  return (
    <>
      <div className="page flex flex-col gap-5 text-[#202020] leading-[1.45] tracking-[-0.005em]">
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="font-semibold">Connor Forsyth</h1>
            <p className="text-[#646464]">Design Engineer</p>
          </div>
          <p className="max-w-[60ch] text-[#646464]">
            I'm a design engineer, front-end developer, researcher and educator
            with 8+ years across product design, design systems, web technology
            and AI. Currently at Deloitte.
          </p>
          <ul className="grid grid-cols-[minmax(11rem,auto)_1fr] gap-x-6 gap-y-2">
            <li className="flex items-center gap-2">
              <MapPinIcon className={contactIconClass} size={14} />
              <span className="text-[#646464]">Sydney, Australia</span>
            </li>
            <li className="flex items-center gap-2">
              <GlobeIcon className={contactIconClass} size={14} />
              <a className={linkClass} href={`/portfolio?code=${accessCode}`}>
                connorforsyth.co/portfolio
                <span className="opacity-60">{`?code=${accessCode}`}</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className={contactIconClass} size={14} />
              <span className="text-[#646464]">+61 400 891 285</span>
            </li>
            <li className="flex items-center gap-2">
              <LinkedinLogoIcon className={contactIconClass} size={14} />
              <a
                className={linkClass}
                href="https://linkedin.com/in/connorforsyth"
              >
                linkedin.com/in/connorforsyth
              </a>
            </li>
            <li className="flex items-center gap-2">
              <EnvelopeSimpleIcon className={contactIconClass} size={14} />
              <a className={linkClass} href="mailto:c@connorforsyth.co">
                c@connorforsyth.co
              </a>
            </li>
            <li className="flex items-center gap-2">
              <GithubLogoIcon className={contactIconClass} size={14} />
              <a className={linkClass} href="https://github.com/connorforsyth">
                github.com/connorforsyth
              </a>
            </li>
          </ul>
        </header>
        <SectionRule title="Experience" />
        <div className="flex flex-col gap-4">
          {roles.map((role) => (
            <RoleEntry key={role.company} role={role} />
          ))}
        </div>
      </div>

      <div className="page flex flex-col gap-5 text-[#202020] leading-[1.45] tracking-[-0.005em]">
        <SectionRule title="Education & Continued Learning" />
        <DatedList rows={education} />
        <SectionRule title="Skills" />
        <p>
          Front-end development, Product design, Software design, Content
          design, Prototyping, AI development, Design systems, Lean UX, Agile
          software development, Design research, Service design, Facilitation.
        </p>
        <SectionRule title="Tech Stack" />
        <p>
          Code: TypeScript, React, Next.js, Node, Postgres, Tailwind CSS, Base
          UI, Docker
          <br />
          Tools: Figma, Paper, Miro, VS Code, Claude Code, Conductor, GitHub,
          Vercel, Cloudflare, Raycast, Dia
        </p>
        <SectionRule title="Side Projects" />
        <DatedList rows={sideProjects} />
        <SectionRule title="Speaking" />
        <DatedList rows={speaking} />
        <SectionRule title="Ask me about..." />
        <p>
          Filter coffee, Photography, Vulfpeck, All 6 seasons of Lost (TV Show),
          Moving from architecture to IXD, Vipassana meditation.
        </p>
        <SectionRule title="Lately..." />
        <p>
          Building a timezone picker tool, hiking, running, and Afro-Cuban dance
          (rumba, son).
        </p>
      </div>
    </>
  );
}
