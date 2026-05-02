

import { useState, useEffect, useRef } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("upload");
  const [histLoading, setHistLoading] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { navigate("/"); return; }
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setHistLoading(true);
    try {
      const res = await api.get("/history", { headers: authHeader });
      setHistory(res.data.reverse());
    } catch {
      if (!token) navigate("/");
    } finally {
      setHistLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await api.post("/upload", form, {
        headers: { ...authHeader, "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      setFile(null);
      fetchHistory();
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === "application/pdf") setFile(f);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getUserEmail = () => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub;
    } catch { return "User"; }
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sideTop}>
          <div style={styles.logo}>
            <span style={styles.logoDot} /> Rōsni
          </div>
          <nav style={styles.nav}>
            <button
              style={{ ...styles.navItem, ...(tab === "upload" ? styles.navActive : {}) }}
              onClick={() => setTab("upload")}
            >
              <span>📄</span> Analyze
            </button>
            <button
              style={{ ...styles.navItem, ...(tab === "history" ? styles.navActive : {}) }}
              onClick={() => setTab("history")}
            >
              <span>📊</span> History
            </button>
          </nav>
        </div>
        <div style={styles.sideBottom}>
          <div style={styles.userChip}>
            <div style={styles.avatar}>{getUserEmail()[0].toUpperCase()}</div>
            <span style={styles.userEmail}>{getUserEmail()}</span>
          </div>
          <button style={styles.logoutBtn} onClick={logout}>Sign out</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {tab === "upload" && (
          <div style={styles.content}>
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>Analyze Resume</h1>
              <p style={styles.pageSub}>Upload a PDF and get instant AI-powered insights</p>
            </div>

            {/* DROP ZONE */}
            <div
              style={{
                ...styles.dropZone,
                ...(dragging ? styles.dropZoneActive : {}),
                ...(file ? styles.dropZoneReady : {}),
              }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => !file && fileRef.current.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file ? (
                <div style={styles.fileReady}>
                  <span style={styles.fileIcon}>📄</span>
                  <div>
                    <p style={styles.fileName}>{file.name}</p>
                    <p style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB · PDF</p>
                  </div>
                  <button style={styles.removeFile} onClick={(e) => { e.stopPropagation(); setFile(null); }}>✕</button>
                </div>
              ) : (
                <div style={styles.dropInner}>
                  <div style={styles.dropIconWrap}>
                    <span style={styles.dropIcon}>{dragging ? "⬇️" : "☁️"}</span>
                  </div>
                  <p style={styles.dropTitle}>{dragging ? "Drop it here!" : "Drop your resume here"}</p>
                  <p style={styles.dropSub}>or <span style={styles.browseLink}>browse files</span> · PDF only</p>
                </div>
              )}
            </div>

            <button
              style={{
                ...styles.analyzeBtn,
                opacity: file && !loading ? 1 : 0.5,
                cursor: file && !loading ? "pointer" : "not-allowed",
              }}
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? (
                <span style={styles.loadingRow}><span className="spin">⟳</span> Analyzing…</span>
              ) : "Analyze Resume →"}
            </button>

            {/* RESULT */}
            {result && (
              <div style={styles.resultCard} className="result-reveal">
                <div style={styles.resultHeader}>
                  <span style={styles.resultBadge}>✓ Analysis Complete</span>
                </div>
                <div style={styles.resultGrid}>
                  <div style={styles.resultItem}>
                    <p style={styles.resultLabel}>Predicted Role</p>
                    <p style={styles.resultRole}>{result.role}</p>
                  </div>
                  <div style={styles.resultItem}>
                    <p style={styles.resultLabel}>Match Score</p>
                    <div style={styles.scoreWrap}>
                      <div style={styles.scoreTrack}>
                        <div style={{ ...styles.scoreFill, width: `${result.score}%` }} className="score-grow" />
                      </div>
                      <span style={styles.scoreText}>{result.score}%</span>
                    </div>
                  </div>
                  <div style={{ ...styles.resultItem, gridColumn: "1 / -1" }}>
                    <p style={styles.resultLabel}>Skills Identified</p>
                    <div style={styles.tagWrap}>
                      {result.skills.map((s) => (
                        <span key={s} style={styles.skillTag}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "history" && (
          <div style={styles.content}>
            <div style={styles.pageHeader}>
              <h1 style={styles.pageTitle}>Analysis History</h1>
              <p style={styles.pageSub}>All your past resume analyses in one place</p>
            </div>

            {histLoading ? (
              <div style={styles.emptyState}><span className="spin" style={{ fontSize: 28 }}>⟳</span></div>
            ) : history.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyIcon}>📭</p>
                <p style={styles.emptyTitle}>No analyses yet</p>
                <p style={styles.emptySub}>Upload your first resume to get started</p>
                <button style={styles.analyzeBtn} onClick={() => setTab("upload")}>Analyze now →</button>
              </div>
            ) : (
              <div style={styles.histGrid}>
                {history.map((item, i) => (
                  <div key={item.id} style={styles.histCard} className="hist-card">
                    <div style={styles.histTop}>
                      <span style={styles.histNum}>#{history.length - i}</span>
                      <span style={styles.histScore}>{item.score}%</span>
                    </div>
                    <p style={styles.histRole}>{item.role}</p>
                    <div style={styles.histTrack}>
                      <div style={{ ...styles.histFill, width: `${item.score}%` }} />
                    </div>
                    <div style={styles.histTags}>
                      {item.skills.slice(0, 4).map((s) => (
                        <span key={s} style={styles.histTag}>{s}</span>
                      ))}
                      {item.skills.length > 4 && (
                        <span style={styles.histTagMore}>+{item.skills.length - 4}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { display: inline-block; animation: spin 1s linear infinite; }
  @keyframes reveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .result-reveal { animation: reveal 0.4s ease forwards; }
  .hist-card { transition: transform 0.2s, box-shadow 0.2s; }
  .hist-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
  @keyframes scoreGrow { from { width: 0 !important; } }
  .score-grow { animation: scoreGrow 1s ease; }
`;

const styles = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    minHeight: "100vh",
    background: "#f5f5f3",
  },
  sidebar: {
    width: 240,
    background: "#fff",
    borderRight: "1px solid #ebebeb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "28px 16px",
    flexShrink: 0,
  },
  sideTop: {},
  logo: {
    fontFamily: "'Fraunces', serif",
    fontSize: 20,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
    paddingLeft: 8,
    color: "#0f0f0f",
  },
  logoDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#2563eb",
    display: "inline-block",
  },
  nav: { display: "flex", flexDirection: "column", gap: 4 },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    background: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#666",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.15s, color 0.15s",
  },
  navActive: {
    background: "#f0f4ff",
    color: "#2563eb",
    fontWeight: 500,
  },
  sideBottom: { display: "flex", flexDirection: "column", gap: 12 },
  userChip: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 8px",
    background: "#f9f9f9",
    borderRadius: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#1a1a1a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  userEmail: { fontSize: 12, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  logoutBtn: {
    background: "none",
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: "#888",
    cursor: "pointer",
    padding: "8px",
    width: "100%",
  },
  main: { flex: 1, overflow: "auto" },
  content: { padding: "40px 48px", maxWidth: 860, margin: "0 auto" },
  pageHeader: { marginBottom: 36 },
  pageTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 34,
    fontWeight: 600,
    letterSpacing: "-1px",
    marginBottom: 6,
    color: "#0f0f0f",
  },
  pageSub: { fontSize: 15, color: "#888", fontWeight: 300 },
  dropZone: {
    border: "2px dashed #ddd",
    borderRadius: 16,
    padding: "52px 32px",
    textAlign: "center",
    cursor: "pointer",
    background: "#fff",
    transition: "border-color 0.2s, background 0.2s",
    marginBottom: 20,
  },
  dropZoneActive: { borderColor: "#2563eb", background: "#f0f4ff" },
  dropZoneReady: { borderColor: "#22c55e", background: "#f0fdf4", cursor: "default" },
  dropInner: {},
  dropIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: "#f5f5f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontSize: 24,
  },
  dropIcon: { fontSize: 24 },
  dropTitle: { fontSize: 16, fontWeight: 500, color: "#333", marginBottom: 6 },
  dropSub: { fontSize: 14, color: "#aaa" },
  browseLink: { color: "#2563eb", fontWeight: 500 },
  fileReady: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    textAlign: "left",
    justifyContent: "space-between",
  },
  fileIcon: { fontSize: 32, flexShrink: 0 },
  fileName: { fontSize: 15, fontWeight: 500, color: "#1a1a1a" },
  fileSize: { fontSize: 13, color: "#aaa", marginTop: 2 },
  removeFile: {
    background: "none",
    border: "none",
    fontSize: 16,
    color: "#aaa",
    cursor: "pointer",
    padding: 6,
  },
  analyzeBtn: {
    width: "100%",
    padding: "14px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    marginBottom: 32,
    transition: "opacity 0.2s",
  },
  loadingRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  resultCard: {
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: 16,
    overflow: "hidden",
  },
  resultHeader: {
    background: "#f0fdf4",
    padding: "14px 24px",
    borderBottom: "1px solid #dcfce7",
  },
  resultBadge: { fontSize: 13, fontWeight: 500, color: "#16a34a" },
  resultGrid: {
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
  },
  resultItem: {},
  resultLabel: {
    fontSize: 11,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "#aaa",
    marginBottom: 8,
  },
  resultRole: {
    fontFamily: "'Fraunces', serif",
    fontSize: 24,
    fontWeight: 600,
    color: "#0f0f0f",
    letterSpacing: "-0.5px",
  },
  scoreWrap: { display: "flex", alignItems: "center", gap: 12 },
  scoreTrack: {
    flex: 1,
    height: 8,
    background: "#f0f0f0",
    borderRadius: 99,
    overflow: "hidden",
  },
  scoreFill: {
    height: "100%",
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    borderRadius: 99,
  },
  scoreText: { fontSize: 18, fontWeight: 700, color: "#2563eb" },
  tagWrap: { display: "flex", flexWrap: "wrap", gap: 8 },
  skillTag: {
    background: "#f0f4ff",
    color: "#2563eb",
    fontSize: 13,
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: 8,
  },
  histGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  },
  histCard: {
    background: "#fff",
    border: "1px solid #ebebeb",
    borderRadius: 14,
    padding: "20px",
  },
  histTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  histNum: { fontSize: 12, color: "#bbb", fontWeight: 500 },
  histScore: { fontSize: 13, fontWeight: 700, color: "#2563eb" },
  histRole: {
    fontFamily: "'Fraunces', serif",
    fontSize: 17,
    fontWeight: 600,
    color: "#0f0f0f",
    marginBottom: 12,
  },
  histTrack: {
    height: 4,
    background: "#f0f0f0",
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 14,
  },
  histFill: {
    height: "100%",
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    borderRadius: 99,
  },
  histTags: { display: "flex", flexWrap: "wrap", gap: 6 },
  histTag: {
    background: "#f5f5f5",
    color: "#555",
    fontSize: 11,
    fontWeight: 500,
    padding: "3px 9px",
    borderRadius: 6,
  },
  histTagMore: {
    background: "#f0f4ff",
    color: "#2563eb",
    fontSize: 11,
    fontWeight: 500,
    padding: "3px 9px",
    borderRadius: 6,
  },
  emptyState: { textAlign: "center", padding: "80px 20px" },
  emptyIcon: { fontSize: 40, marginBottom: 16 },
  emptyTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 8,
    color: "#333",
  },
  emptySub: { fontSize: 14, color: "#aaa", marginBottom: 28 },
};