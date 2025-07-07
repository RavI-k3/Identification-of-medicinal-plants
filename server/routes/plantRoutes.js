// server/routes/plantRoutes.js
const express = require('express');
const router = express.Router();

// Example route: GET /api/plants
router.get('/plants', (req, res) => {
  res.json([
    { name: 'Tulsi', use: 'Cough and cold' },
    { name: 'Neem', use: 'Skin treatment' },
  ]);
});

// Example route: POST /api/identify
router.post('/identify', (req, res) => {
  const { image } = req.body;
  // In real case, run ML model here
  res.json({ prediction: 'Aloe Vera', confidence: 92 });
});

module.exports = router;
