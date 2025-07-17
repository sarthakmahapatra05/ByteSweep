import React from "react";
import RequireAuth from './RequireAuth';
const palette = {
  primary: "#2E2EFF",
  accent1: "#1DB954",
  accent2: "#FF9900",
  background: "#F9FAFB",
  text: "#111827",
  alert: "#FF3B30",
  secondary: "#6B7280",
};
const About = ({ onBack }) => (
  <div style={{ background: palette.background, minHeight: "100vh", padding: 40 }}>
    <button
      onClick={onBack}
      style={{
        background: palette.primary,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "8px 24px",
        fontWeight: 600,
        marginBottom: 32,
        cursor: "pointer",
      }}
    >
      ← Back to Home
    </button>
    <h1 style={{ color: palette.primary, fontSize: 40, fontWeight: 800, marginBottom: 24 }}>About ByteSweep</h1>
    <div style={{ color: palette.text, fontSize: 20, maxWidth: 800 }}>
      <p><b>ByteSweep</b> is a next-generation file management platform designed to make organizing, compressing, and optimizing your files effortless and enjoyable. Our mission is to empower users with powerful tools that are both easy to use and visually stunning.</p>
      <p style={{marginTop: 18}}><b>Technology Stack:</b> ByteSweep is built with React for a fast, interactive frontend, and uses Supabase for secure authentication, real-time data, and file storage. The backend leverages Node.js and Express for high-performance file processing and compression.</p>
      <p style={{marginTop: 18}}><b>What Makes ByteSweep Unique?</b><br />
        - <b>All-in-one Solution:</b> Compress, analyze, and organize files from a single, unified interface.<br />
        - <b>Modern Design:</b> Enjoy a clean, animated UI with a custom color palette inspired by leading tech brands.<br />
        - <b>Security First:</b> All user data and files are handled with industry-standard encryption and privacy best practices.<br />
        - <b>Extensible & Modular:</b> Every feature is a reusable React component, making it easy to extend or integrate into other projects.<br />
        - <b>Open & Transparent:</b> Built with open-source technologies and a commitment to transparency and user empowerment.
      </p>
      <p style={{marginTop: 18}}><b>Contact:</b> support@bytesweep.com</p>
    </div>
  </div>
);
export default (props) => (
  <RequireAuth>
    <About {...props} />
  </RequireAuth>
); 