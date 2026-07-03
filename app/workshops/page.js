'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, ShieldAlert, Cpu, Palette, BarChart4 } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

const TRACKS = [
  {
    title: "AI & Software Development",
    icon: Code2,
    sessions: [
      { name: "Building Edge AI Tools in Python", time: "Day 1, 10:30 AM" },
      { name: "Next.js App Router Architecture", time: "Day 2, 2:00 PM" }
    ]
  },
  {
    title: "Cybersecurity & Infrastructure",
    icon: Cpu,
    sessions: [
      { name: "Zero Trust Networks for Hubs", time: "Day 1, 1:30 PM" },
      { name: "Docker & AWS Deployment Pipelines", time: "Day 3, 11:00 AM" }
    ]
  },
  {
    title: "Product Design & UX Research",
    icon: Palette,
    sessions: [
      { name: "Designing for Low-literacy Users", time: "Day 2, 11:30 AM" },
      { name: "Interactive Prototyping in Figma", time: "Day 3, 3:30 PM" }
    ]
  },
  {
    title: "Digital Scaling & Growth Hack",
    icon: BarChart4,
    sessions: [
      { name: "SEO Strategies for Local Startups", time: "Day 1, 3:00 PM" },
      { name: "No-Code MVP Launch Frameworks", time: "Day 2, 4:00 PM" }
    ]
  }
];

export default function WorkshopsPage() {
  return (
    <main>
      <SmoothScroll />
      <StickyNav />

      <section className="pageHero" style={{ minHeight: 'auto', paddingTop: '140px', paddingBottom: '100px' }}>
        <ParticleCanvas />
        <div className="pageContent" style={{ width: 'min(100%, 1000px)' }}>
          <Link href="/" className="brand" style={{ marginBottom: '24px', opacity: 0.8 }} aria-label="Go back to homepage">
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            Back to main page
          </Link>

          <div className="pageHeader" style={{ textAlign: 'left', margin: '0 0 56px 0', maxWidth: '780px' }}>
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Technical Workshops & Labs</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Sharpen Skills. Drive Growth.</h1>
            <p style={{ margin: '14px 0 0 0', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              Attend hands-on technical sessions facilitated by expert engineers, product directors, growth marketing leads, and security consultants from the meHub ecosystem.
            </p>
          </div>

          <div className="subpageGrid" style={{ marginBottom: '40px' }}>
            {TRACKS.map((track, i) => {
              const Icon = track.icon;
              return (
                <div key={track.title} className="formContainer" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div className="selectorCardIcon" style={{ width: '40px', height: '40px', background: 'rgba(6,160,69,0.1)', color: 'var(--green-2)', borderColor: 'rgba(6,160,69,0.2)' }}>
                        <Icon size={18} />
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontFamily: 'Outfit', fontWeight: '800' }}>{track.title}</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {track.sessions.map((s, idx) => (
                        <div key={idx} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--r-md)' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--white)', display: 'block', marginBottom: '4px' }}>{s.name}</span>
                          <span className="formLabel" style={{ fontSize: '0.62rem', color: 'var(--green-2)' }}>{s.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <Link href="/register" className="formBtn submit" style={{ width: '100%', minHeight: '44px', fontSize: '0.88rem' }}>
                      Register Workshop Pass
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="formContainer" style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'Outfit', fontWeight: '900', marginBottom: '10px' }}>Bring Your Own Device (BYOD)</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
              All labs are highly practical. Please bring your laptops and have pre-requisites installed. Setup guides will be emailed to registered pass-holders.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
