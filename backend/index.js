const express = require('express');
const multer = require('multer');
const archiver = require('archiver');
const AdmZip = require('adm-zip');
const { spawn } = require('child_process');
const tar = require('tar');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

// Helper: Remove uploaded files after compression
const cleanupFiles = (files) => {
  files.forEach((file) => {
    fs.unlink(file.path, () => {});
  });
};

// POST /compress
// Accepts multiple files and a format (zip, tar, gzip, 7z, rar)
app.post('/compress', upload.array('files'), async (req, res) => {
  const format = req.body.format;
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded.' });
  }
  if (!['zip', 'tar', 'gzip', '7z', 'rar'].includes(format)) {
    cleanupFiles(files);
    return res.status(400).json({ error: 'Unsupported format.' });
  }

  // Output file path
  const outName = `archive_${Date.now()}.${format === 'gzip' ? 'tar.gz' : format}`;
  const outPath = path.join(__dirname, outName);

  try {
    if (format === 'zip') {
      // Use archiver for zip
      const output = fs.createWriteStream(outPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.pipe(output);
      files.forEach((file) => {
        archive.file(file.path, { name: file.originalname });
      });
      await archive.finalize();
      await new Promise((resolve) => output.on('close', resolve));
    } else if (format === 'tar' || format === 'gzip') {
      // Use tar for tar/gzip
      await tar.c(
        {
          gzip: format === 'gzip',
          file: outPath,
          cwd: files[0].destination,
        },
        files.map((file) => path.basename(file.path))
      );
    } else if (format === '7z' || format === 'rar') {
      // Use system 7z/rar if available
      const ext = format === '7z' ? '7z' : 'rar';
      const args = [
        'a',
        outPath,
        ...files.map((file) => file.path),
      ];
      const proc = spawn(ext, args);
      await new Promise((resolve, reject) => {
        proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${ext} failed`))));
      });
    }

    // Send the archive
    res.download(outPath, (err) => {
      fs.unlink(outPath, () => {});
      cleanupFiles(files);
    });
  } catch (err) {
    cleanupFiles(files);
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`File compressor backend running on port ${PORT}`);
}); 