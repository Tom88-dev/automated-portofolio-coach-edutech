const Progress = require('../models/Progress');

// CREATE
exports.createProgress = async (req, res) => {
  try {
    const progress = await Progress.create(req.body);

    res.status(201).json({
      message: 'Progress berhasil ditambahkan',
      data: progress
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// READ ALL
exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.findAll();

    res.status(200).json(progress);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// READ BY ID
exports.getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findByPk(req.params.id);

    if (!progress) {
      return res.status(404).json({
        message: 'Progress tidak ditemukan'
      });
    }

    res.status(200).json(progress);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE
exports.updateProgress = async (req, res) => {
  try {

    const progress = await Progress.findByPk(req.params.id);

    if (!progress) {
      return res.status(404).json({
        message: 'Progress tidak ditemukan'
      });
    }

    await progress.update(req.body);

    res.status(200).json({
      message: 'Progress berhasil diupdate',
      data: progress
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE
exports.deleteProgress = async (req, res) => {
  try {

    const progress = await Progress.findByPk(req.params.id);

    if (!progress) {
      return res.status(404).json({
        message: 'Progress tidak ditemukan'
      });
    }

    await progress.destroy();

    res.status(200).json({
      message: 'Progress berhasil dihapus'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};