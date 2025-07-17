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
const Features = ({ onBack }) => (
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
    <h1 style={{ color: palette.primary, fontSize: 40, fontWeight: 800, marginBottom: 24 }}>Features</h1>
    <ul style={{ color: palette.text, fontSize: 20, lineHeight: 2, maxWidth: 800 }}>
      <li><b>🔒 Secure Supabase Authentication:</b> <br />Sign up, log in, and manage your account securely with Supabase Auth. All user data is encrypted and protected, ensuring your privacy and security at all times.</li>
      <li style={{marginTop: 18}}><b>🗂️ File Compressor (ZIP, TAR, GZIP, 7z, RAR):</b> <br />Easily compress multiple files into your preferred format. Supports drag-and-drop, file selection, and instant download of the compressed archive. Handles large files efficiently and supports popular formats for maximum compatibility.</li>
      <li style={{marginTop: 18}}><b>📤 Profile Photo Upload:</b> <br />Personalize your account by uploading a profile photo. Images are stored securely in Supabase Storage and linked to your user profile for a seamless experience.</li>
      <li style={{marginTop: 18}}><b>📊 Disk Space Analyzer, Large File Analyzer, Temp File Manager:</b> <br />Visualize your disk usage, find and manage large files, and clean up temporary files to keep your system running smoothly and efficiently.</li>
      <li style={{marginTop: 18}}><b>🎨 Modern, Animated UI:</b> <br />Enjoy a beautiful, responsive interface with smooth animations and a custom color palette designed for clarity and ease of use.</li>
      <li style={{marginTop: 18}}><b>🧩 Modular, Reusable React Components:</b> <br />All features are built as modular components, making it easy to integrate ByteSweep’s tools into other React projects or extend functionality as needed.</li>
    </ul>
  </div>
);
export default (props) => (
  <RequireAuth>
    <Features {...props} />
  </RequireAuth>
); 