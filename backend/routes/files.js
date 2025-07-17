import express from 'express';
import File from '../models/File.js';

const router = express.Router();

// Get all files with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      sortBy = 'lastModified', 
      sortOrder = 'desc',
      search 
    } = req.query;

    const query = { isDeleted: false };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { path: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const files = await File.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await File.countDocuments(query);

    res.json({
      files,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalFiles: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get file by ID
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new file
router.post('/', async (req, res) => {
  try {
    const file = new File(req.body);
    const savedFile = await file.save();
    res.status(201).json(savedFile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update file
router.put('/:id', async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete file (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get files by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const files = await File.find({ 
      category, 
      isDeleted: false 
    })
      .sort({ lastModified: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await File.countDocuments({ 
      category, 
      isDeleted: false 
    });

    res.json({
      files,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalFiles: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get large files (files larger than specified size)
router.get('/large/:minSize', async (req, res) => {
  try {
    const { minSize } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const files = await File.find({ 
      size: { $gte: parseInt(minSize) },
      isDeleted: false 
    })
      .sort({ size: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await File.countDocuments({ 
      size: { $gte: parseInt(minSize) },
      isDeleted: false 
    });

    res.json({
      files,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalFiles: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 