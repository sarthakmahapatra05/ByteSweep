import React from "react";

const Installation = () => (
  <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
    <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 24, color: '#2E2EFF' }}>Installation</h1>
    <p style={{ fontSize: 20, marginBottom: 18 }}>
      Follow these steps to install <b>ByteSweep</b> on your system:
    </p>
    <ol style={{ fontSize: 18, lineHeight: 2, marginLeft: 24 }}>
      <li><b>Clone the Repository:</b> <br />
        <code>git clone https://github.com/your-username/bytesweep.git</code>
      </li>
      <li><b>Install Dependencies:</b> <br />
        <code>cd bytesweep</code><br />
        <code>npm install</code> (for the root and backend folders)
      </li>
      <li><b>Set Up Environment Variables:</b> <br />
        Copy <code>backend/env.example</code> to <code>backend/.env</code> and update as needed.
      </li>
      <li><b>Start the Backend Server:</b> <br />
        <code>npm start --prefix backend</code>
      </li>
      <li><b>Start the Frontend:</b> <br />
        <code>npm run dev</code>
      </li>
    </ol>
    <p style={{ fontSize: 18, marginTop: 24 }}>
      Need help? Check the Setup page or contact support.
    </p>
  </div>
);

export default Installation; 