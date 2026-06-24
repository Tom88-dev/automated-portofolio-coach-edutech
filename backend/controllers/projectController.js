const Project = require('../models/Project');


// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {

    const project = await Project.create(req.body);

    res.status(201).json({
      message: 'Project berhasil ditambahkan',
      data: project
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET ALL PROJECT
exports.getProjects = async (req, res) => {
  try {

    const projects = await Project.findAll();

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET PROJECT BY ID
exports.getProjectById = async (req, res) => {
  try {

    const project = await Project.findByPk(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: 'Project tidak ditemukan'
      });
    }

    res.status(200).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {

    const project = await Project.findByPk(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: 'Project tidak ditemukan'
      });
    }

    await project.update(req.body);

    res.status(200).json({
      message: 'Project berhasil diupdate',
      data: project
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {

    const project = await Project.findByPk(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: 'Project tidak ditemukan'
      });
    }

    await project.destroy();

    res.status(200).json({
      message: 'Project berhasil dihapus'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};