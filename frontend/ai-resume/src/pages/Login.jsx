
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/login/", { email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* LEFT PANEL — hidden on mobile */}
      <div style={styles.left} className="login-left">
        <div style={styles.leftInner}>
          <div style={styles.logo} onClick={() => navigate("/")}>
            <span style={styles.logoDot} /> AI-Resume-Analyzer
          </div>
          <h1 style={styles.quote}>
            "Your resume tells a story.<br />
            <em>Let's read it together.</em>"
          </h1>
          <div style={styles.pills}>
            <span style={styles.pill}>🤖 ML-Powered</span>
            <span style={styles.pill}>🔐 Secure Auth</span>
            <span style={styles.pill}>📊 Instant Results</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.right} className="login-right">
        {/* Mobile-only logo */}
        <div className="mobile-logo" onClick={() => navigate("/")}>
          <span style={styles.logoDot} /> AI-Resume-Analyzer
        </div>

        <div style={styles.card} className="login-card">
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.sub}>Sign in to your account</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <label style={styles.label}>Email address</label>
          <input
            style={styles.input}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="focus-input"
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="focus-input"
          />

          <button
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>

          <p style={styles.switch}>
            Don't have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/signup")}>
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .focus-input:focus {
    outline: none;
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  /* Mobile logo — hidden on desktop */
  .mobile-logo {
    display: none;
  }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    /* Stack panels vertically */
    .login-left {
      display: none !important;
    }

    .login-right {
      flex: 1 !important;
      padding: 40px 24px 48px !important;
      justify-content: flex-start !important;
      align-items: stretch !important;
      flex-direction: column !important;
      background: #fafaf8 !important;
    }

    .mobile-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Fraunces', serif;
      font-size: 22px;
      font-weight: 600;
      color: #0f0f0f;
      margin-bottom: 36px;
      cursor: pointer;
    }

    .login-card {
      width: 100% !important;
      max-width: 100% !important;
    }
  }

  /* ── TABLET ── */
  @media (min-width: 641px) and (max-width: 900px) {
    .login-left {
      flex: 0.85 !important;
      padding: 48px 5% !important;
    }

    .login-right {
      flex: 1.15 !important;
      padding: 40px 5% !important;
    }

    .login-card {
      max-width: 360px !important;
    }
  }
`;

const styles = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    minHeight: "100vh",
    background: "#fafaf8",
  },
  left: {
    flex: 1,
    background: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    padding: "60px 6%",
    position: "relative",
    overflow: "hidden",
  },
  leftInner: { position: "relative", zIndex: 1 },
  logo: {
    fontFamily: "'Fraunces', serif",
    fontSize: 22,
    fontWeight: 600,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 60,
    cursor: "pointer",
  },
  logoDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#2563eb",
    display: "inline-block",
  },
  quote: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(28px, 3vw, 40px)",
    fontWeight: 300,
    color: "#fff",
    lineHeight: 1.3,
    marginBottom: 40,
    letterSpacing: "-0.5px",
  },
  pills: { display: "flex", flexDirection: "column", gap: 10 },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 400,
    color: "#aaa",
    background: "rgba(255,255,255,0.06)",
    padding: "8px 16px",
    borderRadius: 8,
    width: "fit-content",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 6%",
  },
  card: { width: "100%", maxWidth: 400 },
  title: {
    fontFamily: "'Fraunces', serif",
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: "-1px",
    marginBottom: 6,
  },
  sub: { fontSize: 15, color: "#777", fontWeight: 300, marginBottom: 32 },
  errorBox: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    fontSize: 13,
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#444",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    border: "1.5px solid #e5e5e5",
    borderRadius: 10,
    background: "#fff",
    marginBottom: 20,
    transition: "border-color 0.2s, box-shadow 0.2s",
    color: "#1a1a1a",
  },
  btn: {
    width: "100%",
    padding: "13px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    marginTop: 4,
    marginBottom: 24,
  },
  switch: { fontSize: 14, color: "#777", textAlign: "center" },
  link: { color: "#2563eb", fontWeight: 500, cursor: "pointer" },
};
// import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!email || !password) { setError("Please fill in all fields."); return; }
//     setLoading(true);
//     setError("");
//     try {
//       const res = await api.post("/login/", { email, password });
//       localStorage.setItem("token", res.data.access_token);
//       navigate("/dashboard");
//     } catch {
//       setError("Invalid email or password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <style>{css}</style>
//       <div style={styles.left}>
//         <div style={styles.leftInner}>
//           <div style={styles.logo} onClick={() => navigate("/")}>
//             <span style={styles.logoDot} /> AI-Resume-Analyzer
//           </div>
//           <h1 style={styles.quote}>
//             "Your resume tells a story.<br />
//             <em>Let's read it together.</em>"
//           </h1>
//           <div style={styles.pills}>
//             <span style={styles.pill}>🤖 ML-Powered</span>
//             <span style={styles.pill}>🔐 Secure Auth</span>
//             <span style={styles.pill}>📊 Instant Results</span>
//           </div>
//         </div>
//       </div>

//       <div style={styles.right}>
//         <div style={styles.card}>
//           <h2 style={styles.title}>Welcome back</h2>
//           <p style={styles.sub}>Sign in to your account</p>

//           {error && <div style={styles.errorBox}>{error}</div>}

//           <label style={styles.label}>Email address</label>
//           <input
//             style={styles.input}
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//             className="focus-input"
//           />

//           <label style={styles.label}>Password</label>
//           <input
//             style={styles.input}
//             type="password"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//             className="focus-input"
//           />

//           <button
//             style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? "Signing in…" : "Sign in →"}
//           </button>

//           <p style={styles.switch}>
//             Don't have an account?{" "}
//             <span style={styles.link} onClick={() => navigate("/signup")}>
//               Create one
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');
//   * { box-sizing: border-box; margin: 0; padding: 0; }
//   .focus-input:focus { outline: none; border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
// `;

// const styles = {
//   page: {
//     fontFamily: "'DM Sans', sans-serif",
//     display: "flex",
//     minHeight: "100vh",
//     background: "#fafaf8",
//   },
//   left: {
//     flex: 1,
//     background: "#0f0f0f",
//     display: "flex",
//     alignItems: "center",
//     padding: "60px 6%",
//     position: "relative",
//     overflow: "hidden",
//   },
//   leftInner: { position: "relative", zIndex: 1 },
//   logo: {
//     fontFamily: "'Fraunces', serif",
//     fontSize: 22,
//     fontWeight: 600,
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 60,
//     cursor: "pointer",
//   },
//   logoDot: {
//     width: 8,
//     height: 8,
//     borderRadius: "50%",
//     background: "#2563eb",
//     display: "inline-block",
//   },
//   quote: {
//     fontFamily: "'Fraunces', serif",
//     fontSize: "clamp(28px, 3vw, 40px)",
//     fontWeight: 300,
//     color: "#fff",
//     lineHeight: 1.3,
//     marginBottom: 40,
//     letterSpacing: "-0.5px",
//   },
//   pills: { display: "flex", flexDirection: "column", gap: 10 },
//   pill: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 8,
//     fontSize: 13,
//     fontWeight: 400,
//     color: "#aaa",
//     background: "rgba(255,255,255,0.06)",
//     padding: "8px 16px",
//     borderRadius: 8,
//     width: "fit-content",
//     border: "1px solid rgba(255,255,255,0.08)",
//   },
//   right: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "40px 6%",
//   },
//   card: { width: "100%", maxWidth: 400 },
//   title: {
//     fontFamily: "'Fraunces', serif",
//     fontSize: 32,
//     fontWeight: 600,
//     letterSpacing: "-1px",
//     marginBottom: 6,
//   },
//   sub: { fontSize: 15, color: "#777", fontWeight: 300, marginBottom: 32 },
//   errorBox: {
//     background: "#fef2f2",
//     border: "1px solid #fecaca",
//     color: "#dc2626",
//     fontSize: 13,
//     padding: "10px 14px",
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   label: {
//     display: "block",
//     fontSize: 13,
//     fontWeight: 500,
//     color: "#444",
//     marginBottom: 6,
//   },
//   input: {
//     width: "100%",
//     padding: "12px 14px",
//     fontSize: 15,
//     fontFamily: "'DM Sans', sans-serif",
//     border: "1.5px solid #e5e5e5",
//     borderRadius: 10,
//     background: "#fff",
//     marginBottom: 20,
//     transition: "border-color 0.2s, box-shadow 0.2s",
//     color: "#1a1a1a",
//   },
//   btn: {
//     width: "100%",
//     padding: "13px",
//     background: "#1a1a1a",
//     color: "#fff",
//     border: "none",
//     borderRadius: 10,
//     fontSize: 15,
//     fontWeight: 500,
//     fontFamily: "'DM Sans', sans-serif",
//     cursor: "pointer",
//     marginTop: 4,
//     marginBottom: 24,
//   },
//   switch: { fontSize: 14, color: "#777", textAlign: "center" },
//   link: { color: "#2563eb", fontWeight: 500, cursor: "pointer" },
// };
