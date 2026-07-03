'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    category: 'sponsorship',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'partner', data: formData })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application.');
      setTicketId(data.refCode);
      setSuccess(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <SmoothScroll />
      <StickyNav />

      <section className="pageHero">
        {/* Interactive particles background */}
        <ParticleCanvas />

        <div className="pageContent">
          {/* Back to Home anchor link */}
          <Link href="/" className="brand" style={{ marginBottom: '24px', opacity: 0.8 }} aria-label="Go back to homepage">
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            Back to main page
          </Link>

          {!success ? (
            <>
              <div className="pageHeader">
                <p className="eyebrow" style={{ color: 'var(--yellow)' }}>PSIW 2026 Collaboration</p>
                <h1>Partner with PIW</h1>
                <p>
                  Help shape the largest innovation event in Plateau State. Contribute resources, mentorship, funding, or infrastructure, and gain high-impact visibility.
                </p>
              </div>

              <div className="formContainer">
                <form onSubmit={handleSubmit} className="formGrid">
                  <div className="inputGroup">
                    <label className="formLabel" htmlFor="orgName">Organisation Name</label>
                    <input
                      className="formInput"
                      id="orgName"
                      name="orgName"
                      type="text"
                      placeholder="e.g. Acme Tech Solutions"
                      value={formData.orgName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="inputGroup">
                    <label className="formLabel" htmlFor="contactName">Contact Name</label>
                    <input
                      className="formInput"
                      id="contactName"
                      name="contactName"
                      type="text"
                      placeholder="e.g. Dr. John Doe"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="inputGroup">
                    <label className="formLabel" htmlFor="designation">Designation / Role</label>
                    <input
                      className="formInput"
                      id="designation"
                      name="designation"
                      type="text"
                      placeholder="e.g. Executive Director"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="inputGroup">
                    <label className="formLabel" htmlFor="category">Partnership Category</label>
                    <select
                      className="formSelect"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="sponsorship">Sponsorship & Funding</option>
                      <option value="academic">Academic / University Partner</option>
                      <option value="hub">Innovation Hub / Incubator</option>
                      <option value="media">Media & Publicity Partner</option>
                      <option value="government">Government & Policy Partner</option>
                      <option value="mentorship">Mentorship / Speaker Panel</option>
                      <option value="exhibitor">Exhibitor / Booth Showcase</option>
                    </select>
                  </div>

                  <div className="inputGroup">
                    <label className="formLabel" htmlFor="email">Official Email</label>
                    <input
                      className="formInput"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. partner@acme.org"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="inputGroup">
                    <label className="formLabel" htmlFor="phone">Phone Number</label>
                    <input
                      className="formInput"
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. +234 800 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="inputGroup formFull">
                    <label className="formLabel" htmlFor="details">Contribution Details & Vision</label>
                    <textarea
                      className="formTextarea"
                      id="details"
                      name="details"
                      rows="4"
                      placeholder="Tell us what capabilities, sponsorships, or ecosystem resources you would like to bring to Plateau State Innovation Week 2026..."
                      value={formData.details}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="formActions formFull">
                    <Link href="/" className="formBtn cancel">
                      Cancel
                    </Link>
                    <button
                      className="formBtn submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing Application...' : 'Send Partnership Request'}
                      {!isSubmitting && <ArrowRight size={16} />}
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="formContainer">
              <div className="successWrapper">
                <div className="checkCircle">
                  <ShieldCheck size={38} />
                </div>
                <h2>Application Submitted!</h2>
                <p>
                  Thank you for applying to partner with **Plateau State Innovation Week 2026**. Our secretariat team from meHub will review your proposal and reach out to you within 48 hours.
                </p>

                <div className="ticketBadge">
                  <span className="ticketLabel">Partnership ID</span>
                  <span className="ticketCode">{ticketId}</span>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <Link href="/" className="formBtn submit">
                    Return to home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
