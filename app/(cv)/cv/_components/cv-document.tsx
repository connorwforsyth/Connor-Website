import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  GlobeIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import siteMetadata from "@/config/site-metadata";

// The portfolio is gated; the CV prints the code so a reader can follow the
// link. Keep the code in the environment — never in the repo — and fall back
// to the bare path so a missing variable can't publish `?code=undefined`.
const accessCode = process.env.ACCESS_CODE;
const portfolioPath = accessCode
  ? `/portfolio?code=${encodeURIComponent(accessCode)}`
  : "/portfolio";
const portfolioUrl = new URL(portfolioPath, siteMetadata.siteUrl);

type ChildrenProps = {
  children: ReactNode;
};

type CvSectionProps = ChildrenProps & {
  title: string;
};

type ExperienceProps = ChildrenProps & {
  company: string;
  companyUrl?: string;
  dates: string;
  location: string;
  title: string;
};

type DatedItemProps = ChildrenProps & {
  year: string;
};

function CvPage({ children }: ChildrenProps) {
  return (
    <article className="page cv-page flex flex-col gap-4 leading-[1.45]">
      {children}
    </article>
  );
}

function SectionHeading({ children }: ChildrenProps) {
  return (
    <div className="flex items-center gap-2.5">
      <h2 className="font-semibold">{children}</h2>
      <div className="cv-section-rule h-px grow" />
    </div>
  );
}

function CvSection({ children, title }: CvSectionProps) {
  return (
    <section className="cv-section flex flex-col gap-2">
      <SectionHeading>{title}</SectionHeading>
      {children}
    </section>
  );
}

function Experience({
  children,
  company,
  companyUrl,
  dates,
  location,
  title,
}: ExperienceProps) {
  return (
    <section className="cv-experience flex flex-col gap-1">
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        <h3 className="font-medium">{title}</h3>
        {companyUrl ? (
          <a className="cv-link no-underline" href={companyUrl}>
            {company}
          </a>
        ) : (
          <span>{company}</span>
        )}
        <span className="cv-role-location">{location}</span>
        <span className="cv-role-dates">{dates}</span>
      </div>
      {children}
    </section>
  );
}

function DatedList({ children }: ChildrenProps) {
  return <ul className="flex flex-col gap-2">{children}</ul>;
}

function DatedItem({ children, year }: DatedItemProps) {
  return (
    <li className="flex items-baseline justify-between gap-6">
      <span>{children}</span>
      <span className="cv-date shrink-0 tabular-nums">{year}</span>
    </li>
  );
}

export function CvDocument() {
  return (
    <>
      <CvPage>
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="font-semibold">Connor Forsyth</h1>
            <p className="cv-muted">Design Engineer</p>
          </div>
          <p className="cv-muted max-w-[60ch]">
            I'm a design engineer and front-end developer from Sydney,
            Australia, with 8+ years across product design, design systems, web
            technology, and AI. Currently at Deloitte.
          </p>
          <address aria-label="Contact information" className="cv-contacts">
            <ul className="cv-contact-primary">
              <li>
                <EnvelopeSimpleIcon aria-hidden size={14} weight="duotone" />
                <a href="mailto:c@connorforsyth.co">c@connorforsyth.co</a>
              </li>
              <li>
                <GlobeIcon aria-hidden size={14} weight="duotone" />
                <a href={portfolioUrl.href}>
                  {portfolioUrl.host}
                  {portfolioPath}
                </a>
              </li>
            </ul>
            <ul className="cv-contact-secondary">
              <li>
                <LinkedinLogoIcon aria-hidden size={14} weight="duotone" />
                <a href="https://linkedin.com/in/connorwforsyth">
                  @connorwforsyth
                </a>
              </li>
              <li>
                <GithubLogoIcon aria-hidden size={14} weight="duotone" />
                <a href="https://github.com/connorwforsyth">@connorwforsyth</a>
              </li>
              <li>
                <a href="tel:+61400891285">+61 400 891 285</a>
              </li>
            </ul>
          </address>
        </header>

        <section className="flex flex-col gap-3">
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-4">
            <Experience
              company="Deloitte Australia"
              companyUrl="https://www.deloitte.com.au"
              dates="2025 – Present"
              location="Sydney AUS"
              title="Design Engineer (Manager),"
            >
              <p className="cv-muted">
                Lead designer for enterprise design systems, AI products, and
                developer tools.
              </p>
              <ul className="cv-role-bullets">
                <li>
                  Maintaining the GEL Design System across Figma and Storybook
                  (React), used by 10+ applications.
                </li>
                <li>
                  Leading design for MyAssist, Deloitte's internal AI chat and
                  workflow product with 15,000 users.
                </li>
              </ul>
            </Experience>

            <Experience
              company="Designit"
              companyUrl="https://designit.com"
              dates="2022 – 2025"
              location="Sydney AUS"
              title="Service & Product Designer,"
            >
              <p className="cv-muted">
                Worked at the intersection of innovation, product design,
                strategy, and technology.
              </p>
              <ul className="cv-role-bullets">
                <li>
                  Reimagined procurement with Origin Energy, developing
                  ServiceNow proposals projected to save $120M by reducing
                  off-contract purchasing across source-to-pay.
                </li>
                <li>
                  Led design engineering for Ausgrid's BCM portal, using Radix
                  UI, React Router and SharePoint Framework (SPFx).
                </li>
                <li>
                  Designed Origin Zero's B2B Net-Zero energy portal and
                  strategised advanced features for their roadmap.
                </li>
                <li>
                  Led the digital strategy for OzHarvest, partnering with the
                  Founder, C-suite and extended team to identify key challenges
                  and combat food waste.
                </li>
                <li>
                  Redesigned 8 core customer journeys via a chatbot heuristic
                  review for Woolworths Group.
                </li>
                <li>
                  Conducted a residency program to explore AI's influence in
                  design and delivered workshops for 30+ students at SVA NYC.
                </li>
              </ul>
            </Experience>

            <Experience
              company="TEDxMelbourne"
              companyUrl="https://www.tedxmelbourne.com"
              dates="2018 – 2025"
              location="Melbourne AUS"
              title="Lead Design Technologist,"
            >
              <p className="cv-muted">
                Led design and technology to deliver world-class events.
              </p>
              <ul className="cv-role-bullets">
                <li>
                  Developed and managed the TEDxMelbourne website, plus CRM and
                  project-management systems for volunteers, partners, and
                  speakers.
                </li>
                <li>
                  Built audience interaction tools, live streaming, and
                  experimental AI event concepts.
                </li>
              </ul>
            </Experience>

            <Experience
              company="Design Lab: University of Sydney"
              companyUrl="https://www.sydney.edu.au"
              dates="2022 – 2024"
              location="Sydney AUS"
              title="Guest Lecturer & Academic Tutor,"
            >
              <p className="cv-muted">
                Taught 200+ Master of Design students at one of Australia's top
                universities. Subjects: IDEA9106 Design Thinking, DESN9003
                Strategic Design & Leadership.
              </p>
            </Experience>

            <Experience
              company="Civic Disability Services"
              companyUrl="https://www.civic.org.au"
              dates="2021 – 2022"
              location="Sydney AUS"
              title="Service Designer,"
            >
              <p className="cv-muted">
                Led the service design and research capability for the
                800-person organisation. Delivered employee and client
                onboarding projects, and established agile rituals and OKRs in
                line with the strategy.
              </p>
            </Experience>

            <Experience
              company="Independent"
              dates="2019 – 2022"
              location="Sydney AUS"
              title="Service Design & Creative Technologist,"
            >
              <p className="cv-muted">
                Led experience design with Stone Digital, Vipassana At Home, and
                Surf Coast Shire (Government).
              </p>
            </Experience>

            <Experience
              company="Billard Leece Partnership"
              companyUrl="https://www.blp.com.au"
              dates="2018 – 2019"
              location="Melbourne AUS"
              title="Design Strategist (Architecture),"
            >
              <p className="cv-muted">
                Architectural design for government Victorian Building Schools.
                Prototyping for Peter MacCallum Palliative Care and Cancer
                Centre. User testing with doctors and nurses to design the bed
                head for cancer patients.
              </p>
            </Experience>
          </div>
        </section>
      </CvPage>

      <CvPage>
        <CvSection title="Education & Continued Learning">
          <DatedList>
            <DatedItem year="2026">Interface Craft</DatedItem>
            <DatedItem year="2025">Devouring Details, Rauno Freiberg</DatedItem>
            <DatedItem year="2024">
              Design System University; Animations.dev; Buildui.com;
              svg-animations.how
            </DatedItem>
            <DatedItem year="2023">
              FrontEnd Masters: JavaScript, React, Full Stack for Frontend
              Developers; IDEO: Leading Complex Projects
            </DatedItem>
            <DatedItem year="2022">
              Design Sprint Masterclass & Workshopper Master, AJ&Smart; CS50x:
              Introduction to Computer Science, HarvardX
            </DatedItem>
            <DatedItem year="2021">
              Agile Coaching Certification, ICP-ACC – ICAgile; Codecademy
            </DatedItem>
            <DatedItem year="2020">
              Human-Centred Service Design, IDEO; Agile Explorer, IBM;
              Interaction Design Foundation
            </DatedItem>
            <DatedItem year="2019">
              Service Design Bootcamp, Academy Xi; UX Design Bootcamp, General
              Assembly
            </DatedItem>
            <DatedItem year="2018">
              Bachelor of Design (Architecture), The University of Melbourne
            </DatedItem>
          </DatedList>
        </CvSection>

        <CvSection title="Skills">
          <p>
            Front-end development, Product design, Software design, Content
            design, Prototyping, AI development, Design systems, Lean UX, Agile
            software development, Design research, Service design, Facilitation.
          </p>
        </CvSection>

        <CvSection title="Tech Stack">
          <p>
            Code: TypeScript, React, Next.js, Node, Postgres, Tailwind CSS, Base
            UI, Motion.dev, Docker
            <br />
            Tools: Figma, Paper, Miro, VS Code, Codex, Claude Code, Conductor,
            GitHub, Vercel, Cloudflare, Raycast, Dia
          </p>
        </CvSection>

        <CvSection title="Side Projects">
          <DatedList>
            <DatedItem year="2024">
              ReciMe web application design; Figma Plugin: Component Instance
              Looper; Raycast Extension: Pinch SVG; Miro Workshop Design System
            </DatedItem>
            <DatedItem year="2023">Designer, OpenLibrary.org</DatedItem>
            <DatedItem year="2022">Community Advisor, Earlywork</DatedItem>
            <DatedItem year="2020">
              Designer and Developer, Vipassana At Home
            </DatedItem>
            <DatedItem year="2019 – 21">
              Design Technologist, Melbourne SOUP
            </DatedItem>
            <DatedItem year="2018 – 19">Design Director, NAAUC</DatedItem>
            <DatedItem year="2016 – 17">
              Student Club President, International House Melbourne
            </DatedItem>
          </DatedList>
        </CvSection>

        <CvSection title="Speaking">
          <DatedList>
            <DatedItem year="2026">
              Co-host: AI Design Studio, Atlassian Sydney – cross-company AI
              practitioner community
            </DatedItem>
            <DatedItem year="2023">
              Lecture: University of Sydney, What design leadership can learn
              from agile methodologies; Panel: School of Visual Arts NYC: AI
              Sins – The future of the design industry with AI
            </DatedItem>
            <DatedItem year="2022">
              Workshop: SDN (Service Design Network) Youth Conference:
              Coach-like Service Design; Host: Tech Talks Sydney + Designit –
              Sustainability by Design
            </DatedItem>
            <DatedItem year="2018">
              Seminars: NAAUC National Conference – (1) Diversity in leadership,
              (2) Universities in a digital world
            </DatedItem>
          </DatedList>
        </CvSection>

        <CvSection title="Ask me about...">
          <p>
            Filter coffee, Photography, Vulfpeck, All 6 seasons of Lost (TV
            Show), Moving from architecture to IXD, Vipassana meditation.
          </p>
        </CvSection>

        <CvSection title="Lately...">
          <p>
            Building a timezone picker tool, hiking, running, and Afro-Cuban
            dance (rumba, son).
          </p>
        </CvSection>
      </CvPage>
    </>
  );
}
