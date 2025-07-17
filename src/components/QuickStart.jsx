import React from "react";

const QuickStart = () => (
  <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
    <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 24, color: '#2E2EFF' }}>Quick Start</h1>
    <p style={{ fontSize: 20, marginBottom: 18 }}>
      Welcome to <b>ByteSweep</b>! This quick start guide will help you get up and running in just a few minutes.
    </p>
    <ol style={{ fontSize: 18, lineHeight: 2, marginLeft: 24 }}>
      <li><b>Sign Up or Log In:</b> Use the buttons in the top right to create an account or log in.</li>
      <li><b>Analyze Disk Space:</b> Go to the Dashboard to view your system's file statistics and disk usage.</li>
      <li><b>Organize Files:</b> Use the File Organizer to automatically sort and clean up your files.</li>
      <li><b>Compress Files:</b> Try the File Compressor to reduce file sizes and save space.</li>
      <li><b>Manage Temp Files:</b> Use the Temp File Manager to quickly clean up unnecessary files.</li>
    </ol>
    <p style={{ fontSize: 18, marginTop: 24 }}>
      For more details, check the Installation and Setup pages.
    </p>
  </div>
);

export default QuickStart; 