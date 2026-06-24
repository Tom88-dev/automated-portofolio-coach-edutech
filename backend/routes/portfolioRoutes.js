const express = require('express');

const router = express.Router();

const portfolioController =
require('../controllers/portfolioController');

router.post(
  '/generate/:userId',
  portfolioController.generatePortfolio
);

router.get(
  '/',
  portfolioController.getAllPortfolio
);

router.get(
  '/:id',
  portfolioController.getPortfolioById
);

module.exports = router;