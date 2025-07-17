import React, { useRef, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
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

const ProfilePhotoUploader = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [photoUrl, setPhotoUrl] = useState(user?.user_metadata?.avatar_url || '');
  const fileInputRef = useRef();

  if (!user) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `avatars/${user.id}.${fileExt}`;
    try {
      // Upload to Supabase Storage
      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setPhotoUrl(data.publicUrl);
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({ data: { avatar_url: data.publicUrl } });
      if (updateError) throw updateError;
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ background: palette.background, borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', maxWidth: 320, margin: '24px auto', textAlign: 'center' }}>
      <h3 style={{ color: palette.primary, marginBottom: 12 }}>Profile Photo</h3>
      <div style={{ marginBottom: 16 }}>
        <img
          src={photoUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.email) + '&background=F9FAFB&color=111827&size=128'}
          alt="Profile"
          style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${palette.primary}` }}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        disabled={uploading}
        style={{ background: palette.accent1, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}
      >
        {uploading ? 'Uploading...' : 'Upload Photo'}
      </button>
      {error && <div style={{ color: palette.alert, marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default ProfilePhotoUploader; 