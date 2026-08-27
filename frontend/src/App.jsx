import { useState, useEffect, useRef } from 'react';
import './App.css';

const API_BASE = '';

const icons = {
  bot: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
      <path d="M9 18h6" />
    </svg>
  ),
  send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  activity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  arrowRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  ),
};

function App() {
  const [view, setView] = useState('landing');

  return (
    <div className="app">
      <Navbar setView={setView} view={view} />
      {view === 'landing' && <LandingPage setView={setView} />}
      {view === 'dashboard' && <Dashboard />}
      <Footer />
    </div>
  );
}

function Navbar({ setView, view }) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setView('landing')}>
        <span className="logo-icon">✈</span>
        <span className="logo-text">SupportPilot</span>
      </div>
      <div className="nav-links">
        <button
          className={view === 'landing' ? 'active' : ''}
          onClick={() => setView('landing')}
        >
          Home
        </button>
        <button
          className={view === 'dashboard' ? 'active' : ''}
          onClick={() => setView('dashboard')}
        >
          Live Demo
        </button>
        <a
          href="/api/docs"
          target="_blank"
          rel="noreferrer"
          className="nav-docs"
        >
          API Docs
        </a>
      </div>
    </nav>
  );
}

function LandingPage({ setView }) {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="badge">AI Automation Internship Project</div>
          <h1>Your AI Customer Support Co-Pilot</h1>
          <p>
            SupportPilot answers website visitors instantly, captures leads, and
            emails conversation summaries to your team — so you never lose a
            customer to slow response times.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setView('dashboard')}>
              Try Live Demo
            </button>
            <a
              href="/api/docs"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Explore API
            </a>
          </div>
        </div>
        <div className="hero-preview">
          <div className="chat-preview">
            <div className="chat-preview-header">
              <span className="dot green" />
              <span className="dot yellow" />
              <span className="dot red" />
              <span className="preview-title">SupportPilot Agent</span>
            </div>
            <div className="chat-preview-body">
              <div className="preview-msg bot">
                Hi there! How can I help you today?
              </div>
              <div className="preview-msg user">
                Do you offer a free plan?
              </div>
              <div className="preview-msg bot">
                Yes! Our free plan includes 100 AI replies per month.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section problem">
        <div className="section-inner">
          <h2>Why SupportPilot?</h2>
          <div className="cards">
            <div className="card">
              <h3>70% of customers</h3>
              <p>expect a response within 5 minutes. Most small teams can't keep up.</p>
            </div>
            <div className="card">
              <h3>24/7 Support</h3>
              <p>AI never sleeps. Answer questions, qualify leads, and book meetings around the clock.</p>
            </div>
            <div className="card">
              <h3>Zero Code Setup</h3>
              <p>Configure your business profile and deploy. No complex integrations needed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section features">
        <div className="section-inner">
          <h2>Everything you need</h2>
          <div className="feature-grid">
            {[
              'Google Gemini AI',
              'Instant Email Summaries',
              'Swagger API Documentation',
              'Sentry Error Monitoring',
              'Custom Business Profile',
              'Production-Ready Backend',
            ].map((f) => (
              <div className="feature-item" key={f}>
                <span className="feature-check">{icons.check}</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner">
          <h2>See it in action</h2>
          <p>Open the live demo to chat with the AI agent, test email summaries, and explore the API.</p>
          <button className="btn-primary large" onClick={() => setView('dashboard')}>
            Launch Demo {icons.arrowRight}
          </button>
        </div>
      </section>
    </>
  );
}

function Dashboard() {
  const [tab, setTab] = useState('chat');

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="logo-icon">✈</span>
          <span>SupportPilot</span>
        </div>
        <nav className="sidebar-nav">
          {[
            { id: 'chat', label: 'Live Chat', icon: icons.bot },
            { id: 'email', label: 'Email Test', icon: icons.mail },
            { id: 'status', label: 'Status & API', icon: icons.activity },
            { id: 'settings', label: 'Business Profile', icon: icons.settings },
          ].map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'active' : ''}
              onClick={() => setTab(t.id)}
            >
              <span className="sidebar-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="dashboard-content">
        {tab === 'chat' && <ChatPanel />}
        {tab === 'email' && <EmailPanel />}
        {tab === 'status' && <StatusPanel />}
        {tab === 'settings' && <SettingsPanel />}
      </div>
    </main>
  );
}

function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hello! I am your SupportPilot agent. Ask me anything about our product, pricing, or support.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaryEmail, setSummaryEmail] = useState('');
  const [summaryResult, setSummaryResult] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: data.response || 'No response received.' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendSummary = async (e) => {
    e.preventDefault();
    if (!summaryEmail.trim() || messages.length < 2) return;
    setSummaryResult(null);

    try {
      const res = await fetch(`${API_BASE}/email/chat-summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: summaryEmail,
          messages: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      setSummaryResult(data);
    } catch (err) {
      setSummaryResult({ success: false, message: err.message });
    }
  };

  return (
    <div className="panel chat-panel">
      <div className="panel-header">
        <h2>Live Chat</h2>
        <p>Test the AI support agent with real customer questions.</p>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <div className="message-avatar">
              {m.role === 'user' ? '👤' : icons.bot}
            </div>
            <div className="message-body">
              <span className="message-name">
                {m.role === 'user' ? 'Customer' : 'SupportPilot'}
              </span>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="message-avatar">{icons.bot}</div>
            <div className="message-body">
              <span className="message-name">SupportPilot</span>
              <div className="typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form className="chat-form" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a customer question..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {icons.send}
        </button>
      </form>

      <div className="summary-box">
        <h4>Email conversation summary</h4>
        <form onSubmit={sendSummary}>
          <input
            type="email"
            placeholder="support@yourcompany.com"
            value={summaryEmail}
            onChange={(e) => setSummaryEmail(e.target.value)}
          />
          <button type="submit" disabled={messages.length < 2}>
            {icons.mail} Send Summary
          </button>
        </form>
        {summaryResult && (
          <div className={`summary-result ${summaryResult.success ? 'success' : 'error'}`}>
            {summaryResult.success ? 'Summary sent.' : summaryResult.message}
          </div>
        )}
      </div>
    </div>
  );
}

function EmailPanel() {
  const [form, setForm] = useState({ to: '', subject: '', text: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const sendTest = async () => {
    if (!form.to) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/email/send-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: form.to }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Email Test</h2>
        <p>Send custom emails or test the Resend integration.</p>
      </div>

      <form className="email-form" onSubmit={sendEmail}>
        <div className="field">
          <label>To</label>
          <input
            type="email"
            placeholder="customer@example.com"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label>Subject</label>
          <input
            placeholder="Support follow-up"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label>Message</label>
          <textarea
            rows={6}
            placeholder="Write your message here..."
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {icons.mail} Send Email
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={sendTest}
            disabled={loading || !form.to}
          >
            Send Test Email
          </button>
        </div>
      </form>

      {result && (
        <div className={`result ${result.success ? 'success' : 'error'}`}>
          <strong>{result.success ? 'Sent successfully' : 'Failed to send'}</strong>
          <p>{result.message}</p>
          {result.id && <p>Email ID: {result.id}</p>}
        </div>
      )}
    </div>
  );
}

function StatusPanel() {
  const [health, setHealth] = useState(null);
  const [sentryResult, setSentryResult] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth({ status: 'error' }));
  }, []);

  const triggerSentry = async () => {
    try {
      const res = await fetch(`${API_BASE}/health/sentry-test`);
      const data = await res.json();
      setSentryResult(data);
    } catch (err) {
      setSentryResult({ message: 'Error triggered — check Sentry dashboard' });
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>System Status & API</h2>
        <p>Monitor health, trigger Sentry tests, and browse API docs.</p>
      </div>

      <div className="status-grid">
        <div className="status-card">
          <h4>API Health</h4>
          <div className={`status-value ${health?.status === 'ok' ? 'ok' : 'error'}`}>
            {health?.status || 'Checking...'}
          </div>
          {health?.timestamp && (
            <small>Last check: {new Date(health.timestamp).toLocaleTimeString()}</small>
          )}
        </div>

        <div className="status-card">
          <h4>Sentry Test</h4>
          <p>Trigger a test error and verify it appears in Sentry.</p>
          <button className="btn-danger" onClick={triggerSentry}>
            Trigger Error
          </button>
          {sentryResult && (
            <pre className="result error">{JSON.stringify(sentryResult, null, 2)}</pre>
          )}
        </div>

        <div className="status-card wide">
          <h4>API Documentation</h4>
          <p>Explore and test all endpoints with Swagger UI.</p>
          <a href="/api/docs" target="_blank" rel="noreferrer" className="btn-primary">
            Open Swagger UI
          </a>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/settings`)
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="panel">Loading profile...</div>;

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Business Profile</h2>
        <p>This is how SupportPilot represents your business. Configure it in your <code>.env</code> file.</p>
      </div>

      {settings ? (
        <div className="settings-list">
          <div className="field read-only">
            <label>Business Name</label>
            <input value={settings.businessName} readOnly />
          </div>
          <div className="field read-only">
            <label>Website</label>
            <input value={settings.businessWebsite || 'Not set'} readOnly />
          </div>
          <div className="field read-only">
            <label>Support Email</label>
            <input value={settings.supportEmail || 'Not set'} readOnly />
          </div>
          <div className="field read-only">
            <label>AI System Prompt</label>
            <textarea rows={8} value={settings.systemPrompt} readOnly />
          </div>
        </div>
      ) : (
        <p>Could not load business profile.</p>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Built as part of the AI Automation Internship Program by{' '}
        <strong>DaFi Labs × EmpRadar.ai</strong>
      </p>
    </footer>
  );
}

export default App;
