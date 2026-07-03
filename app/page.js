import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Code2,
  Download,
  Globe2,
  Handshake,
  Lightbulb,
  MapPin,
  Network,
  Phone,
  Rocket,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

import StickyNav      from "./components/StickyNav";
import ParticleCanvas  from "./components/ParticleCanvas";
import Marquee         from "./components/Marquee";
import ScrollAnimator   from "./components/ScrollAnimator";
import SmoothScroll    from "./components/SmoothScroll";

/* ── Data ────────────────────────────────────────────────── */
const theme =
  "Innovating for Sustainable Development: Empowering Northern Nigeria Through Technology, Entrepreneurship and Collaboration.";

const pillars = [
  {
    title: "Innovate",
    copy:  "Spotlight practical ideas, emerging technologies, startups, and local solutions with the potential to strengthen Plateau's economy and communities.",
    icon:  Lightbulb,
  },
  {
    title: "Collaborate",
    copy:  "Bring government, academia, innovation hubs, industry, development partners, and founders into one powerful working platform.",
    icon:  Handshake,
  },
  {
    title: "Transform",
    copy:  "Turn ecosystem energy into partnerships, talent pathways, investment conversations, and visible long-term public momentum.",
    icon:  Sparkles,
  },
];

const audiences = [
  "Plateau State Government",
  "Federal Government Agencies",
  "Academia & Research",
  "Innovation Hubs",
  "Universities",
  "Industry Leaders",
  "Development Partners",
  "Media Organizations",
  "Startup Ecosystem",
];

const program = [
  [
    "Jos Innovation Hackathon 2026",
    "A multi-day innovation competition for teams building practical technology solutions across agriculture, healthcare, education, finance, climate, governance, AI, security, and digital services.",
  ],
  [
    "Innovation Conference",
    "Keynotes, policy conversations, industry sessions, founder stories, and ecosystem dialogue shaping the future of Northern Nigeria.",
  ],
  [
    "Technical Workshops",
    "Hands-on sessions covering AI, software development, cloud computing, cybersecurity, UI/UX, product management, entrepreneurship, startup growth, and digital marketing.",
  ],
  [
    "Startup & Innovation Exhibition",
    "A flagship showcase for startups, innovators, technology companies, and product teams to present real-world solutions to live audiences.",
  ],
  [
    "Career & Talent Fair",
    "Connecting students, graduates, and technology professionals with top employers, recruiters, mentors, and training opportunities.",
  ],
  [
    "Investor & Startup Networking",
    "Curated conversations between innovators, investors, corporate organizations, and ecosystem partners seeking strategic partnerships.",
  ],
];

const metrics = [
  ["300–500", "expected participants"],
  ["40–60",   "hackathon teams"],
  ["30+",     "expert mentors"],
  ["20+",     "judges & evaluators"],
  ["20+",     "partner organizations"],
];

const objectives = [
  "Unite innovation stakeholders across Plateau State.",
  "Promote practical technology innovation and startup development.",
  "Enhance digital skills among young people and graduates.",
  "Strengthen collaboration between universities, industry, and government.",
  "Showcase innovative solutions addressing real societal challenges.",
  "Establish an annual innovation platform for Plateau State.",
];

const partnershipTypes = [
  "Government partners",
  "Academic partners",
  "Innovation hub partners",
  "Corporate partners",
  "Business partners",
  "Development partners",
];

const featureCards = [
  { label: "Innovation challenges", icon: Lightbulb, href: "/challenges" },
  { label: "Hackathons",           icon: Code2,      href: "/hackathons" },
  { label: "Startup exhibitions",  icon: Rocket,     href: "/exhibitions" },
  { label: "Workshops",            icon: Sparkles,   href: "/workshops" },
  { label: "Mentorship",           icon: Handshake,  href: "/mentors" },
  { label: "Career fair",          icon: Building2,  href: "/career-fair" },
];

/* ── Marquee content ─────────────────────────────────────── */
const marquee1 = [
  "Jos Innovation Hackathon 2026",
  "Innovation Conference",
  "Technical Workshops",
  "Startup Exhibition",
  "Career & Talent Fair",
  "Investor Networking",
  "Jos • November 2026",
  "Convened by meHub",
];

const marquee2 = [
  "Artificial Intelligence",
  "Digital Entrepreneurship",
  "Youth Empowerment",
  "Sustainable Development",
  "Cloud Computing",
  "Cybersecurity",
  "Fintech",
  "AgriTech",
  "HealthTech",
  "Northern Nigeria",
];

const marquee3 = [
  "Partner with PSIW 2026",
  "Ideas Today · Impact Tomorrow",
  "Innovate • Collaborate • Transform",
  "Plateau State Innovation Week",
  "Join the Movement",
  "#PIW2026",
];

/* ── Component ───────────────────────────────────────────── */
export default function Home() {
  return (
    <main id="top">
      {/* Smooth scroll engine */}
      <SmoothScroll />

      {/* Scroll reveal engine */}
      <ScrollAnimator />

      {/* ── STICKY NAV ──────────────────────────────────── */}
      <StickyNav />

      {/* ══════════════════════════════════════════════════
          HERO — FULL BANNER
      ══════════════════════════════════════════════════ */}
      <section className="hero" aria-label="Plateau State Innovation Week 2026 hero">
        {/* Background image (poster as atmospheric backdrop) */}
        <div className="heroBg" aria-hidden="true">
          <Image
            src="/piw-main-poster.png"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover", objectPosition: "center 22%" }}
          />
        </div>

        {/* Overlay layers */}
        <div className="heroOverlay" aria-hidden="true" />
        <div className="heroMesh"    aria-hidden="true" />

        {/* Interactive particles */}
        <ParticleCanvas />

        {/* Floating orbs */}
        <div className="orbA" aria-hidden="true" />
        <div className="orbB" aria-hidden="true" />
        <div className="orbC" aria-hidden="true" />

        {/* ── Hero content ──────────────────────────────── */}
        <div className="heroContent">
          {/* Convened-by badge */}
          <a
            className="convenedBy"
            href="https://mehub.ng"
            aria-label="meHub website"
          >
            <span className="convenedByLabel">Convened by</span>
            <Image src="/mehub-logo.png" alt="meHub" width={150} height={64} />
          </a>

          {/* Kicker */}
          <p className="kicker">Plateau State Innovation Week 2026</p>

          {/* Main headline */}
          <h1 className="heroTitle">
            Ideas today.{" "}
            <span className="glitchWord">Impact</span>{" "}
            tomorrow.
          </h1>

          {/* Subtitle */}
          <p className="heroSubtitle">
            A proposed week-long innovation festival in Jos designed to unite
            government, universities, innovation hubs, technology companies,
            startups, investors, media, entrepreneurs, and young innovators
            under one collaborative platform.
          </p>

          {/* Theme quote */}
          <p className="themeLine">{theme}</p>

          {/* Info chips */}
          <div className="heroChips">
            <span className="heroChip">
              <CalendarDays size={14} aria-hidden="true" />
              November 2026
            </span>
            <span className="heroChip">
              <MapPin size={14} aria-hidden="true" />
              Jos, Plateau State
            </span>
            <span className="heroChip">
              <UsersRound size={14} aria-hidden="true" />
              Convened by meHub
            </span>
          </div>

          {/* CTAs */}
          <div className="actionRow">
            <Link
              className="btn btnPrimary"
              id="cta-partner"
              href="/partner"
            >
              Partner with PIW
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <a
              className="btn btnSecondary"
              id="cta-download"
              href="/concept-note-plateau-innovation-week-2026.pdf"
            >
              <Download size={17} strokeWidth={2.2} aria-hidden="true" />
              Download concept note
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scrollIndicator" aria-hidden="true">
          <span>Scroll</span>
          <Zap size={14} />
        </div>

        {/* ── Feature strip ─────────────────────────────── */}
        <div className="featureStrip" aria-label="Featured activities">
          {featureCards.map((item) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.label} style={{ display: 'contents' }}>
                <div className="featureItem">
                  <Icon size={22} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── MARQUEE 1: Activities ────────────────────────── */}
      <Marquee items={marquee1} dark speed={26} />

      {/* ══════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════ */}
      <section id="about" aria-label="About Plateau State Innovation Week">
        <div className="statementWrap">
          <div data-reveal>
            <p className="eyebrow">About the Week</p>
            <h2>
              Plateau&apos;s platform for technology, entrepreneurship, youth
              empowerment, and collaboration.
            </h2>
          </div>
          <p data-reveal data-delay="200">
            Coordinated by meHub, the week uses an ecosystem model where
            organizations contribute according to their strengths. The goal is
            to establish Plateau State as Northern Nigeria&apos;s leading
            innovation ecosystem — a model others can learn from.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          METRICS (dark band)
      ══════════════════════════════════════════════════ */}
      <section className="metricsBand" aria-label="Expected participation numbers">
        <div className="metricsGrid">
          {metrics.map(([value, label], i) => (
            <div
              className="metricCard"
              key={label}
              data-reveal
              data-delay={String(i * 100)}
            >
              <span className="metricVal">{value}</span>
              <span className="metricLabel">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE 2: Tech keywords ─────────────────────── */}
      <Marquee items={marquee2} dark reverse speed={22} />

      {/* ══════════════════════════════════════════════════
          PROJECT GOAL / PILLARS
      ══════════════════════════════════════════════════ */}
      <section className="section" style={{ paddingTop: "96px" }}>
        <div className="sectionHdr" data-reveal>
          <p className="eyebrow">Project Goal</p>
          <h2>
            Build lasting ecosystem relationships, not just a one-off event.
          </h2>
        </div>

        <div className="pillarGrid">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const pathMap = ["/challenges", "/partner", "/career-fair"];
            return (
              <Link
                href={pathMap[i]}
                key={pillar.title}
                style={{ display: "block" }}
              >
                <article
                  className="pillarCard"
                  data-reveal
                  data-delay={String(i * 150)}
                  style={{ height: "100%" }}
                >
                  <div className="pillarIcon">
                    <Icon size={26} strokeWidth={2.1} aria-hidden="true" />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROGRAM
      ══════════════════════════════════════════════════ */}
      <section className="section" id="program" aria-label="Event program">
        <div className="sectionHdr" data-reveal>
          <p className="eyebrow">Event Components</p>
          <h2>
            A practical week anchored by the Jos Innovation Hackathon 2026.
          </h2>
          <p>
            The week combines problem-solving, learning, exhibition, networking,
            policy dialogue, mentorship, and talent development.
          </p>
        </div>

        <div className="programGrid">
          {program.map(([title, copy], i) => {
            const pathMap = [
              "/hackathons",
              "/register",
              "/workshops",
              "/exhibitions",
              "/career-fair",
              "/partner"
            ];
            return (
              <Link
                href={pathMap[i] || "/"}
                key={title}
                style={{ display: "block" }}
              >
                <article
                  className="programCard"
                  data-reveal
                  data-delay={String((i % 2) * 150)}
                  style={{ height: "100%" }}
                >
                  <div className="programNum">{String(i + 1).padStart(2, "0")}</div>
                  <span className="programTitle" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {title}
                    <ArrowRight size={14} style={{ opacity: 0.6 }} />
                  </span>
                  <p>{copy}</p>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OBJECTIVES
      ══════════════════════════════════════════════════ */}
      <section className="section" aria-label="Event objectives">
        <div className="sectionHdr" data-reveal>
          <p className="eyebrow">Objectives</p>
          <h2>What the week is designed to achieve.</h2>
        </div>
        <div className="objectiveGrid">
          {objectives.map((objective, i) => (
            <div
              className="objectiveItem"
              key={objective}
              data-reveal
              data-delay={String((i % 2) * 100)}
            >
              <span className="dot" aria-hidden="true" />
              <p>{objective}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE 3: Slogans ───────────────────────────── */}
      <Marquee items={marquee3} dark={false} speed={20} />

      {/* ══════════════════════════════════════════════════
          PARTNER BAND
      ══════════════════════════════════════════════════ */}
      <section className="partnerBand" id="partners" aria-label="Partnership and collaboration">
        <div className="partnerBandInner">
          <div className="partnerCopy" data-reveal>
            <p className="eyebrow">Collaboration</p>
            <h2>Built with the people who can move the ecosystem.</h2>
            <p>
              PIW 2026 invites organizations to participate as strategic
              partners through official endorsement, policy dialogue, student
              participation, mentorship, technical expertise, workshops, prizes,
              capacity building, media support, and ecosystem mobilization.
            </p>
          </div>

          <div className="audienceGrid" aria-label="Collaborating groups" data-reveal data-delay="200">
            {audiences.map((audience) => (
              <div className="audienceTag" key={audience}>
                {audience}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PARTNERSHIP TYPES
      ══════════════════════════════════════════════════ */}
      <section className="section" aria-label="Partnership opportunities">
        <div className="sectionHdr" data-reveal>
          <p className="eyebrow">Partnership Opportunities</p>
          <h2>
            Organizations can contribute through their strongest capabilities.
          </h2>
        </div>
        <div className="partnershipGrid">
          {partnershipTypes.map((type, i) => (
            <div
              className="partnershipTag"
              key={type}
              data-reveal
              data-delay={String(i * 80)}
            >
              {type}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════ */}
      <div className="ctaBandWrap" data-reveal>
        <div className="ctaBand">
          <div>
            <p className="eyebrow">Get Involved</p>
            <h2>
              Join as a founding strategic partner of Plateau State Innovation
              Week 2026.
            </h2>
          </div>
          <div className="ctaRight">
            <Link
              className="btn btnPrimary"
              id="cta-convo"
              href="/partner"
            >
              Start a conversation
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════ */}
      <section className="contactBand" id="contact" aria-label="Contact information">
        <div data-reveal>
          <p className="eyebrow">Project Secretariat</p>
          <h2>meHub Project Management Office</h2>
          <p>No. 84, Maryam Plaza, Dogon Agogo, Bauchi Road, Jos, Plateau State.</p>
        </div>
        <div className="contactList" data-reveal data-delay="200">
          <a
            className="contactLink"
            href="mailto:plateauinnovationweek2026@gmail.com"
            id="contact-email"
          >
            <Globe2 size={19} aria-hidden="true" />
            plateauinnovationweek2026@gmail.com
          </a>
          <a
            className="contactLink"
            href="tel:+2348033617623"
            id="contact-phone"
          >
            <Phone size={19} aria-hidden="true" />
            +234 803 361 7623
          </a>
          <a
            className="contactLink"
            href="https://plateauinnovationweek.ng"
            id="contact-website"
          >
            <Globe2 size={19} aria-hidden="true" />
            plateauinnovationweek.ng
          </a>
          <div className="contactLink">
            <Network size={19} aria-hidden="true" />
            @plateauinnovationweek2026
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="footerContent">
          <strong>Plateau State Innovation Week 2026</strong>
          <p>Innovation grows where collaboration begins.</p>
        </div>
        <div className="footerIcons" aria-hidden="true">
          <Building2 size={20} />
          <Network    size={20} />
        </div>
      </footer>
    </main>
  );
}
