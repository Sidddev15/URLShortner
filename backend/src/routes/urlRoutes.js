const express = require('express');
const router = express.Router();
const { createShortUrl, handleRedirect } = require('../controllers/Controller');

router.post('/shorten', createShortUrl);
router.get('/:code', handleRedirect);

// test
router.get('/all', async (req, res) => {
  const pool = require('../config/db');
  try {
    const result = await pool.query('SELECT * FROM urls ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;