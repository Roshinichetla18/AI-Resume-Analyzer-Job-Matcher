import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setError("");
    try {
      await api.post("/signup/", { email, password });
      navigate("/");
    } catch {
      setError("An account with this email already exists.");
    } finally {
      setLoading(false);
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["#e5e5e5", "#ef4444", "#f59e0b", "#22c55e"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* LEFT PANEL — hidden on mobile */}
      <div style={styles.left} className="signup-left">
        <div style={styles.leftInner}>
          <div style={styles.logo} onClick={() => navigate("/")}>
            <span style={styles.logoDot} /> Rōsni
          </div>
          <h1 style={styles.quote}>
            "One upload.<br />
            <em>A world of insight.</em>"
          </h1>
          <ul style={styles.checklist}>
            {[
              "ML-based job role prediction",
              "Skill extraction from your resume",
              "Secure JWT authentication",
              "Full analysis history",
            ].map((item) => (
              <li key={item} style={styles.checkItem}>
                <span style={styles.checkIcon}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.right} className="signup-right">
        {/* Mobile-only logo */}
        <div className="mobile-logo" onClick={() => navigate("/")}>
          <span style={styles.logoDot} /> Rōsni
        </div>

        <div style={styles.card} className="signup-card">
          <h2 style={styles.title}>Create your account</h2>
          <p style={styles.sub}>Free forever. No credit card needed.</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <label style={styles.label}>Email address</label>
          <input
            style={styles.input}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-input"
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-input"
          />

          {password.length > 0 && (
            <div style={styles.strengthRow}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    ...styles.strengthBar,
                    background: i <= strength ? strengthColors[strength] : "#e5e5e5",
                    transition: "background 0.3s",
                  }}
                />
              ))}
              <span style={{ ...styles.strengthLabel, color: strengthColors[strength] }}>
                {strengthLabels[strength]}
              </span>
            </div>
          )}

          <label style={styles.label}>Confirm password</label>
          <input
            style={{
              ...styles.input,
              borderColor: confirm && confirm !== password ? "#fca5a5" : "#e5e5e5",
            }}
            type="password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            className="focus-input"
          />

          <button
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account →"}
          </button>

          <p style={styles.switch}>
            Already have an account?{" "}
            <span style={styles.link} onClick={() => navigate("/")}>
              Sign in
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
    .signup-left {
      display: none !important;
    }

    .signup-right {
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

    .signup-card {
      width: 100% !important;
      max-width: 100% !important;
    }
  }

  /* ── TABLET ── */
  @media (min-width: 641px) and (max-width: 900px) {
    .signup-left {
      flex: 0.85 !important;
      padding: 48px 5% !important;
    }

    .signup-right {
      flex: 1.15 !important;
      padding: 40px 5% !important;
    }

    .signup-card {
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
  },
  leftInner: {},
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
    letterSpacing: "-0.5px",
    marginBottom: 40,
  },
  checklist: { listStyle: "none", display: "flex", flexDirection: "column", gap: 14 },
  checkItem: { fontSize: 14, color: "#aaa", display: "flex", alignItems: "center", gap: 10 },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "rgba(37,99,235,0.2)",
    color: "#60a5fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
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
  label: { display: "block", fontSize: 13, fontWeight: 500, color: "#444", marginBottom: 6 },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    border: "1.5px solid #e5e5e5",
    borderRadius: 10,
    background: "#fff",
    marginBottom: 20,
    color: "#1a1a1a",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  strengthRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: -14,
    marginBottom: 20,
  },
  strengthBar: { flex: 1, height: 3, borderRadius: 99 },
  strengthLabel: { fontSize: 11, fontWeight: 500, minWidth: 36 },
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
// import api from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     if (!email || !password || !confirm) { setError("Please fill in all fields."); return; }
//     if (password !== confirm) { setError("Passwords don't match."); return; }
//     if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
//     setLoading(true);
//     setError("");
//     try {
//       await api.post("/signup/", { email, password });
//       navigate("/");
//     } catch {
//       setError("An account with this email already exists.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
//   const strengthColors = ["#e5e5e5", "#ef4444", "#f59e0b", "#22c55e"];
//   const strengthLabels = ["", "Weak", "Fair", "Strong"];

//   return (
//     <div style={styles.page}>
//       <style>{css}</style>

//       <div style={styles.left}>
//         <div style={styles.leftInner}>
//           <div style={styles.logo} onClick={() => navigate("/")}>
//             <span style={styles.logoDot} /> Rōsni
//           </div>
//           <h1 style={styles.quote}>
//             "One upload.<br />
//             <em>A world of insight.</em>"
//           </h1>
//           <ul style={styles.checklist}>
//             {[
//               "ML-based job role prediction",
//               "Skill extraction from your resume",
//               "Secure JWT authentication",
//               "Full analysis history",
//             ].map((item) => (
//               <li key={item} style={styles.checkItem}>
//                 <span style={styles.checkIcon}>✓</span> {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div style={styles.right}>
//         <div style={styles.card}>
//           <h2 style={styles.title}>Create your account</h2>
//           <p style={styles.sub}>Free forever. No credit card needed.</p>

//           {error && <div style={styles.errorBox}>{error}</div>}

//           <label style={styles.label}>Email address</label>
//           <input
//             style={styles.input}
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="focus-input"
//           />

//           <label style={styles.label}>Password</label>
//           <input
//             style={styles.input}
//             type="password"
//             placeholder="Min. 6 characters"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="focus-input"
//           />

//           {password.length > 0 && (
//             <div style={styles.strengthRow}>
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...styles.strengthBar,
//                     background: i <= strength ? strengthColors[strength] : "#e5e5e5",
//                     transition: "background 0.3s",
//                   }}
//                 />
//               ))}
//               <span style={{ ...styles.strengthLabel, color: strengthColors[strength] }}>
//                 {strengthLabels[strength]}
//               </span>
//             </div>
//           )}

//           <label style={styles.label}>Confirm password</label>
//           <input
//             style={{
//               ...styles.input,
//               borderColor: confirm && confirm !== password ? "#fca5a5" : "#e5e5e5",
//             }}
//             type="password"
//             placeholder="Repeat your password"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSignup()}
//             className="focus-input"
//           />

//           <button
//             style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
//             onClick={handleSignup}
//             disabled={loading}
//           >
//             {loading ? "Creating account…" : "Create account →"}
//           </button>

//           <p style={styles.switch}>
//             Already have an account?{" "}
//             <span style={styles.link} onClick={() => navigate("/")}>
//               Sign in
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
//   },
//   leftInner: {},
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
//     letterSpacing: "-0.5px",
//     marginBottom: 40,
//   },
//   checklist: { listStyle: "none", display: "flex", flexDirection: "column", gap: 14 },
//   checkItem: { fontSize: 14, color: "#aaa", display: "flex", alignItems: "center", gap: 10 },
//   checkIcon: {
//     width: 20,
//     height: 20,
//     borderRadius: "50%",
//     background: "rgba(37,99,235,0.2)",
//     color: "#60a5fa",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: 11,
//     fontWeight: 700,
//     flexShrink: 0,
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
//   label: { display: "block", fontSize: 13, fontWeight: 500, color: "#444", marginBottom: 6 },
//   input: {
//     width: "100%",
//     padding: "12px 14px",
//     fontSize: 15,
//     fontFamily: "'DM Sans', sans-serif",
//     border: "1.5px solid #e5e5e5",
//     borderRadius: 10,
//     background: "#fff",
//     marginBottom: 20,
//     color: "#1a1a1a",
//     transition: "border-color 0.2s, box-shadow 0.2s",
//   },
//   strengthRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: 6,
//     marginTop: -14,
//     marginBottom: 20,
//   },
//   strengthBar: { flex: 1, height: 3, borderRadius: 99 },
//   strengthLabel: { fontSize: 11, fontWeight: 500, minWidth: 36 },
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
