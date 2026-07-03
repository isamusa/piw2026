'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, UserPlus, FileCode2, ShieldCheck } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

export default function StudentsPage() {
  const [studentPath, setStudentPath] = useState('volunteer'); // 'volunteer', 'talent'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // Form states
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    department: '',
    level: '300',
    area: 'logistics',
    motivation: '',
  });

  const [talentForm, setTalentForm] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    techTrack: 'software',
    portfolioUrl: '',
    resumeUrl: '',
    description: '',
  });

  const handlePathChange = (path) => {
    setStudentPath(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = (studentPath === 'volunteer' ? 'VOL-' : 'TAL-');
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setApplicationId(code);
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
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
                <p className="eyebrow" style={{ color: 'var(--yellow)' }}>PSIW 2026 Student Portal</p>
                <h1>Empowering the Next Generation</h1>
                <p>
                  We are providing opportunities for students in Plateau State to serve as event volunteers or create local tech talent profiles for hiring recruiters.
                </p>
              </div>

              {/* Step 1: Select Student Pathway */}
              <div className="selectorGrid">
                <div
                  className={`selectorCard ${studentPath === 'volunteer' ? 'active' : ''}`}
                  onClick={() => handlePathChange('volunteer')}
                  style={{ gridColumn: 'span 1.5' }}
                >
                  <div className="selectorCardIcon">
                    <UserPlus size={20} />
                  </div>
                  <div className="indicatorTag">
                    <span className="indicatorPulse"></span>
                    15 spots open
                  </div>
                  <h3>Student Volunteer</h3>
                  <p>Gain hands-on event operations experience and networking.</p>
                </div>

                <div
                  className={`selectorCard ${studentPath === 'talent' ? 'active' : ''}`}
                  onClick={() => handlePathChange('talent')}
                  style={{ gridColumn: 'span 1.5' }}
                >
                  <div className="selectorCardIcon">
                    <FileCode2 size={20} />
                  </div>
                  <div className="indicatorTag" style={{ borderColor: 'rgba(6, 160, 69, 0.3)', color: 'var(--green-2)' }}>
                    <span className="indicatorPulse" style={{ backgroundColor: 'var(--green-2)' }}></span>
                    Recruiters active
                  </div>
                  <h3>Tech Talent Profile</h3>
                  <p>Register your portfolio to get connected to recruiters.</p>
                </div>
              </div>

              {/* Step 2: Form */}
              <div className="formContainer">
                <form onSubmit={handleSubmit} className="formGrid">

                  {/* VOLUNTEER FORM */}
                  {studentPath === 'volunteer' && (
                    <>
                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="volName">Full Name</label>
                        <input
                          className="formInput"
                          id="volName"
                          type="text"
                          placeholder="e.g. Cynthia Gowon"
                          value={volunteerForm.name}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="volEmail">Email Address</label>
                        <input
                          className="formInput"
                          id="volEmail"
                          type="email"
                          placeholder="e.g. cynthia.gowon@student.unijos.edu.ng"
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="volPhone">Phone Number</label>
                        <input
                          className="formInput"
                          id="volPhone"
                          type="tel"
                          placeholder="e.g. +234 703 123 4567"
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="volSchool">Tertiary Institution</label>
                        <select
                          className="formSelect"
                          id="volSchool"
                          value={volunteerForm.school}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, school: e.target.value })}
                          required
                        >
                          <option value="">Select Institution...</option>
                          <option value="unijos">University of Jos (UNIJOS)</option>
                          <option value="plasu">Plateau State University, Bokkos (PLASU)</option>
                          <option value="fedpoly">Federal Polytechnic, Ny&apos;ak, Shendam</option>
                          <option value="plapoly">Plateau State Polytechnic, Barkin Ladi</option>
                          <option value="karlkumm">Karl Kumm University, Vom</option>
                          <option value="other">Other School (Outside Plateau)</option>
                        </select>
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="volDept">Department / Major</label>
                        <input
                          className="formInput"
                          id="volDept"
                          type="text"
                          placeholder="e.g. Computer Science / Business Admin"
                          value={volunteerForm.department}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, department: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="volLevel">Current Year of Study</label>
                        <select
                          className="formSelect"
                          id="volLevel"
                          value={volunteerForm.level}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, level: e.target.value })}
                        >
                          <option value="100">100 Level / Year 1</option>
                          <option value="200">200 Level / Year 2</option>
                          <option value="300">300 Level / Year 3</option>
                          <option value="400">400 Level / Year 4</option>
                          <option value="500">500 Level / Year 5</option>
                          <option value="graduated">Recent Graduate</option>
                        </select>
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="volArea">Preferred Volunteer Role</label>
                        <select
                          className="formSelect"
                          id="volArea"
                          value={volunteerForm.area}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, area: e.target.value })}
                        >
                          <option value="logistics">Event Logistics & Set-up support</option>
                          <option value="registration">Registration Desk & Front Desk Ushering</option>
                          <option value="hackathon">Hackathon Technical Assistant</option>
                          <option value="media">Photography / Videography Support</option>
                          <option value="social">Social Media Reporter & Content Creator</option>
                        </select>
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="volMotivation">Why do you want to volunteer for PSIW 2026?</label>
                        <textarea
                          className="formTextarea"
                          id="volMotivation"
                          rows="3"
                          placeholder="Tell us why you are interested in volunteering, what skills you bring, and what you hope to learn..."
                          value={volunteerForm.motivation}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, motivation: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* TALENT PROFILE FORM */}
                  {studentPath === 'talent' && (
                    <>
                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="talName">Full Name</label>
                        <input
                          className="formInput"
                          id="talName"
                          type="text"
                          placeholder="e.g. Silas Dung"
                          value={talentForm.name}
                          onChange={(e) => setTalentForm({ ...talentForm, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="talEmail">Email Address</label>
                        <input
                          className="formInput"
                          id="talEmail"
                          type="email"
                          placeholder="e.g. silas.dung@gmail.com"
                          value={talentForm.email}
                          onChange={(e) => setTalentForm({ ...talentForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="talPhone">Phone Number</label>
                        <input
                          className="formInput"
                          id="talPhone"
                          type="tel"
                          placeholder="e.g. +234 815 999 8888"
                          value={talentForm.phone}
                          onChange={(e) => setTalentForm({ ...talentForm, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="talSchool">Academic Institution</label>
                        <input
                          className="formInput"
                          id="talSchool"
                          type="text"
                          placeholder="e.g. Plateau State University / PLAPOLY"
                          value={talentForm.school}
                          onChange={(e) => setTalentForm({ ...talentForm, school: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="talTrack">Primary Tech Area</label>
                        <select
                          className="formSelect"
                          id="talTrack"
                          value={talentForm.techTrack}
                          onChange={(e) => setTalentForm({ ...talentForm, techTrack: e.target.value })}
                        >
                          <option value="software">Software Engineering (Frontend/Backend)</option>
                          <option value="design">UI/UX & Product Design</option>
                          <option value="data">Data Science & AI engineering</option>
                          <option value="pm">Product Management / Operations</option>
                          <option value="cybersecurity">Cybersecurity & Networking</option>
                          <option value="marketing">Digital Marketing & Growth hacking</option>
                        </select>
                      </div>

                      <div className="inputGroup">
                        <label className="formLabel" htmlFor="talPortfolio">Portfolio Link (e.g. GitHub / Behance)</label>
                        <input
                          className="formInput"
                          id="talPortfolio"
                          type="url"
                          placeholder="e.g. https://github.com/silas-dung"
                          value={talentForm.portfolioUrl}
                          onChange={(e) => setTalentForm({ ...talentForm, portfolioUrl: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="talResume">Resume / LinkedIn Profile URL</label>
                        <input
                          className="formInput"
                          id="talResume"
                          type="url"
                          placeholder="e.g. https://linkedin.com/in/silas-dung"
                          value={talentForm.resumeUrl}
                          onChange={(e) => setTalentForm({ ...talentForm, resumeUrl: e.target.value })}
                          required
                        />
                      </div>

                      <div className="inputGroup formFull">
                        <label className="formLabel" htmlFor="talDesc">Brief Bio & Technical Skills Summary</label>
                        <textarea
                          className="formTextarea"
                          id="talDesc"
                          rows="3"
                          placeholder="Summarize your tech stacks, project achievements, core competencies, and career objectives..."
                          value={talentForm.description}
                          onChange={(e) => setTalentForm({ ...talentForm, description: e.target.value })}
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
                      {isSubmitting ? 'Submitting Application...' : 'Submit Profile'}
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
                
                {studentPath === 'volunteer' && (
                  <>
                    <h2>Volunteer Application Received!</h2>
                    <p>
                      Your application to volunteer at **Plateau State Innovation Week 2026** is now in our system. The organizing committee from meHub will review student application quotas and email shortlist notifications by October 2026.
                    </p>
                  </>
                )}

                {studentPath === 'talent' && (
                  <>
                    <h2>Talent Profile Submitted!</h2>
                    <p>
                      Your technical talent profile has been registered in the **Plateau Tech Talent Directory**. Recruiter partners attending the Career & Talent Fair will have direct access to your resume and portfolios.
                    </p>
                  </>
                )}

                <div className="ticketBadge">
                  <span className="ticketLabel">Application Reference ID</span>
                  <span className="ticketCode">{applicationId}</span>
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
