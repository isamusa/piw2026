'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#about',    label: 'About'    },
  { href: '/#program',  label: 'Program'  },
  { href: '/#partners', label: 'Partners' },
  { href: '/students',  label: 'Students' },
  { href: '/#contact',  label: 'Contact'  },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('top');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 72);
      const ids = ['contact', 'partners', 'program', 'about', 'top'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpen]);

  return (
    <header className={`stickyHeader${scrolled ? ' scrolled' : ''}`}>
      <div className="navInner">
        {/* Brand */}
        <Link className="brand" href="/" aria-label="PSIW 2026 home">
          <Image src="/piw-emblem.jpeg" alt="PSIW" width={40} height={40} priority />
          <div className="brandText">
            <span className="brandName">PSIW&nbsp;2026</span>
            <span className="brandSub">Plateau State Innovation Week</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="navLinks" aria-label="Primary navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`navLink${active === href.split('#')[1] ? ' navLinkActive' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          className="navCtaBtn"
          href="/register"
          aria-label="Register for PSIW 2026"
        >
          Register Now
          <ArrowRight size={14} strokeWidth={2.6} aria-hidden="true" />
        </Link>

        {/* Hamburger */}
        <button
          className="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={(e) => { e.stopPropagation(); setMenuOpen(o => !o); }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobileMenu${menuOpen ? ' mobileMenuOpen' : ''}`} onClick={e => e.stopPropagation()}>
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`mobileLink${active === href.split('#')[1] ? ' mobileLinkActive' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/partner"
            className="mobileCta"
            style={{ marginRight: '10px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            onClick={() => setMenuOpen(false)}
          >
            Partner with us
          </Link>
          <Link
            href="/register"
            className="mobileCta"
            onClick={() => setMenuOpen(false)}
          >
            Register Now
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
