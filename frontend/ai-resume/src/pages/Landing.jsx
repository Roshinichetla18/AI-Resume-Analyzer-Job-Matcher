import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "📄",
    title: "PDF Parsing",
    desc: "Upload any resume in PDF format. We extract every word with precision using PyMuPDF.",
  },
  {
    icon: "🤖",
    title: "Role Prediction",
    desc: "TF-IDF + Logistic Regression model trained on thousands of real resumes predicts your best-fit role.",
  },
  {
    icon: "🧩",
    title: "Skill Extraction",
    desc: "Automatically identifies and lists technical skills found within your resume.",
  },
  {
    icon: "📊",
    title: "History Tracking",
    desc: "Every analysis is saved. Review past results and track your profile evolution over time.",
  },
];

const steps = [
  { num: "01", label: "Create an account" },
  { num: "02", label: "Upload your resume (PDF)" },
  { num: "03", label: "AI analyzes it instantly" },
  { num: "04", label: "Get your role, score & skills" },
];

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("visible"), 50);
  }, []);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={styles.logoDot} />
          Rōsni
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navGhost} onClick={() => navigate("/login")}>
            Log in
          </button>
          <button style={styles.navBtn} onClick={() => navigate("/signup")}>
            Get started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero} ref={heroRef} className="hero-anim">
        <p style={styles.badge}>AI-Powered · Free · Instant</p>
        <h1 style={styles.heroTitle}>
          Know exactly where
          <br />
          <em style={styles.heroEm}>your resume stands.</em>
        </h1>
        <p style={styles.heroSub}>
          Upload your resume and our ML model tells you which role you fit,
          your match score, and the skills you bring to the table — in seconds.
        </p>
        <div style={styles.heroCta}>
          <button style={styles.primaryBtn} onClick={() => navigate("/signup")}>
            Analyze my resume →
          </button>
          <button style={styles.ghostBtn} onClick={() => navigate("/login")}>
            I have an account
          </button>
        </div>

        {/* mock card */}
        <div style={styles.mockCard} className="mock-card">
          <div style={styles.mockHeader}>
            <span style={styles.mockDot} />
            <span style={{ ...styles.mockDot, background: "#fbbf24" }} />
            <span style={{ ...styles.mockDot, background: "#34d399" }} />
            <span style={styles.mockFile}>resume_final_v3.pdf</span>
          </div>
          <div style={styles.mockBody}>
            <div style={styles.mockRow}>
              <span style={styles.mockLabel}>Predicted Role</span>
              <span style={styles.mockValue}>Frontend Developer</span>
            </div>
            <div style={styles.mockRow}>
              <span style={styles.mockLabel}>Match Score</span>
              <div style={styles.scoreBar}>
                <div style={styles.scoreFill} className="score-fill" />
                <span style={styles.scoreNum}>89%</span>
              </div>
            </div>
            <div style={styles.mockRow}>
              <span style={styles.mockLabel}>Skills Found</span>
              <div style={styles.tagRow}>
                {["React", "TypeScript", "CSS", "Node.js", "SQL"].map((s) => (
                  <span key={s} style={styles.tag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <p style={styles.sectionEye}>What we do</p>
        <h2 style={styles.sectionTitle}>Everything you need to understand your resume</h2>
        <div style={styles.featGrid}>
          {features.map((f) => (
            <div key={f.title} style={styles.featCard} className="feat-card">
              <span style={styles.featIcon}>{f.icon}</span>
              <h3 style={styles.featTitle}>{f.title}</h3>
              <p style={styles.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howSection}>
        <p style={styles.sectionEye}>How it works</p>
        <h2 style={styles.sectionTitle}>Four steps to clarity</h2>
        <div style={styles.stepsRow}>
          {steps.map((s, i) => (
            <div key={s.num} style={styles.step}>
              <span style={styles.stepNum}>{s.num}</span>
              <p style={styles.stepLabel}>{s.label}</p>
              {i < steps.length - 1 && <div style={styles.stepLine} />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section style={styles.ctaBand}>
        <h2 style={styles.ctaTitle}>Ready to see your results?</h2>
        <p style={styles.ctaSub}>
          No credit card. No nonsense. Just upload and go.
        </p>
        <button style={styles.primaryBtn} onClick={() => navigate("/signup")}>
          Start for free →
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={styles.logo}>
          <span style={styles.logoDot} /> Rōsni
        </span>
        <p style={styles.footerNote}>
          Built with FastAPI · React · PostgreSQL · Scikit-learn
        </p>
      </footer>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hero-anim { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .hero-anim.visible { opacity: 1; transform: translateY(0); }

  .mock-card { animation: float 4s ease-in-out infinite; }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }

  .score-fill { animation: grow 1.4s 0.8s ease forwards; width: 0 !important; }
  @keyframes grow { to { width: 89% !important; } }

  .feat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .feat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
`;

const styles = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#fafaf8",
    color: "#1a1a1a",
    minHeight: "100vh",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 6%",
    borderBottom: "1px solid #ebebeb",
    background: "#fafaf8",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Fraunces', serif",
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#1a1a1a",
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#2563eb",
    display: "inline-block",
  },
  navLinks: { display: "flex", gap: 12 },
  navGhost: {
    background: "none",
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: "#555",
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: 8,
    transition: "color 0.15s",
  },
  navBtn: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    padding: "8px 20px",
    borderRadius: 8,
  },
  hero: {
    padding: "80px 6% 60px",
    maxWidth: 820,
    margin: "0 auto",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2563eb",
    background: "#eff6ff",
    padding: "4px 14px",
    borderRadius: 20,
    marginBottom: 28,
  },
  heroTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(40px, 6vw, 68px)",
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "-2px",
    marginBottom: 20,
    color: "#0f0f0f",
  },
  heroEm: {
    fontStyle: "italic",
    fontWeight: 300,
    color: "#2563eb",
  },
  heroSub: {
    fontSize: 17,
    fontWeight: 300,
    color: "#555",
    lineHeight: 1.7,
    maxWidth: 560,
    margin: "0 auto 36px",
  },
  heroCta: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 },
  primaryBtn: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    padding: "13px 28px",
    borderRadius: 10,
  },
  ghostBtn: {
    background: "none",
    color: "#555",
    border: "1.5px solid #ddd",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    padding: "13px 28px",
    borderRadius: 10,
  },
  mockCard: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: 16,
    overflow: "hidden",
    maxWidth: 480,
    margin: "0 auto",
    boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
    textAlign: "left",
  },
  mockHeader: {
    background: "#f5f5f5",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderBottom: "1px solid #ebebeb",
  },
  mockDot: { width: 10, height: 10, borderRadius: "50%", background: "#fc5f5f" },
  mockFile: { marginLeft: "auto", fontSize: 12, color: "#888", fontFamily: "monospace" },
  mockBody: { padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 },
  mockRow: { display: "flex", flexDirection: "column", gap: 6 },
  mockLabel: { fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#aaa" },
  mockValue: { fontSize: 18, fontWeight: 600, fontFamily: "'Fraunces', serif", color: "#1a1a1a" },
  scoreBar: { display: "flex", alignItems: "center", gap: 10 },
  scoreFill: {
    height: 6,
    width: "89%",
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    borderRadius: 99,
    transition: "width 1.4s ease",
  },
  scoreNum: { fontSize: 14, fontWeight: 600, color: "#2563eb" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: {
    background: "#f0f4ff",
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 6,
  },
  section: {
    padding: "80px 6%",
    maxWidth: 1100,
    margin: "0 auto",
  },
  sectionEye: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#2563eb",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(28px, 3.5vw, 42px)",
    fontWeight: 600,
    letterSpacing: "-1px",
    color: "#0f0f0f",
    maxWidth: 520,
    marginBottom: 48,
    lineHeight: 1.2,
  },
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  featCard: {
    background: "#fff",
    border: "1px solid #ebebeb",
    borderRadius: 14,
    padding: "28px 24px",
  },
  featIcon: { fontSize: 28, marginBottom: 14, display: "block" },
  featTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
    color: "#0f0f0f",
  },
  featDesc: { fontSize: 14, color: "#666", lineHeight: 1.65, fontWeight: 300 },
  howSection: {
    background: "#fff",
    padding: "80px 6%",
    borderTop: "1px solid #ebebeb",
    borderBottom: "1px solid #ebebeb",
    textAlign: "center",
  },
  stepsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 0,
    flexWrap: "wrap",
    marginTop: 48,
    position: "relative",
  },
  step: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 1 160px",
    position: "relative",
    padding: "0 12px",
  },
  stepNum: {
    fontFamily: "'Fraunces', serif",
    fontSize: 36,
    fontWeight: 600,
    color: "#e0e7ff",
    marginBottom: 8,
  },
  stepLabel: { fontSize: 14, fontWeight: 500, color: "#444", textAlign: "center" },
  stepLine: {
    position: "absolute",
    top: 20,
    right: "-10%",
    width: "20%",
    height: 1,
    background: "#e5e5e5",
  },
  ctaBand: {
    padding: "80px 6%",
    textAlign: "center",
    background: "#fafaf8",
  },
  ctaTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(28px, 4vw, 48px)",
    fontWeight: 600,
    letterSpacing: "-1.5px",
    marginBottom: 14,
  },
  ctaSub: { fontSize: 16, color: "#666", fontWeight: 300, marginBottom: 32 },
  footer: {
    borderTop: "1px solid #ebebeb",
    padding: "28px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  footerNote: { fontSize: 13, color: "#aaa", fontWeight: 300 },
};