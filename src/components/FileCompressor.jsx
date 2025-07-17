import React, { useRef, useState } from 'react';
import { File, FileText, Archive, UploadCloud, DownloadCloud, X, Loader2 } from 'lucide-react';
import api from '../services/api';
import RequireAuth from './RequireAuth';

const palette = {
  primary: '#2E2EFF',
  accent1: '#1DB954',
  accent2: '#FF9900',
  background: '#F9FAFB',
  text: '#111827',
  alert: '#FF3B30',
  secondary: '#6B7280',
};

const formatOptions = [
  { value: 'zip', label: 'ZIP (.zip)' },
  { value: 'tar', label: 'TAR (.tar)' },
  { value: 'gzip', label: 'GZIP (.tar.gz)' },
  { value: '7z', label: '7-Zip (.7z)' },
  { value: 'rar', label: 'RAR (.rar)' },
];

const allowedTypes = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  // For jpg, jpeg covers both
];

const FileCompressor = () => {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState('zip');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const filterAllowedFiles = (fileList) => {
    const arr = Array.from(fileList);
    const invalid = arr.filter(f => !allowedTypes.includes(f.type));
    if (invalid.length) {
      setError('Only PDF, PNG, JPEG, JPG files are allowed.');
      return arr.filter(f => allowedTypes.includes(f.type));
    }
    setError('');
    return arr;
  };

  const handleFiles = (fileList) => {
    const filtered = filterAllowedFiles(fileList);
    setFiles(filtered);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = (e) => {
    handleFiles(e.target.files);
  };

  const handleCompress = async () => {
    if (!files.length) {
      setError('Please select at least one file.');
      return;
    }
    setUploading(true);
    setError('');
    setProgress(0);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      formData.append('format', format);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5000/compress', true);
      xhr.responseType = 'blob';
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        setUploading(false);
        setProgress(100);
        if (xhr.status === 200) {
          const blob = xhr.response;
          const contentDisposition = xhr.getResponseHeader('Content-Disposition');
          let filename = 'archive.' + (format === 'gzip' ? 'tar.gz' : format);
          if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+)"/);
            if (match) filename = match[1];
          }
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          setError('Compression failed. Please try again.');
        }
      };
      xhr.onerror = () => {
        setUploading(false);
        setError('Network error. Please try again.');
      };
      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      setError('Compression failed.');
    }
  };

  return (
    <div style={{ background: palette.background, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32, maxWidth: 420, margin: '32px auto', color: palette.text }}>
      <h2 style={{ color: palette.primary, marginBottom: 16 }}>File Compressor</h2>
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        style={{
          border: `2px dashed ${palette.primary}`,
          borderRadius: 12,
          padding: 32,
          textAlign: 'center',
          marginBottom: 16,
          background: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          multiple
          accept=".pdf, .png, .jpeg, .jpg"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleBrowse}
        />
        {files.length ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {files.map((file, idx) => (
              <li key={idx} style={{ color: palette.secondary, fontSize: 14 }}>{file.name}</li>
            ))}
          </ul>
        ) : (
          <span style={{ color: palette.secondary }}>Drag & drop PDF, PNG, JPEG, JPG files here, or click to browse</span>
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8, color: palette.text, fontWeight: 500 }}>Format:</label>
        <select
          value={format}
          onChange={e => setFormat(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: `1px solid ${palette.secondary}` }}
        >
          {formatOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCompress}
        disabled={uploading}
        style={{
          background: palette.accent1,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 28px',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        {uploading ? 'Compressing...' : 'Compress & Download'}
      </button>
      {uploading && (
        <div style={{ marginBottom: 8, color: palette.primary }}>
          Uploading: {progress}%
        </div>
      )}
      {error && <div style={{ color: palette.alert, marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default (props) => (
  <RequireAuth>
    <FileCompressor {...props} />
  </RequireAuth>
); 