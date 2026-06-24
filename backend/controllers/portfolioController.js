const Portfolio = require('../models/Portfolio');
const portfolioService = require('../services/portfolioService');

exports.generatePortfolio = async (req, res) => {
  try {

    const userId = req.params.userId;

    const result =
      await portfolioService.generatePortfolio(
        userId
      );

    const portfolio =
      await Portfolio.create({
        userId,
        generatedTitle: result.generatedTitle,
        summary: result.summary,
        skillsList: result.skillsList,
        projectHighlights:
          result.projectHighlights
      });

    res.status(201).json({
      message:
        'Portfolio berhasil dibuat',
      data: portfolio
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET ALL PORTFOLIO
exports.getAllPortfolio = async (
  req,
  res
) => {

  try {

    const portfolios =
      await Portfolio.findAll();

    res.status(200).json(
      portfolios
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET PORTFOLIO BY ID
exports.getPortfolioById = async (
  req,
  res
) => {

  try {

    const portfolio =
      await Portfolio.findByPk(
        req.params.id
      );

    if (!portfolio) {

      return res.status(404).json({
        message:
          'Portfolio tidak ditemukan'
      });

    }

    res.status(200).json(
      portfolio
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};