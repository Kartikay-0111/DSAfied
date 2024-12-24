const express = require('express');
const router = express.Router();

// Sample API Route
router.get('/status', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});

module.exports = router;
