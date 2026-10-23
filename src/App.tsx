import { useMemo, useState } from 'react';
import {
Activity, AlertCircle, ArrowRight, BookOpen, CheckCircle2,
ChevronRight, FileText, HeartHandshake, Home, Moon,
Phone, Plus, Search, Shield, ShieldCheck, Siren, Sun,
X, ClipboardList, Camera, Scale, Clock, 
} from 'lucide-react';

type Tab = 'home' | 'guide' | 'legal' | 'incidents';

type LegalCard = {
id: number;
category: string;
title: string;
summary: string;
actions: string[];
avoid: string[];
};

type Incident = {
id: string;
title: string;
date: string;
notes: string;
};

const legalCards: LegalCard[] = [
{
id: 1,
category: 'Immediate response',
title: 'First actions after an accident',
summary: 'Prioritize safety, check for injuries, and contact emergency services when necessary.',
actions: [
'Move to a safe location if you can do so without creating more danger.',
'Check for immediate danger and serious injuries.',
'In India, call 112 for emergency assistance when needed.',
'Follow instructions from emergency responders.'
],
avoid: [
'Do not put yourself in traffic or another dangerous situation.',
'Do not move a seriously injured person unless there is an immediate danger requiring it.'
]
},
{
id: 2,
category: 'Evidence',
title: 'Document the incident',
summary: 'Record the facts while they are fresh, provided it is safe and lawful to do so.',
actions: [
'Record the date, time, and location.',
'Photograph the scene and vehicle damage when safe.',
'Collect names and contact details of willing witnesses.',
'Keep relevant receipts, reports, and claim documents.'
],
avoid: [
'Do not enter traffic to take photographs.',
'Do not alter or fabricate evidence.',
'Do not publish other people’s private information online.'
]
},
{
id: 3,
category: 'Law enforcement',
title: 'Interacting with authorities',
summary: 'Remain calm, communicate factual information, and follow lawful instructions.',
actions: [
'Provide identification and required documents as applicable.',
'Describe what you directly observed.',
'Ask how to obtain an incident or complaint reference number when applicable.',
'Keep copies of documents you submit.'
],
avoid: [
'Do not guess when you do not know an answer.',
'Do not sign a document you cannot understand without seeking clarification.'
]
},
{
id: 4,
category: 'Insurance',
title: 'Prepare for an insurance claim',
summary: 'Promptly check your policy and insurer’s reporting requirements.',
actions: [
'Contact your insurer using its official contact details.',
'Keep policy details and relevant incident records available.',
'Save repair estimates, bills, and claim reference numbers.',
'Ask the insurer what documents are required and by when.'
],
avoid: [
'Do not assume every policy covers every type of damage.',
'Do not discard relevant records before the claim is resolved.'
]
},
{
id: 5,
category: 'Good Samaritan',
title: 'Helping an injured person',
summary: 'Offer reasonable help without putting yourself or the injured person at additional risk.',
actions: [
'Check the scene for hazards before approaching.',
'Call emergency services when appropriate.',
'Follow the dispatcher’s instructions.',
'Respect privacy and avoid unnecessary photographs of injured people.'
],
avoid: [
'Do not attempt medical procedures beyond your training.',
'Do not assume legal protections apply identically in every jurisdiction.'
]
},
{
id: 6,
category: 'Driver responsibilities',
title: 'Responsibilities after a road collision',
summary: 'Stop in a safe place and follow applicable reporting, assistance, and documentation requirements.',
actions: [
'Stop where it is safe and appropriate to do so.',
'Check whether anyone needs emergency assistance.',
'Exchange required information where applicable.',
'Follow local reporting requirements and cooperate with authorities.'
],
avoid: [
'Do not leave a scene when the law requires you to remain.',
'Do not assume the same rules apply in every country or state.'
]
}
];

const categories = [
{ name: 'Immediate response', icon: Siren, color: 'red' },
{ name: 'Law enforcement', icon: ShieldCheck, color: 'blue' },
{ name: 'Insurance', icon: FileText, color: 'green' },
{ name: 'Good Samaritan', icon: HeartHandshake, color: 'purple' },
{ name: 'Driver responsibilities', icon: Scale, color: 'orange' },
{ name: 'Evidence', icon: Camera, color: 'cyan' }
];

function App() {
const [tab, setTab] = useState<Tab>('home');
const [dark, setDark] = useState(true);
const [search, setSearch] = useState('');
const [selectedCard, setSelectedCard] = useState<LegalCard | null>(null);
const [incidentTitle, setIncidentTitle] = useState('');
const [incidentNotes, setIncidentNotes] = useState('');
const [incidents, setIncidents] = useState<Incident[]>([]);
const [showIncidentForm, setShowIncidentForm] = useState(false);
const [notice, setNotice] = useState('');

const filteredCards = useMemo(() => {
const query = search.trim().toLowerCase();
if (!query) return legalCards;
return legalCards.filter(card =>
`${card.title} ${card.category} ${card.summary} ${card.actions.join(' ')}`
.toLowerCase().includes(query)
);
}, [search]);

function saveIncident() {
if (!incidentTitle.trim()) {
setNotice('Please enter an incident title.');
return;
}


const incident: Incident = {
  id: crypto.randomUUID(),
  title: incidentTitle.trim(),
  date: new Date().toLocaleString(),
  notes: incidentNotes.trim()
};

setIncidents(previous => [incident, ...previous]);
setIncidentTitle('');
setIncidentNotes('');
setShowIncidentForm(false);
setNotice('Incident added for this session.');


}

const pageTitle = {
home: 'Your safety companion',
guide: 'Accident response',
legal: 'Legal awareness',
incidents: 'Incident records'
}[tab];

return (
<div className={`app ${dark ? 'dark' : 'light'}`}> <aside className="sidebar">
<a className="brand" href="#" onClick={event => { event.preventDefault(); setTab('home'); }}> <span className="brand-mark"><ShieldCheck size={25} /></span> <span>responda<span className="brand-dot">.</span><small>SAFETY COMPANION</small></span> </a>


    <div className="workspace-label">WORKSPACE</div>
    <nav className="side-nav" aria-label="Main navigation">
      <button className={tab === 'home' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('home')}>
        <Home size={19} /> Overview
      </button>
      <button className={tab === 'guide' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('guide')}>
        <Activity size={19} /> Accident guide
      </button>
      <button className={tab === 'legal' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('legal')}>
        <BookOpen size={19} /> Legal awareness
      </button>
      <button className={tab === 'incidents' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('incidents')}>
        <ClipboardList size={19} /> My incidents
        {incidents.length > 0 && <span className="nav-count">{incidents.length}</span>}
      </button>
    </nav>

    <div className="sidebar-bottom">
      <div className="offline-card">
        <span className="online-dot" />
        <div><strong>Ready to help</strong><small>Safety guidance available</small></div>
      </div>
      <button className="nav-item" onClick={() => setDark(value => !value)}>
        {dark ? <Sun size={19} /> : <Moon size={19} />}
        {dark ? 'Light appearance' : 'Dark appearance'}
      </button>
      <p className="sidebar-version">RESPONDA · FIRST BUILD</p>
    </div>
  </aside>

  <main className="main">
    <header className="topbar">
      <div className="mobile-brand"><ShieldCheck size={23} /> responda<span>.</span></div>
      <div className="breadcrumb">Workspace <ChevronRight size={14} /> <strong>{pageTitle}</strong></div>
      <button className="theme-button" onClick={() => setDark(value => !value)} aria-label="Toggle theme">
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>

    <div className="content">
      {notice && (
        <div className="notice" role="status">
          <CheckCircle2 size={17} /> {notice}
          <button onClick={() => setNotice('')} aria-label="Dismiss notice"><X size={16} /></button>
        </div>
      )}

      {tab === 'home' && (
        <>
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span /> BE PREPARED. STAY INFORMED.</div>
              <h1>Your safety,<br /><span>your next step.</span></h1>
              <p className="hero-description">Clear guidance for difficult moments. Keep calm, know what to do, and document what matters.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => setTab('guide')}><Siren size={18} /> Accident guide <ArrowRight size={17} /></button>
                <button className="button button-secondary" onClick={() => setTab('legal')}>Explore legal awareness</button>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <div className="hero-shield"><ShieldCheck size={91} strokeWidth={1.25} /></div>
              <span className="floating-icon float-one"><HeartHandshake size={22} /></span>
              <span className="floating-icon float-two"><FileText size={21} /></span>
              <span className="floating-icon float-three"><Activity size={22} /></span>
              <span className="hero-caption">PREPAREDNESS IS POWER</span>
            </div>
          </section>

          <section className="emergency-banner">
            <div className="emergency-icon"><Phone size={22} /></div>
            <div className="emergency-copy"><strong>Need emergency assistance?</strong><span>In India, call 112 for emergency assistance when needed.</span></div>
            <a className="emergency-call" href="tel:112">Call 112 <ArrowRight size={16} /></a>
          </section>

          <section className="section">
            <div className="section-heading"><div><div className="eyebrow">YOUR TOOLKIT</div><h2>What do you need today?</h2></div></div>
            <div className="tool-grid">
              <button className="tool-card tool-red" onClick={() => setTab('guide')}>
                <span className="tool-icon"><Siren size={22} /></span><span className="tool-title">Accident response</span><span className="tool-description">Follow a clear, step-by-step safety checklist.</span><span className="tool-link">Open guide <ArrowRight size={15} /></span>
              </button>
              <button className="tool-card tool-blue" onClick={() => setTab('legal')}>
                <span className="tool-icon"><BookOpen size={22} /></span><span className="tool-title">Know your rights</span><span className="tool-description">Explore practical legal awareness topics.</span><span className="tool-link">Browse topics <ArrowRight size={15} /></span>
              </button>
              <button className="tool-card tool-green" onClick={() => { setTab('incidents'); setShowIncidentForm(true); }}>
                <span className="tool-icon"><ClipboardList size={22} /></span><span className="tool-title">Record an incident</span><span className="tool-description">Write down the details while they're fresh.</span><span className="tool-link">Create record <ArrowRight size={15} /></span>
              </button>
            </div>
          </section>

          <section className="section">
            <div className="section-heading"><div><div className="eyebrow">QUICK REFERENCE</div><h2>Start with the essentials</h2></div><button className="text-button" onClick={() => setTab('legal')}>View all topics <ArrowRight size={15} /></button></div>
            <div className="reference-grid">
              {legalCards.slice(0, 3).map(card => (
                <button className="reference-card" key={card.id} onClick={() => setSelectedCard(card)}>
                  <span className="reference-category">{card.category}</span><strong>{card.title}</strong><p>{card.summary}</p><span className="reference-open">Read guidance <ChevronRight size={15} /></span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === 'guide' && (
        <>
          <div className="page-intro"><div className="eyebrow">WHEN EVERY SECOND MATTERS</div><h1>Accident response<br /><span>guide.</span></h1><p>Prioritize immediate safety, seek help, and record important details when it's safe to do so.</p></div>
          <div className="safety-alert"><AlertCircle size={22} /><div><strong>Start with safety</strong><p>If there is immediate danger or a serious injury, contact local emergency services. Do not put yourself at risk.</p></div></div>
          <div className="step-list">
            {[
              ['01', 'Check for danger', 'Look for traffic, fire, fuel leaks, unstable vehicles, or other hazards. Move to safety if possible.'],
              ['02', 'Get emergency help', 'Call the appropriate emergency number when needed. In India, 112 is the national emergency number.'],
              ['03', 'Check for injuries', 'Avoid moving a seriously injured person unless remaining there presents an immediate danger. Follow dispatcher instructions.'],
              ['04', 'Document what happened', 'When safe, record the time and location, take relevant photographs, and note witness details with permission.'],
              ['05', 'Follow reporting requirements', 'Exchange required information, contact your insurer, and follow applicable local reporting rules.']
            ].map(([number, title, description]) => (
              <article className="step-card" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><CheckCircle2 className="step-check" size={20} /></article>
            ))}
          </div>
          <p className="disclaimer">This checklist provides general safety information, not medical or legal advice. Follow emergency dispatcher instructions and applicable local law.</p>
        </>
      )}

      {tab === 'legal' && (
        <>
          <div className="page-intro"><div className="eyebrow">INFORMATION THAT EMPOWERS</div><h1>Legal <span>awareness.</span></h1><p>Practical starting points for understanding what to do after an incident. Rules vary by jurisdiction.</p></div>
          <label className="search-box"><Search size={19} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search topics, actions, or keywords..." /><span>{filteredCards.length} topics</span></label>
          <div className="category-strip">
            {categories.map(category => {
              const Icon = category.icon;
              return <button className="category-chip" key={category.name} onClick={() => setSearch(category.name)}><Icon size={17} />{category.name}</button>;
            })}
          </div>
          <div className="legal-grid">
            {filteredCards.map(card => (
              <button className="legal-card" key={card.id} onClick={() => setSelectedCard(card)}>
                <span className="legal-card-category">{card.category}</span><h3>{card.title}</h3><p>{card.summary}</p><span className="legal-card-link">Read guidance <ArrowRight size={15} /></span>
              </button>
            ))}
            {filteredCards.length === 0 && <div className="empty-state"><Search size={26} /><h3>No matching topics</h3><p>Try a different search term.</p><button className="button button-secondary" onClick={() => setSearch('')}>Clear search</button></div>}
          </div>
          <p className="disclaimer">These cards provide general awareness only. They are not a verified legal database and do not replace advice from a qualified local professional. Confirm current rules for your location.</p>
        </>
      )}

      {tab === 'incidents' && (
        <>
          <div className="page-intro"><div className="eyebrow">YOUR PRIVATE WORKSPACE</div><h1>Incident <span>records.</span></h1><p>Capture the facts while they're fresh. This first build keeps records in memory only; they are cleared when the app reloads.</p></div>
          <div className="incident-toolbar"><div className="stat-card"><ClipboardList size={20} /><div><strong>{incidents.length}</strong><span>Session records</span></div></div><button className="button button-primary" onClick={() => setShowIncidentForm(value => !value)}><Plus size={18} /> New incident</button></div>

          {showIncidentForm && (
            <form className="incident-form" onSubmit={event => { event.preventDefault(); saveIncident(); }}>
              <h3>New incident record</h3>
              <label>Incident title<input value={incidentTitle} onChange={event => setIncidentTitle(event.target.value)} placeholder="e.g. Road collision near..." maxLength={120} required /></label>
              <label>Notes<textarea value={incidentNotes} onChange={event => setIncidentNotes(event.target.value)} placeholder="Record factual details, people involved, and actions taken..." rows={5} maxLength={5000} /></label>
              <div className="form-actions"><button type="button" className="button button-secondary" onClick={() => setShowIncidentForm(false)}>Cancel</button><button type="submit" className="button button-primary">Save record</button></div>
            </form>
          )}

          {incidents.length === 0 ? (
            <div className="empty-state incident-empty"><span className="empty-icon"><FileText size={29} /></span><h3>No incidents recorded yet</h3><p>Create a record to capture important details. Records in this prototype are temporary and are not stored permanently.</p><button className="button button-secondary" onClick={() => setShowIncidentForm(true)}><Plus size={17} /> Create first record</button></div>
          ) : (
            <div className="incident-list">{incidents.map(incident => <article className="incident-record" key={incident.id}><div className="record-icon"><FileText size={21} /></div><div className="record-content"><h3>{incident.title}</h3><span><Clock size={14} /> {incident.date}</span>{incident.notes && <p>{incident.notes}</p>}</div><button className="icon-button danger-icon" onClick={() => setIncidents(items => items.filter(item => item.id !== incident.id))} aria-label={`Delete ${incident.title}`}><X size={18} /></button></article>)}</div>
          )}
        </>
      )}
    </div>

    <footer className="footer"><span>© {new Date().getFullYear()} Responda</span><span><Shield size={14} /> Preparedness starts with knowledge.</span></footer>
  </main>

  {selectedCard && (
    <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelectedCard(null); }}>
      <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close icon-button" onClick={() => setSelectedCard(null)} aria-label="Close guidance"><X size={20} /></button>
        <span className="reference-category">{selectedCard.category}</span><h2 id="modal-title">{selectedCard.title}</h2><p className="modal-summary">{selectedCard.summary}</p>
        <h3 className="list-heading"><CheckCircle2 size={18} /> Recommended actions</h3>
        <ul className="guidance-list">{selectedCard.actions.map((action, index) => <li key={index}>{action}</li>)}</ul>
        <h3 className="list-heading avoid-heading"><AlertCircle size={18} /> Things to avoid</h3>
        <ul className="guidance-list avoid-list">{selectedCard.avoid.map((item, index) => <li key={index}>{item}</li>)}</ul>
        <p className="disclaimer">General awareness only. Requirements depend on your location and circumstances. Verify applicable local rules.</p>
        <button className="button button-primary modal-done" onClick={() => setSelectedCard(null)}>Got it</button>
      </section>
    </div>
  )}
</div>


);
}

export default App;
