# Bytesweep File Manager

A comprehensive file management system built with React, TypeScript, Express.js, and MongoDB. Monitor, analyze, and optimize your system's file performance with an intuitive web interface.

## Features

- **Dashboard Overview**: Real-time system statistics and disk usage monitoring
- **Temp File Manager**: Identify and clean up temporary files
- **Large File Analyzer**: Find and manage large files consuming disk space
- **Disk Space Analyzer**: Monitor disk usage across all drives
- **File Organizer**: Categorize and organize files efficiently
- **Performance Optimizer**: Get recommendations for system optimization
- **Backend API**: RESTful API with MongoDB for data persistence
- **Real-time Updates**: Live data synchronization between frontend and backend

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API communication
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- CORS for cross-origin requests
- Helmet for security headers
- Morgan for request logging
- Rate limiting for API protection

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd bytesweep-file-manager
```

### 2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Set up environment variables

Create a `.env` file in the backend directory:
```bash
cd backend
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/bytesweep

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Security
JWT_SECRET=your-secret-key-here
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
mongod

# On macOS (if installed via Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

## Running the Application

### Development Mode

#### Option 1: Run both frontend and backend together
```bash
npm run dev:full
```

#### Option 2: Run separately
```bash
# Terminal 1: Start the backend server
npm run server

# Terminal 2: Start the frontend development server
npm run dev
```

### Production Mode
```bash
# Build the frontend
npm run build

# Start the backend in production
cd backend
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server and database status

### Files
- `GET /api/files` - Get all files with pagination and filtering
- `GET /api/files/:id` - Get file by ID
- `POST /api/files` - Create new file
- `PUT /api/files/:id` - Update file
- `DELETE /api/files/:id` - Delete file (soft delete)
- `GET /api/files/category/:category` - Get files by category
- `GET /api/files/large/:minSize` - Get large files

### System
- `GET /api/system/stats` - Get system statistics
- `POST /api/system/stats` - Update system statistics
- `GET /api/system/disks` - Get disk information
- `POST /api/system/disks` - Update disk information
- `GET /api/system/files-by-category` - Get file statistics by category
- `GET /api/system/file-size-distribution` - Get file size distribution
- `GET /api/system/recent-files` - Get recent files
- `GET /api/system/health` - Get system health

### Cleanup
- `POST /api/cleanup/temp-files` - Clean up temporary files
- `POST /api/cleanup/large-files` - Clean up large files
- `POST /api/cleanup/duplicate-files` - Clean up duplicate files
- `POST /api/cleanup/bulk` - Bulk cleanup by category
- `GET /api/cleanup/preview/:category` - Get cleanup preview
- `POST /api/cleanup/restore` - Restore deleted files
- `GET /api/cleanup/stats` - Get cleanup statistics

## Database Schema

### File Model
```javascript
{
  name: String,
  path: String (unique),
  size: Number,
  type: String,
  category: String (enum: ['temp', 'large', 'duplicate', 'system', 'user']),
  lastModified: Date,
  isDeleted: Boolean,
  metadata: {
    extension: String,
    mimeType: String,
    permissions: String,
    owner: String
  }
}
```

### SystemStats Model
```javascript
{
  totalFiles: Number,
  totalSize: Number,
  tempFiles: Number,
  tempSize: Number,
  largeFiles: Number,
  largeSize: Number,
  duplicateFiles: Number,
  duplicateSize: Number,
  lastUpdated: Date
}
```

### DiskInfo Model
```javascript
{
  drive: String (unique),
  totalSpace: Number,
  usedSpace: Number,
  freeSpace: Number,
  usage: Number,
  lastUpdated: Date
}
```

## Development

### Project Structure
```
bytesweep-file-manager/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── backend/               # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Express server
├── package.json           # Frontend dependencies
└── backend/package.json   # Backend dependencies
```

### Adding New Features

1. **Backend**: Add new routes in `backend/routes/` and models in `backend/models/`
2. **Frontend**: Add new components in `src/components/` and API services in `src/services/`
3. **Types**: Update TypeScript types in `src/types/index.ts`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.