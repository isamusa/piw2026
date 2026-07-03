'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Code, ShieldAlert, Trophy, Users } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

const TIMELINE = [
  { step: "01", phase: "Team Registrations", date: "Sept 1 - Oct 30, 2026", details: "Submit team member details, tech profiles, and initial project track ideas via the portal." },
  { step: "02", phase: "Pre-Hack Webinars", date: "Nov 3 - Nov 8, 2026", details: "Attend webinars on API integrations, design requirements, and meHub ecosystem mentorship panels." },
  { step: "03", phase: "Live Hack Phase", date: "Nov 16 - Nov 18, 2026", details: "A continuous 48-hour sprint in Jos where teams build working software prototypes." },
  { step: "04", phase: "Mentoring Checkpoints", date: "Nov 17, 2026", details: "Progress checkpoints where judges and industry leads review codebase structures." },
  { step: "05", phase: "Demo & Pitching Day", date: "Nov 19, 2026", details: "Teams showcase live product prototypes to judges, sponsors, and startup recruiters." }
];

export default function HackathonPage() {
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
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Jos Innovation Hackathon 2026</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>48 Hours. Infinite Innovation.</h1>
            <p style={{ margin: '14px 0 0 0', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              The flagship code sprint of Plateau State Innovation Week 2026. Developers, innovators, and designers gather to build open-source web and mobile utilities tackling northern Nigeria&apos;s real-world sector deficits.
            </p>
          </div>

          <div className="hackathonGrid">
            
            {/* Timeline Column */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'Outfit', fontWeight: '900', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={22} style={{ color: 'var(--green-2)' }} />
                Event Journey
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {TIMELINE.map((item, i) => (
                  <div key={item.step} className="formContainer" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ fontFamily: 'Digital Numbers', fontSize: '1.6rem', color: 'var(--green-2)', opacity: 0.8 }}>{item.step}</div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', fontFamily: 'Outfit' }}>{item.phase}</h3>
                        <span className="formLabel" style={{ fontSize: '0.66rem', color: 'var(--yellow)', border: '1px solid rgba(255,201,60,0.2)', padding: '2px 8px', borderRadius: '4px' }}>{item.date}</span>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules & Info Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Prize Pool Info */}
              <div className="formContainer" style={{ padding: '32px', textAlign: 'center', border: '1px solid rgba(255,201,60,0.3)', background: 'rgba(255,201,60,0.02)' }}>
                <Trophy size={40} style={{ color: 'var(--yellow)', marginBottom: '14px', filter: 'drop-shadow(0 0 8px rgba(255,201,60,0.3))' }} />
                <span className="formLabel" style={{ color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>Grand Prize Pool</span>
                <span style={{ fontSize: '2rem', fontFamily: 'Digital Numbers', color: 'var(--yellow)', display: 'block', marginBottom: '16px' }}>₦7,500,000</span>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                  Split across top 3 teams, with additional equity-free micro-grants for local sector innovations.
                </p>
              </div>

              {/* Rules and Eligibility */}
              <div className="formContainer" style={{ padding: '28px' }}>
                <h2 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: '900', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={18} style={{ color: 'var(--green-2)' }} />
                  Sprint Rules
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.86rem', color: 'rgba(255,255,255,0.7)', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--green-2)' }}>✦</span>
                    Teams must consist of exactly 2 to 5 members.
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--green-2)' }}>✦</span>
                    All prototype code must be written during the active 48-hour window.
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--green-2)' }}>✦</span>
                    Codebases must be hosted on GitHub and submitted as open-source repositories.
                  </li>
                  <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--green-2)' }}>✦</span>
                    Teams must present a functioning web or mobile software demo on Demo Day.
                  </li>
                </ul>
              </div>

              {/* CTA Link */}
              <Link href="/register" className="formBtn submit" style={{ width: '100%', minHeight: '52px' }}>
                Register Hackathon Team
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
