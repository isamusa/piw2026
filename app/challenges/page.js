'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Award, Brain, Target, ShieldCheck, CheckCircle2 } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

const CHALLENGES = [
  {
    title: "AgriTech & Food Security",
    desc: "Build solutions addressing crop disease, yield prediction, supply chain optimization, and cold-storage tracking specifically for Plateau State agriculture.",
    prize: "₦2,500,000",
    metrics: ["Practical local viability", "Technical feasibility", "Execution speed"]
  },
  {
    title: "GovTech & Digital Citizen Services",
    desc: "Create transparent digital channels for government tax management, local land registries, and state government citizen feedback portals.",
    prize: "₦2,000,000",
    metrics: ["Public data security", "Ease of citizen use", "Interoperability"]
  },
  {
    title: "EduTech & Tech Capacity Building",
    desc: "Construct offline-friendly or low-bandwidth virtual classrooms to upscale youth skills across remote local governments in Plateau State.",
    prize: "₦1,500,000",
    metrics: ["Low bandwidth support", "Engagement metrics", "Scalability"]
  },
  {
    title: "Climate & Waste Circular Economy",
    desc: "Develop smart waste recycling trackers and ecological monitoring systems targeting plastic waste management and clean water supply solutions in Jos.",
    prize: "₦1,500,000",
    metrics: ["Environmental impact", "Sustainability model", "Community adoption"]
  }
];

export default function ChallengesPage() {
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
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>PSIW 2026 Innovation challenges</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Solve Local Problems. Win Prizes.</h1>
            <p style={{ margin: '14px 0 0 0', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              Plateau State Innovation Week 2026 features dedicated challenge tracks aimed at building technical solutions for local community issues. Open to developers, designers, and social innovators.
            </p>
          </div>

          <div className="subpageGrid">
            {CHALLENGES.map((item, i) => (
              <div 
                className="formContainer" 
                key={item.title} 
                style={{ 
                  padding: '32px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  animationDelay: `${i * 100}ms`
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <div className="selectorCardIcon" style={{ width: '40px', height: '40px', background: 'rgba(255,201,60,0.1)', color: 'var(--yellow)', borderColor: 'rgba(255,201,60,0.2)' }}>
                      <Brain size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'Outfit', fontWeight: '800' }}>{item.title}</h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    {item.desc}
                  </p>
                </div>

                <div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '24px' }}>
                    <span className="formLabel" style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>Evaluation Criteria</span>
                    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.metrics.map(m => (
                        <li key={m} style={{ fontSize: '0.72rem', background: 'rgba(6, 160, 69, 0.12)', border: '1px solid rgba(6, 160, 69, 0.2)', padding: '4px 10px', borderRadius: '999px', color: 'var(--green-2)' }}>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px 18px', borderRadius: 'var(--r-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="formLabel" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)' }}>Track Prize Pool</span>
                      <span style={{ fontSize: '1.3rem', fontFamily: 'Digital Numbers', color: 'var(--green-2)' }}>{item.prize}</span>
                    </div>
                    <Link href="/register" className="formBtn submit" style={{ minHeight: '38px', padding: '0 16px', fontSize: '0.82rem', borderRadius: 'var(--r-sm)' }}>
                      Apply Track
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="formContainer" style={{ marginTop: '40px', padding: '36px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(5,15,31,0.9) 0%, rgba(6,160,69,0.15) 100%)' }}>
            <div style={{ maxWidth: '620px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', fontWeight: '900', marginBottom: '12px' }}>Interested in building the future of Plateau?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.96rem', marginBottom: '24px' }}>
                Challenge tracks registration closes early November 2026. Submit your team entry and project pitch proposal to receive mentoring support.
              </p>
              <Link href="/register" className="formBtn submit" style={{ display: 'inline-flex' }}>
                Secure Hackathon Team Spot
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
