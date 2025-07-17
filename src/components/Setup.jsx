import React from "react";

const Setup = () => (
  <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
    <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 24, color: '#2E2EFF' }}>Setup</h1>
    <p style={{ fontSize: 20, marginBottom: 18 }}>
      After installing <b>ByteSweep</b>, follow these steps to complete your setup:
    </p>
    <ol style={{ fontSize: 18, lineHeight: 2, marginLeft: 24 }}>
      <li><b>Configure Authentication:</b> <br />
        Set up Supabase credentials in <code>src/services/supabaseClient.ts</code> and <code>.env</code> files.
      </li>
      <li><b>Connect to MongoDB:</b> <br />
        Ensure your <code>MONGODB_URI</code> is correct in <code>backend/.env</code>.
      </li>
      <li><b>Customize Settings:</b> <br />
        Adjust configuration files as needed for your environment.
      </li>
      <li><b>Test the App:</b> <br />
        Visit the Dashboard and try out all features to ensure everything works.
      </li>
    </ol>
    <p style={{ fontSize: 18, marginTop: 24 }}>
      You're all set! Enjoy using ByteSweep.
    </p>
  </div>
);

export default Setup; 