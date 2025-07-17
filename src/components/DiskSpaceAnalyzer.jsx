import React, { useState, useEffect } from 'react';
import { HardDrive, PieChart, BarChart3, RefreshCw, Folder } from 'lucide-react';
import api from '../services/api';
import RequireAuth from './RequireAuth';

const DiskSpaceAnalyzer = () => {
  const [disks, setDisks] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [directories, setDirectories] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [viewType, setViewType] = useState('chart');

  useEffect(() => {
    fetchDisks();
  }, []);

  useEffect(() => {
    if (selectedDrive) {
      analyzeDiskSpace(selectedDrive.drive);
    }
  }, [selectedDrive]);

  const fetchDisks = async () => {
    try {
      const res = await api.get('/system/disks');
      setDisks(res.data);
      setSelectedDrive(res.data[0] || null);
    } catch (err) {
      setDisks([]);
      setSelectedDrive(null);
    }
  };

  const analyzeDiskSpace = async (drive) => {
    setIsAnalyzing(true);
    // If you have a backend endpoint for directories, fetch here. Otherwise, skip.
    // Example: const res = await api.get(`/files/directories?drive=${drive}`);
    setDirectories([]); // Placeholder, update if endpoint exists
    setIsAnalyzing(false);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <HardDrive className="inline w-7 h-7 text-blue-600" /> Disk Space Analyzer
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Drive</label>
          <select
            value={selectedDrive?.drive || ''}
            onChange={(e) => setSelectedDrive(disks.find(d => d.drive === e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {disks.map(drive => (
              <option key={drive.drive} value={drive.drive}>
                Drive {drive.drive} - {formatBytes(drive.totalSpace)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">View Type</label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewType('chart')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewType === 'chart' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <PieChart className="h-4 w-4 inline mr-1" />
              Chart
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewType === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-1" />
              List
            </button>
          </div>
        </div>
      </div>
      {/* Add disk usage charts or directory listing here using real data */}
      <div className="mt-8">
        {selectedDrive && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Drive {selectedDrive.drive}</h3>
            <p>Total Space: {formatBytes(selectedDrive.totalSpace)}</p>
            <p>Used Space: {formatBytes(selectedDrive.usedSpace)}</p>
            <p>Free Space: {formatBytes(selectedDrive.freeSpace)}</p>
            <p>Usage: {selectedDrive.usage}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default (props) => (
  <RequireAuth>
    <DiskSpaceAnalyzer {...props} />
  </RequireAuth>
); 