const Progress = require('../models/Progress');
const Project = require('../models/Project');

exports.generatePortfolio = async (userId) => {

  const progressList = await Progress.findAll({
    where: { userId }
  });

  const projects = await Project.findAll({
    where: { userId }
  });

  // =========================
  // SKILL CLUSTERING
  // =========================

  const skills = progressList.map(
    item => item.courseName
  );

  // =========================
  // ROLE DETERMINATION
  // =========================

  let frontendCount = 0;
  let backendCount = 0;
  let databaseCount = 0;

  progressList.forEach(item => {

    if (item.category === 'Frontend') {
      frontendCount++;
    }

    if (item.category === 'Backend') {
      backendCount++;
    }

    if (item.category === 'Database') {
      databaseCount++;
    }

  });

  let generatedTitle = 'Junior Developer';

  if (
    frontendCount > backendCount &&
    frontendCount > databaseCount
  ) {
    generatedTitle =
      'Junior Frontend Developer';
  }

  else if (
    backendCount > frontendCount &&
    backendCount > databaseCount
  ) {
    generatedTitle =
      'Junior Backend Developer';
  }

  else {
    generatedTitle =
      'Junior Full Stack Developer';
  }

  // =========================
  // PROJECT HIGHLIGHT
  // =========================

  const bestProject = projects.sort(
    (a, b) => b.score - a.score
  )[0];

  // =========================
  // SUMMARY
  // =========================

  const summary =
    `Memiliki kemampuan pada ${skills.join(', ')} dengan fokus sebagai ${generatedTitle}.`;

  return {
    generatedTitle,
    summary,
    skillsList: skills.join(', '),
    projectHighlights:
      bestProject
        ? bestProject.projectName
        : 'Belum ada project'
  };

};

console.log(module.exports);