'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, UserCheck, Users, Store, ShieldCheck } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

export default function RegisterPage() {
  const [regType, setRegType] = useState('attendee'); // 'attendee', 'hackathon', 'exhibitor'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketCode, setTicketCode] = useState('');

  // Form states
  const [attendeeForm, setAttendeeForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    userType: 'professional',
    orgName: '',
  });

  const [hackathonForm, setHackathonForm] = useState({
    teamName: '',
    leadName: '',
    leadEmail: '',
    leadPhone: '',
    memberCount: '3',
    track: 'agritech',
    ideaDescription: '',
  });

  const [exhibitorForm, setExhibitorForm] = useState({
    startupName: '',
    contactName: '',
    email: '',
    phone: '',
    sector: 'software',
    overview: '',
  });

  const handleTypeChange = (type) => {
    setRegType(type);
  };

  const generateTicket = (prefix) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = prefix + '-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payloadData = regType === 'attendee' 
      ? attendeeForm 
      : regType === 'hackathon' 
        ? hackathonForm 
        : exhibitorForm;

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: regType, data: payloadData })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit registration.');
      setTicketCode(data.refCode);
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
        <ParticleCanvas />

        <div className="pageContent">
          <Link href="/" className="brand" style={{ marginBottom: '24px', opacity: 0.8 }} aria-label="Go back to homepage">
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            Back to main page
          </Link>

          {!success ? (
            <>
              <div className="pageHeader">
                <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Join PSIW 2026</p>
                <h1>Secure Your Spot</h1>
                <p>
                  Register to attend the conference, pitch your startup in the exhibition, or compete in the Jos Innovation Hackathon.
                </p>
              </div>

              {/* Step 1: Select Path */}
              <div className="selectorGrid">
                <div
                  className={`selectorCard ${regType === 'attendee' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('attendee')}
                >
                  <div className="selectorCardIcon">
                    <UserCheck size={20} />
                  </div>
                  <h3>Attendee</h3>
                  <p>Access keynotes, career fairs, and networking.</p>
                </div>

                <div
                  className={`selectorCard ${regType === 'hackathon' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('hackathon')}
                >
                  <div className="selectorCardIcon">
                    <Users size={20} />
                  </div>
                  <h3>Hackathon Team</h3>
                  <p>Build and pitch solutions to win prizes.</p>
                </div>

                <div
                  className={`selectorCard ${regType === 'exhibitor' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('exhibitor')}
                >
                  <div className="selectorCardIcon">
                    <Store size={20} />
                  </div>
                  <h3>Exhibitor</h3>
                  <p>Showcase your startup to investors and policy makers.</p>
                </div>
              </div>

              {/* Step 2: Form */}
              <div className="formContainer">
                <form onSubmit={handleSubmit} className="formGrid">
                  
                  {/* ATTENDEE FORM */}
                  {regType === 'attendee' && (
                    <>
                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="fullName">Full Name</label>
                        <input
                          className="formInput"
                          id="fullName"
                          type="text"
                          placeholder="e.g. Samuel Lar"
                          value={attendeeForm.fullName}
                          onChange={(e) => setAttendeeForm({ ...attendeeForm, fullName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="email">Email Address</label>
                        <input
                          className="formInput"
                          id="email"
                          type="email"
                          placeholder="e.g. samuel@gmail.com"
                          value={attendeeForm.email}
                          onChange={(e) => setAttendeeForm({ ...attendeeForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="phone">Phone Number</label>
                        <input
                          className="formInput"
                          id="phone"
                          type="tel"
                          placeholder="e.g. +234 812 345 6789"
                          value={attendeeForm.phone}
                          onChange={(e) => setAttendeeForm({ ...attendeeForm, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="userType">Current Role / Type</label>
                        <select
                          className="formSelect"
                          id="userType"
                          value={attendeeForm.userType}
                          onChange={(e) => setAttendeeForm({ ...attendeeForm, userType: e.target.value })}
                        >
                          <option value="student">Student / Undergraduate</option>
                          <option value="professional">Working Professional</option>
                          <option value="founder">Startup Founder / Entrepreneur</option>
                          <option value="academic">Academic Researcher / Lecturer</option>
                          <option value="government">Government Representative</option>
                        </select>
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="orgName">Organisation / School Name</label>
                        <input
                          className="formInput"
                          id="orgName"
                          type="text"
                          placeholder="e.g. University of Jos / Acme Hub"
                          value={attendeeForm.orgName}
                          onChange={(e) => setAttendeeForm({ ...attendeeForm, orgName: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* HACKATHON FORM */}
                  {regType === 'hackathon' && (
                    <>
                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="teamName">Team Name</label>
                        <input
                          className="formInput"
                          id="teamName"
                          type="text"
                          placeholder="e.g. Plateau Cyber Knights"
                          value={hackathonForm.teamName}
                          onChange={(e) => setHackathonForm({ ...hackathonForm, teamName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="leadName">Team Lead Name</label>
                        <input
                          className="formInput"
                          id="leadName"
                          type="text"
                          placeholder="e.g. Joy Pam"
                          value={hackathonForm.leadName}
                          onChange={(e) => setHackathonForm({ ...hackathonForm, leadName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="leadEmail">Lead Email Address</label>
                        <input
                          className="formInput"
                          id="leadEmail"
                          type="email"
                          placeholder="e.g. joy.pam@gmail.com"
                          value={hackathonForm.leadEmail}
                          onChange={(e) => setHackathonForm({ ...hackathonForm, leadEmail: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="leadPhone">Lead Phone Number</label>
                        <input
                          className="formInput"
                          id="leadPhone"
                          type="tel"
                          placeholder="e.g. +234 908 765 4321"
                          value={hackathonForm.leadPhone}
                          onChange={(e) => setHackathonForm({ ...hackathonForm, leadPhone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="memberCount">Total Team Members (inc. Lead)</label>
                        <select
                          className="formSelect"
                          id="memberCount"
                          value={hackathonForm.memberCount}
                          onChange={(e) => setHackathonForm({ ...hackathonForm, memberCount: e.target.value })}
                        >
                          <option value="2">2 Members</option>
                          <option value="3">3 Members</option>
                          <option value="4">4 Members</option>
                          <option value="5">5 Members</option>
                        </select>
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="track">Hackathon Track Area</label>
                        <select
                          className="formSelect"
                          id="track"
                          value={hackathonForm.track}
                          onChange={(e) => setHackathonForm({ ...hackathonForm, track: e.target.value })}
                        >
                          <option value="agritech">AgriTech & Food Security</option>
                          <option value="healthtech">HealthTech & Public Welfare</option>
                          <option value="edutech">EduTech & Virtual Learning</option>
                          <option value="fintech">FinTech & Financial Inclusion</option>
                          <option value="govtech">GovTech, AI, & Digital Services</option>
                          <option value="climatetech">Climate, Circular Economy & Waste</option>
                        </select>
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="ideaDescription">Brief Project Idea Description</label>
                        <textarea
                          className="formTextarea"
                          id="ideaDescription"
                          rows="4"
                          placeholder="Summarize the problem you are solving, the technical approach you plan to take during the hackathon, and the potential impact on Plateau State..."
                          value={hackathonForm.ideaDescription}
                          onChange={(e) => setHackathonForm({ ...hackathonForm, ideaDescription: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* EXHIBITOR FORM */}
                  {regType === 'exhibitor' && (
                    <>
                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="startupName">Startup / Brand Name</label>
                        <input
                          className="formInput"
                          id="startupName"
                          type="text"
                          placeholder="e.g. meHub Innovations"
                          value={exhibitorForm.startupName}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, startupName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="contactName">Representative Name</label>
                        <input
                          className="formInput"
                          id="contactName"
                          type="text"
                          placeholder="e.g. Caleb Gowon"
                          value={exhibitorForm.contactName}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, contactName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="email">Official Email</label>
                        <input
                          className="formInput"
                          id="email"
                          type="email"
                          placeholder="e.g. showcase@mehub.ng"
                          value={exhibitorForm.email}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="phone">Phone Number</label>
                        <input
                          className="formInput"
                          id="phone"
                          type="tel"
                          placeholder="e.g. +234 803 361 7623"
                          value={exhibitorForm.phone}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="sector">Exhibitor Sector / Theme</label>
                        <select
                          className="formSelect"
                          id="sector"
                          value={exhibitorForm.sector}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, sector: e.target.value })}
                        >
                          <option value="software">Software, SaaS & AI solutions</option>
                          <option value="hardware">Hardware, IoT, & Electronics Showcase</option>
                          <option value="ecommerce">E-commerce, Logistics, & Trade Platforms</option>
                          <option value="social">Social Enterprise & Non-profit Tech</option>
                          <option value="agrihub">Agricultural Technology/Agri-Processing</option>
                        </select>
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="overview">Product Overview & Showcase Description</label>
                        <textarea
                          className="formTextarea"
                          id="overview"
                          rows="4"
                          placeholder="Describe the product, technology model, or innovative service you plan to exhibit at your showcase booth..."
                          value={exhibitorForm.overview}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, overview: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="formActions formFull">
                    <Link href="/" className="formBtn cancel">
                      Cancel
                    </Link>
                    <button
                      className="formBtn submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Registering...' : 'Complete Registration'}
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
                
                {regType === 'attendee' && (
                  <>
                    <h2>Registration Successful!</h2>
                    <p>
                      Your attendee pass for **Plateau State Innovation Week 2026** is locked in. We have sent a confirmation email containing conference access details and timings to your inbox.
                    </p>
                  </>
                )}

                {regType === 'hackathon' && (
                  <>
                    <h2>Team Registered!</h2>
                    <p>
                      Your team **{hackathonForm.teamName}** is officially registered for the **Jos Innovation Hackathon 2026**. Check the lead email address for pre-hackathon briefs, rules, and workspace assignments.
                    </p>
                  </>
                )}

                {regType === 'exhibitor' && (
                  <>
                    <h2>Exhibition Application Sent!</h2>
                    <p>
                      Your application to exhibit **{exhibitorForm.startupName}** at the Startup Showcase has been received. Our operations team will review your application and space requirements within 3 business days.
                    </p>
                  </>
                )}

                <div className="ticketBadge">
                  <span className="ticketLabel">Verification Code</span>
                  <span className="ticketCode">{ticketCode}</span>
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
