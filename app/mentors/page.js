'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, User, Linkedin, Briefcase, Award } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

const MENTORS = [
  {
    name: "Isa Musa",
    role: "Director of Incubation, meHub",
    track: "AgriTech / GovTech Tracks",
    skills: ["Startup scaling", "Ecosystem partnerships", "Funding strategy"],
    linkedin: "https://linkedin.com"
  },
  {
    name: "Dr. Silas Dung",
    role: "Senior AI Researcher, University of Jos",
    track: "AI & Virtual Systems Tracks",
    skills: ["Neural networks", "Natural Language Processing", "Technical architecture"],
    linkedin: "https://linkedin.com"
  },
  {
    name: "Joy Pam",
    role: "Lead Designer, meHub Innovations",
    track: "UI/UX & Product Design Tracks",
    skills: ["Figma systems", "User research", "Design feedback"],
    linkedin: "https://linkedin.com"
  },
  {
    name: "Caleb Gowon",
    role: "Security Consultant, Cyber Shield",
    track: "Cybersecurity & Cloud Tracks",
    skills: ["Penetration testing", "AWS infrastructure", "Docker security"],
    linkedin: "https://linkedin.com"
  }
];

export default function MentorsPage() {
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
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Mentors & Judges Panel</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Learn From Ecosystem Leaders.</h1>
            <p style={{ margin: '14px 0 0 0', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              Meet our lineup of technical developers, design leaders, startup managers, and university professors providing active guidance to teams during Plateau State Innovation Week 2026.
            </p>
          </div>

          <div className="subpageGrid" style={{ marginBottom: '40px' }}>
            {MENTORS.map((item, i) => (
              <div key={item.name} className="formContainer" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div className="selectorCardIcon" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: '800', color: 'var(--white)' }}>{item.name}</h3>
                        <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginTop: '2px' }}>{item.role}</span>
                      </div>
                    </div>
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green-2)' }} aria-label={`${item.name} LinkedIn`}>
                      <Linkedin size={18} />
                    </a>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.82rem' }}>
                      <Award size={14} style={{ color: 'var(--yellow)', flexShrink: 0 }} />
                      <span className="formLabel" style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'none', letterSpacing: 'normal' }}>Assigned Track:</span>
                      <span style={{ color: 'var(--white)', fontWeight: '600' }}>{item.track}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                      <Briefcase size={14} style={{ color: 'var(--green-2)', flexShrink: 0, marginTop: '2px' }} />
                      <span className="formLabel" style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'none', letterSpacing: 'normal' }}>Skills:</span>
                      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: 0 }}>
                        {item.skills.map(s => (
                          <li key={s} style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <a href="mailto:plateauinnovationweek2026@gmail.com" className="formBtn submit" style={{ width: '100%', minHeight: '42px', fontSize: '0.86rem' }}>
                    Request Mentoring Session
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
