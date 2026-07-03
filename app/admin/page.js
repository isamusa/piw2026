'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Trash2, Eye, RefreshCw, Database, 
  Lock, ShieldAlert, CheckCircle2, XCircle, Clock, ExternalLink 
} from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';
import SmoothScroll from '../components/SmoothScroll';

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/submissions?type=${filterType}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to connect to backend.');
      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleStatusChange = async (id, status) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setSubmissions(prev => prev.map(item => item.id === id ? { ...item, status } : item));
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem(prev => ({ ...prev, status }));
        }
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissions(prev => prev.filter(item => item.id !== id));
        if (selectedItem && selectedItem.id === id) setSelectedItem(null);
      } else {
        alert('Failed to delete submission');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('CAUTION: This will delete ALL registrations in the PostgreSQL database. Proceed?')) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/submissions?all=true', { method: 'DELETE' });
      if (res.ok) {
        setSubmissions([]);
        setSelectedItem(null);
      } else {
        alert('Failed to clear database');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Helper getters for key info depending on type
  const getContactInfo = (item) => {
    const d = item.data || {};
    if (item.type === 'partner') return { name: d.organization || d.contactName, sub: d.email || d.phone };
    if (item.type === 'hackathon') return { name: d.teamName, sub: `${d.leaderName} (${d.leaderEmail})` };
    if (item.type === 'exhibitor') return { name: d.companyName, sub: `${d.contactPerson} (${d.email})` };
    return { name: d.fullName || `${d.firstName || ''} ${d.lastName || ''}`, sub: d.email || d.phone };
  };

  // Stats summaries
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--navy)', color: 'var(--white)' }}>
      <SmoothScroll />
      
      <section className="pageHero" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <ParticleCanvas />

        <div className="pageContent" style={{ width: 'min(100%, 1240px)', zIndex: 10 }}>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <Link href="/" className="brand" style={{ marginBottom: '14px', opacity: 0.8 }} aria-label="Go back to homepage">
                <ArrowLeft size={16} style={{ marginRight: '8px' }} />
                Back to site
              </Link>
              <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={32} style={{ color: 'var(--yellow)' }} />
                Secure Admin Portal
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '4px', fontSize: '0.94rem' }}>
                Event Secretariat Management Panel for Plateau State Innovation Week 2026.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={fetchSubmissions} 
                className="formBtn" 
                style={{ width: 'auto', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)' }}
                disabled={loading || actionLoading}
              >
                <RefreshCw size={14} className={loading ? 'spinAnim' : ''} />
                Refresh
              </button>
              <button 
                onClick={handleClearAll} 
                className="formBtn" 
                style={{ width: 'auto', padding: '10px 18px', background: 'rgba(255, 60, 60, 0.15)', borderColor: 'rgba(255, 60, 60, 0.3)' }}
                disabled={loading || actionLoading}
              >
                Clear Database
              </button>
            </div>
          </div>

          {/* Error fallback display */}
          {error ? (
            <div className="formContainer" style={{ padding: '40px', border: '1px solid rgba(255, 60, 60, 0.3)', background: 'rgba(255, 60, 60, 0.05)', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <ShieldAlert size={48} style={{ color: 'var(--red)', flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--white)', fontWeight: 800 }}>PostgreSQL Connection Failure</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px', lineHeight: '1.6' }}>
                    The backend API is unable to connect to your PostgreSQL database. To resolve this:
                  </p>
                  
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', marginTop: '16px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    <p style={{ color: 'var(--green-2)' }}># 1. Start your local PostgreSQL server database service</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>pg_ctl -D &quot;C:\Program Files\PostgreSQL\16\data&quot; start</p>
                    
                    <p style={{ color: 'var(--green-2)' }}># 2. Create the target database in psql client</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>CREATE DATABASE piw2026;</p>
                    
                    <p style={{ color: 'var(--green-2)' }}># 3. Supply credentials to Next.js in a &quot;.env.local&quot; file at root</p>
                    <p style={{ color: 'var(--yellow)' }}>DATABASE_URL=postgresql://postgres:[password]@localhost:5432/piw2026</p>
                  </div>
                  
                  <button 
                    onClick={fetchSubmissions} 
                    className="formBtn" 
                    style={{ width: 'auto', padding: '12px 24px', marginTop: '24px', background: 'var(--green-2)' }}
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Stats overview */}
              <div className="subpageGrid" style={{ gap: '16px', marginBottom: '32px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {[
                  { label: 'Total Submissions', count: stats.total, color: 'var(--white)', icon: Database },
                  { label: 'Pending Review', count: stats.pending, color: 'var(--yellow)', icon: Clock },
                  { label: 'Approved Entries', count: stats.approved, color: 'var(--green-2)', icon: CheckCircle2 },
                  { label: 'Rejected Entries', count: stats.rejected, color: 'rgba(255,80,80,0.85)', icon: XCircle }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="formContainer" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{stat.label}</span>
                        <div style={{ fontSize: '2.2rem', fontFamily: 'Digital Numbers', color: stat.color, marginTop: '6px' }}>{stat.count}</div>
                      </div>
                      <Icon size={28} style={{ opacity: 0.15, color: stat.color }} />
                    </div>
                  );
                })}
              </div>

              {/* Filtering Controls */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }} className="noScrollbar">
                {[
                  { label: 'All sections', value: 'all' },
                  { label: 'Partnership requests', value: 'partner' },
                  { label: 'Attendee tickets', value: 'attendee' },
                  { label: 'Hackathon entries', value: 'hackathon' },
                  { label: 'Exhibition booths', value: 'exhibitor' },
                  { label: 'Student volunteers', value: 'volunteer' },
                  { label: 'Talent profiles', value: 'talent' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilterType(item.value)}
                    style={{
                      padding: '10px 20px',
                      background: filterType === item.value ? 'var(--green-2)' : 'rgba(255,255,255,0.05)',
                      color: filterType === item.value ? 'var(--navy)' : 'var(--white)',
                      border: '1px solid',
                      borderColor: filterType === item.value ? 'var(--green-2)' : 'rgba(255,255,255,0.1)',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Data Table */}
              <div className="formContainer" style={{ padding: '0', overflow: 'hidden' }}>
                {loading ? (
                  <div style={{ padding: '80px 0', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    <RefreshCw size={36} className="spinAnim" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                    Loading records from PostgreSQL...
                  </div>
                ) : submissions.length === 0 ? (
                  <div style={{ padding: '80px 0', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    No submissions found under this filter.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--green-2)' }}>Ref Code</th>
                          <th style={{ padding: '16px 24px', fontWeight: 700 }}>Type</th>
                          <th style={{ padding: '16px 24px', fontWeight: 700 }}>Primary Contact / Entity</th>
                          <th style={{ padding: '16px 24px', fontWeight: 700 }}>Date Registered</th>
                          <th style={{ padding: '16px 24px', fontWeight: 700 }}>Status</th>
                          <th style={{ padding: '16px 24px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {submissions.map((item) => {
                          const contact = getContactInfo(item);
                          let badgeBg = 'rgba(255,255,255,0.08)';
                          let badgeColor = 'var(--white)';
                          if (item.type === 'partner') { badgeBg = 'rgba(5, 120, 240, 0.15)'; badgeColor = '#5cb8ff'; }
                          else if (item.type === 'hackathon') { badgeBg = 'rgba(255, 201, 60, 0.12)'; badgeColor = 'var(--yellow)'; }
                          else if (item.type === 'exhibitor') { badgeBg = 'rgba(255, 60, 200, 0.12)'; badgeColor = '#ff6cc8'; }
                          else if (item.type === 'volunteer') { badgeBg = 'rgba(6, 160, 69, 0.12)'; badgeColor = 'var(--green-2)'; }

                          return (
                            <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.25s' }} className="tableRowHover">
                              <td style={{ padding: '18px 24px', fontFamily: 'Syne Mono', fontWeight: 'bold' }}>{item.ref_code}</td>
                              <td style={{ padding: '18px 24px' }}>
                                <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: badgeBg, color: badgeColor }}>
                                  {item.type}
                                </span>
                              </td>
                              <td style={{ padding: '18px 24px' }}>
                                <div style={{ fontWeight: 700 }}>{contact.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{contact.sub}</div>
                              </td>
                              <td style={{ padding: '18px 24px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                                {new Date(item.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                              </td>
                              <td style={{ padding: '18px 24px' }}>
                                <select
                                  value={item.status}
                                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                  disabled={actionLoading}
                                  style={{
                                    background: item.status === 'approved' ? 'rgba(6, 160, 69, 0.15)' : item.status === 'rejected' ? 'rgba(255, 60, 60, 0.15)' : 'rgba(255, 201, 60, 0.15)',
                                    color: item.status === 'approved' ? 'var(--green-2)' : item.status === 'rejected' ? 'var(--red)' : 'var(--yellow)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontWeight: 'bold',
                                    fontSize: '0.82rem',
                                    cursor: 'pointer',
                                    outline: 'none'
                                  }}
                                >
                                  <option value="pending" style={{ background: 'var(--navy)', color: 'var(--white)' }}>Pending</option>
                                  <option value="approved" style={{ background: 'var(--navy)', color: 'var(--white)' }}>Approved</option>
                                  <option value="rejected" style={{ background: 'var(--navy)', color: 'var(--white)' }}>Rejected</option>
                                </select>
                              </td>
                              <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '8px' }}>
                                  <button
                                    onClick={() => setSelectedItem(item)}
                                    title="View submission details"
                                    style={{
                                      padding: '8px',
                                      background: 'rgba(255,255,255,0.05)',
                                      border: '1px solid rgba(255,255,255,0.1)',
                                      borderRadius: '6px',
                                      color: 'var(--white)',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    title="Delete record"
                                    style={{
                                      padding: '8px',
                                      background: 'rgba(255, 60, 60, 0.15)',
                                      border: '1px solid rgba(255, 60, 60, 0.2)',
                                      borderRadius: '6px',
                                      color: 'var(--red)',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Details Modal */}
          {selectedItem && (
            <div style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(5, 10, 20, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div 
                className="formContainer" 
                style={{ 
                  width: 'min(100%, 680px)', 
                  maxHeight: '85vh', 
                  overflowY: 'auto',
                  padding: '40px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--green-2)', fontFamily: 'Syne Mono', fontWeight: 'bold' }}>{selectedItem.ref_code}</span>
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 900, textTransform: 'capitalize', marginTop: '4px' }}>
                      {selectedItem.type} Details
                    </h2>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)} 
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--white)',
                      width: '32px', height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(selectedItem.data || {}).map(([key, val]) => {
                    // Stringify values nicely if they are arrays or objects
                    let formattedVal = '';
                    if (Array.isArray(val)) {
                      formattedVal = val.join(', ');
                    } else if (typeof val === 'object') {
                      formattedVal = JSON.stringify(val);
                    } else {
                      formattedVal = String(val);
                    }

                    // Format keys nicely (e.g. contactPerson -> Contact Person)
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                    return (
                      <div key={key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{label}</span>
                        <div style={{ marginTop: '4px', fontSize: '0.96rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                          {formattedVal || 'N/A'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '36px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => setSelectedItem(null)} 
                    className="formBtn"
                    style={{ width: 'auto', padding: '12px 24px', background: 'rgba(255,255,255,0.06)' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
