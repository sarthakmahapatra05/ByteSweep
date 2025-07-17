import express from 'express';
import File from '../models/File.js';
import SystemStats from '../models/SystemStats.js';

const router = express.Router();

// Clean up temporary files
router.post('/temp-files', async (req, res) => {
  try {
    const { confirm = false } = req.body;
    
    if (!confirm) {
      return res.status(400).json({ error: 'Confirmation required for cleanup operation' });
    }

    const tempFiles = await File.find({ category: 'temp', isDeleted: false });
    const totalSize = tempFiles.reduce((sum, file) => sum + file.size, 0);

    // Mark files as deleted
    await File.updateMany(
      { category: 'temp', isDeleted: false },
      { isDeleted: true }
    );

    // Update system stats
    await updateSystemStats();

    res.json({
      message: 'Temporary files cleaned up successfully',
      filesRemoved: tempFiles.length,
      spaceFreed: totalSize,
      categories: ['temp']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clean up large files
router.post('/large-files', async (req, res) => {
  try {
    const { fileIds, confirm = false } = req.body;
    
    if (!confirm) {
      return res.status(400).json({ error: 'Confirmation required for cleanup operation' });
    }

    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      return res.status(400).json({ error: 'File IDs array is required' });
    }

    const filesToDelete = await File.find({ 
      _id: { $in: fileIds }, 
      isDeleted: false 
    });

    const totalSize = filesToDelete.reduce((sum, file) => sum + file.size, 0);

    // Mark files as deleted
    await File.updateMany(
      { _id: { $in: fileIds } },
      { isDeleted: true }
    );

    // Update system stats
    await updateSystemStats();

    res.json({
      message: 'Large files cleaned up successfully',
      filesRemoved: filesToDelete.length,
      spaceFreed: totalSize,
      categories: ['large']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clean up duplicate files
router.post('/duplicate-files', async (req, res) => {
  try {
    const { fileIds, confirm = false } = req.body;
    
    if (!confirm) {
      return res.status(400).json({ error: 'Confirmation required for cleanup operation' });
    }

    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      return res.status(400).json({ error: 'File IDs array is required' });
    }

    const filesToDelete = await File.find({ 
      _id: { $in: fileIds }, 
      isDeleted: false 
    });

    const totalSize = filesToDelete.reduce((sum, file) => sum + file.size, 0);

    // Mark files as deleted
    await File.updateMany(
      { _id: { $in: fileIds } },
      { isDeleted: true }
    );

    // Update system stats
    await updateSystemStats();

    res.json({
      message: 'Duplicate files cleaned up successfully',
      filesRemoved: filesToDelete.length,
      spaceFreed: totalSize,
      categories: ['duplicate']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk cleanup by category
router.post('/bulk', async (req, res) => {
  try {
    const { categories, confirm = false } = req.body;
    
    if (!confirm) {
      return res.status(400).json({ error: 'Confirmation required for cleanup operation' });
    }

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: 'Categories array is required' });
    }

    const filesToDelete = await File.find({ 
      category: { $in: categories }, 
      isDeleted: false 
    });

    const totalSize = filesToDelete.reduce((sum, file) => sum + file.size, 0);

    // Mark files as deleted
    await File.updateMany(
      { category: { $in: categories }, isDeleted: false },
      { isDeleted: true }
    );

    // Update system stats
    await updateSystemStats();

    res.json({
      message: 'Bulk cleanup completed successfully',
      filesRemoved: filesToDelete.length,
      spaceFreed: totalSize,
      categories
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cleanup preview (files that would be deleted)
router.get('/preview/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 50 } = req.query;

    let query = { isDeleted: false };
    
    if (category === 'temp') {
      query.category = 'temp';
    } else if (category === 'large') {
      query.category = 'large';
    } else if (category === 'duplicate') {
      query.category = 'duplicate';
    } else {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const files = await File.find(query)
      .sort({ size: -1 })
      .limit(parseInt(limit))
      .select('name path size type lastModified category');

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    res.json({
      files,
      totalFiles: files.length,
      totalSize,
      category
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Restore deleted files
router.post('/restore', async (req, res) => {
  try {
    const { fileIds } = req.body;

    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      return res.status(400).json({ error: 'File IDs array is required' });
    }

    const restoredFiles = await File.updateMany(
      { _id: { $in: fileIds }, isDeleted: true },
      { isDeleted: false }
    );

    // Update system stats
    await updateSystemStats();

    res.json({
      message: 'Files restored successfully',
      filesRestored: restoredFiles.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cleanup statistics
router.get('/stats', async (req, res) => {
  try {
    const tempFiles = await File.countDocuments({ category: 'temp', isDeleted: false });
    const tempSizeResult = await File.aggregate([
      { $match: { category: 'temp', isDeleted: false } },
      { $group: { _id: null, totalSize: { $sum: '$size' } } }
    ]);
    const tempSize = tempSizeResult.length > 0 ? tempSizeResult[0].totalSize : 0;

    const largeFiles = await File.countDocuments({ category: 'large', isDeleted: false });
    const largeSizeResult = await File.aggregate([
      { $match: { category: 'large', isDeleted: false } },
      { $group: { _id: null, totalSize: { $sum: '$size' } } }
    ]);
    const largeSize = largeSizeResult.length > 0 ? largeSizeResult[0].totalSize : 0;

    const duplicateFiles = await File.countDocuments({ category: 'duplicate', isDeleted: false });
    const duplicateSizeResult = await File.aggregate([
      { $match: { category: 'duplicate', isDeleted: false } },
      { $group: { _id: null, totalSize: { $sum: '$size' } } }
    ]);
    const duplicateSize = duplicateSizeResult.length > 0 ? duplicateSizeResult[0].totalSize : 0;

    res.json({
      tempFiles,
      tempSize,
      largeFiles,
      largeSize,
      duplicateFiles,
      duplicateSize,
      totalCleanupSize: tempSize + largeSize + duplicateSize
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to update system stats
async function updateSystemStats() {
  try {
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

    const stats = new SystemStats({
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
  } catch (error) {
    console.error('Error updating system stats:', error);
  }
}

export default router; 