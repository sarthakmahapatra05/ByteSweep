# ByteSweep

ByteSweep is a modern, full-stack file management app that helps you analyze disk space, organize files, compress large files, and clean up your system—all with a beautiful, animated React interface and secure authentication. Perfect for keeping your digital life tidy and efficient!

## Features

- 🔒 **Secure Authentication**: Sign up and log in to access all features securely.
- 📊 **Disk Space Analyzer**: Visualize your disk usage and find large files.
- 🗂️ **File Organizer**: Automatically sort and organize your files.
- 🗜️ **File Compressor**: Compress large files to save space.
- 🧹 **Temp File Manager**: Clean up temporary and unnecessary files.
- 🎨 **Animated, Modern UI**: Enjoy a beautiful, responsive, and interactive interface.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB
- **Auth & Storage**: Supabase

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/sarthakmahapatra05/ByteSweep.git
   cd ByteSweep
   ```
2. **Install dependencies:**
   ```sh
   npm install
   cd backend && npm install && cd ..
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both root and `backend/` folders and fill in your credentials.
4. **Start the backend server:**
   ```sh
   cd backend
   npm start
   ```
5. **Start the frontend app:**
   ```sh
   npm run dev
   ```
6. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Usage
- **Sign up or log in** to access all features.
- Use the sidebar to navigate between Dashboard, Analyze, Organize, Compress, and more.
- Only authenticated users can use the app’s features.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Credits
- [Supabase](https://supabase.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

> Made with ❤️ by [sarthakmahapatra05](https://github.com/sarthakmahapatra05)
