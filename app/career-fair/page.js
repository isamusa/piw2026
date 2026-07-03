'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Briefcase, FileCode2, Sparkles, Building2, GraduationCap } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

const FEATURES = [
  { icon: Building2, title: "Recruiter Networking", desc: "Interact face-to-face with technical recruiters from regional startups, banks, and national agencies." },
  { icon: GraduationCap, title: "Internship Pathways", desc: "Specific slots designated for current students and recent graduates from UNIJOS, PLASU, PLAPOLY." },
  { icon: FileCode2, title: "Tech Talent Directory", desc: "All resume profiles submitted here are collated and shared directly with verified hiring partners." },
  { icon: Sparkles, title: "Portfolio Audits", desc: "Get direct design and code feedback from senior engineers to improve job readiness." }
];

export default function CareerFairPage() {
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
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Career & Talent Fair</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Unlock Your Next Tech Opportunity.</h1>
            <p style={{ margin: '14px 0 0 0', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              Connecting young engineers, product designers, and technology professionals in Plateau State with recruiters, agencies, and startup hubs. Get your resume audited and secure interviews.
            </p>
          </div>

          <div className="subpageGrid" style={{ marginBottom: '40px' }}>
            {FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="formContainer" style={{ padding: '30px', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div className="selectorCardIcon" style={{ flexShrink: 0, width: '44px', height: '44px', background: 'rgba(6, 160, 69, 0.1)', color: 'var(--green-2)', borderColor: 'rgba(6,160,69,0.2)' }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit', fontWeight: '800', marginBottom: '8px', color: 'var(--white)' }}>{item.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="formContainer" style={{ padding: '36px', textAlign: 'center', border: '1px solid rgba(6,160,69,0.3)', background: 'rgba(6,160,69,0.02)' }}>
            <div style={{ maxWidth: '620px', margin: '0 auto' }}>
              <Briefcase size={36} style={{ color: 'var(--green-2)', marginBottom: '14px' }} />
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'Outfit', fontWeight: '900', marginBottom: '10px' }}>Submit Your Profile to Talent Directory</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.94rem', marginBottom: '24px', lineHeight: '1.6' }}>
                Join the official Tech Talent Directory to let verified tech companies explore your skillset, design portfolio, or GitHub repositories directly.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/students" className="formBtn submit">
                  Submit Talent Profile
                  <ArrowRight size={16} />
                </Link>
                <Link href="/register" className="formBtn cancel">
                  Register Attendee Ticket
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
