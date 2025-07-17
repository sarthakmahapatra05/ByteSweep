import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import AuthModal from './AuthModal';

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(true);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 80, fontSize: 22 }}>Loading...</div>;
  }

  if (!user) {
    return (
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} mode="login" />
    );
  }

  return <>{children}</>;
};

export default RequireAuth; 