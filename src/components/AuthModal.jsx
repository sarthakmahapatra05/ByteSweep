import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const palette = {
  primary: '#2E2EFF',
  accent1: '#1DB954',
  accent2: '#FF9900',
  background: '#F9FAFB',
  text: '#111827',
  alert: '#FF3B30',
  secondary: '#6B7280',
};

const AuthModal = ({ open, onClose, mode = "login" }) => {
  const { user, signIn, signUp, signOut } = useAuth();
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync isSignup with mode prop
  React.useEffect(() => {
    setIsSignup(mode === "signup");
  }, [mode]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await signUp(email, password);
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(17,24,39,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: palette.background, borderRadius: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
        padding: 32, minWidth: 340, maxWidth: 360, color: palette.text, position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, color: palette.secondary, cursor: 'pointer' }}>&times;</button>
        {user ? (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: palette.primary, marginBottom: 8 }}>Welcome!</h2>
            <p style={{ color: palette.text, marginBottom: 16 }}>{user.email}</p>
            <button
              onClick={signOut}
              style={{ background: palette.alert, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}
            >Logout</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ color: palette.primary, marginBottom: 16 }}>{isSignup ? 'Sign Up' : 'Login'}</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: `1px solid ${palette.secondary}` }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: `1px solid ${palette.secondary}` }}
            />
            {error && <div style={{ color: palette.alert, marginBottom: 8 }}>{error}</div>}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', background: palette.primary, color: '#fff', border: 'none', borderRadius: 8,
                padding: '10px 0', fontWeight: 600, cursor: 'pointer', marginBottom: 8
              }}
            >{loading ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Login')}</button>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ color: palette.secondary }}>
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                style={{ background: 'none', border: 'none', color: palette.accent1, fontWeight: 600, marginLeft: 6, cursor: 'pointer' }}
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal; 