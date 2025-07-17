import express from 'express';
import SystemStats from '../models/SystemStats.js';
import DiskInfo from '../models/DiskInfo.js';
import File from '../models/File.js';

const router = express.Router();

// Get system statistics
router.get('/stats', async (req, res) => {
  try {
    let stats = await SystemStats.findOne().sort({ createdAt: -1 });
    
    if (!stats) {
      // Calculate stats from files if no stats exist
      const totalFiles = await File.countDocuments({ isDeleted: false });
      const totalSizeResult = await File.aggregate([
        { $match: { isDeleted: false } },
        { $group: { _id: null, totalSize: { $sum: '$size' } } }
      ]);
      const totalSize = totalSizeResult.length > 0 ? totalSizeResult[0].totalSize : 0;

      const tempFilesResult = await File.aggregate([
        { $match: { category: 'temp', isDeleted: false } },
        { $group: { _id: null, count: { $sum: 1 }, totalSize: { $sum: '$size' } } }
      ]);
      const tempFiles = tempFilesResult.length > 0 ? tempFilesResult[0].count : 0;
      const tempSize = tempFilesResult.length > 0 ? tempFilesResult[0].totalSize : 0;

      const largeFilesResult = await File.aggregate([
        { $match: { category: 'large', isDeleted: false } },
        { $group: { _id: null, count: { $sum: 1 }, totalSize: { $sum: '$size' } } }
      ]);
      const largeFiles = largeFilesResult.length > 0 ? largeFilesResult[0].count : 0;
      const largeSize = largeFilesResult.length > 0 ? largeFilesResult[0].totalSize : 0;

      const duplicateFilesResult = await File.aggregate([
        { $match: { category: 'duplicate', isDeleted: false } },
        { $group: { _id: null, count: { $sum: 1 }, totalSize: { $sum: '$size' } } }
      ]);
      const duplicateFiles = duplicateFilesResult.length > 0 ? duplicateFilesResult[0].count : 0;
      const duplicateSize = duplicateFilesResult.length > 0 ? duplicateFilesResult[0].totalSize : 0;

      stats = new SystemStats({
        totalFiles,
        totalSize,
        tempFiles,
        tempSize,
        largeFiles,
        largeSize,
        duplicateFiles,
        duplicateSize
      });
      await stats.save();
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update system statistics
router.post('/stats', async (req, res) => {
  try {
    const stats = new SystemStats(req.body);
    const savedStats = await stats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get disk information
router.get('/disks', async (req, res) => {
  try {
    const disks = await DiskInfo.find().sort({ drive: 1 });
    res.json(disks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update disk information
router.post('/disks', async (req, res) => {
  try {
    const { drive, totalSpace, usedSpace, freeSpace, usage } = req.body;
    
    const diskInfo = await DiskInfo.findOneAndUpdate(
      { drive },
      { totalSpace, usedSpace, freeSpace, usage, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
    
    res.json(diskInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get file statistics by category
router.get('/files-by-category', async (req, res) => {
  try {
    const stats = await File.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalSize: { $sum: '$size' }
        }
      },
      { $sort: { totalSize: -1 } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get file size distribution
router.get('/file-size-distribution', async (req, res) => {
  try {
    const distribution = await File.aggregate([
      { $match: { isDeleted: false } },
      {
        $bucket: {
          groupBy: '$size',
          boundaries: [0, 1024, 10240, 102400, 1048576, 10485760, 104857600, 1073741824],
          default: 'Very Large',
          output: {
            count: { $sum: 1 },
            totalSize: { $sum: '$size' }
          }
        }
      }
    ]);

    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent files
router.get('/recent-files', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const recentFiles = await File.find({ isDeleted: false })
      .sort({ lastModified: -1 })
      .limit(parseInt(limit))
      .select('name path size type lastModified category');

    res.json(recentFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get system health
router.get('/health', async (req, res) => {
  try {
    const totalFiles = await File.countDocuments({ isDeleted: false });
    const totalSizeResult = await File.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: null, totalSize: { $sum: '$size' } } }
    ]);
    const totalSize = totalSizeResult.length > 0 ? totalSizeResult[0].totalSize : 0;

    const tempFiles = await File.countDocuments({ category: 'temp', isDeleted: false });
    const largeFiles = await File.countDocuments({ category: 'large', isDeleted: false });
    const duplicateFiles = await File.countDocuments({ category: 'duplicate', isDeleted: false });

    res.json({
      totalFiles,
      totalSize,
      tempFiles,
      largeFiles,
      duplicateFiles,
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 