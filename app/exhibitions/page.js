'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Store, Tv, Megaphone, Users, Landmark } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

const OFFERS = [
  { icon: Tv, title: "Lobby Booth Showcase", desc: "Premium placement in the conference center hallway with high foot-traffic access." },
  { icon: Megaphone, title: "Media Spotlights", desc: "Features in official event highlights, interviews, and Plateau press releases." },
  { icon: Users, title: "Direct VC Access", desc: "Scheduled direct-meeting slots with active angel investors and venture capitalists." },
  { icon: Landmark, title: "Government Audits", desc: "Direct product demonstration slots to local, state, and federal technology regulators." }
];

export default function ExhibitionPage() {
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
            <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Startup & Innovation Exhibition</p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Showcase Your Tech. Build Traction.</h1>
            <p style={{ margin: '14px 0 0 0', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              Are you a tech startup, hardware developer, or product innovator based in Northern Nigeria? Exhibit your products at Plateau State Innovation Week 2026 to target institutional clients, hub managers, and investors.
            </p>
          </div>

          <div className="formGrid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {OFFERS.map((item, i) => {
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

          <div className="formContainer" style={{ padding: '36px', textAlign: 'center', border: '1px dashed rgba(6,160,69,0.4)', background: 'rgba(6, 160, 69, 0.02)' }}>
            <div style={{ maxWidth: '620px', margin: '0 auto' }}>
              <Store size={38} style={{ color: 'var(--green-2)', marginBottom: '14px' }} />
              <h2 style={{ fontSize: '1.6rem', fontFamily: 'Outfit', fontWeight: '900', marginBottom: '10px' }}>Secure Your Exhibition Booth</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.94rem', marginBottom: '24px', lineHeight: '1.6' }}>
                Exhibition space includes high-speed Wi-Fi, electricity adapters, display desks, and 2 exhibitor passes for team members. Applications close mid-October 2026.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
                <Link href="/register" className="formBtn submit">
                  Apply for Exhibition Space
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
