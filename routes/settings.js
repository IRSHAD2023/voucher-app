const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Render settings page
router.get('/', (req, res) => {
  res.render('settings', { title: 'Settings' });
});

// Handle settings form submission
router.post('/', (req, res) => {
  const { expiryTime, voucherWidth, voucherHeight, titleFontSize, normalFontSize } = req.body;

  // Save settings to the database (assuming a `settings` table exists)
  const query = `
    UPDATE settings SET 
      expiry_time = $1, 
      voucher_width = $2, 
      voucher_height = $3,
      title_font_size = $4,
      normal_font_size = $5
    WHERE id = 1
  `;
  const values = [expiryTime, voucherWidth, voucherHeight, titleFontSize, normalFontSize];

  db.query(query, values)
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch(err => {
      res.send('Error saving settings');
    });
});

module.exports = router;
