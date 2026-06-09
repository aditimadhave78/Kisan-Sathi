 const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.json({ success: false, message: 'No token!' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ success: false, message: 'Invalid token!' });
    req.farmer = decoded;
    next();
  });
}

router.post('/add', verifyToken, (req, res) => {
  const { name, land_area, season, sowing_date } = req.body;
  const farmer_id = req.farmer.id;
  db.query(
    'INSERT INTO crops (farmer_id, name, land_area, season, sowing_date) VALUES (?,?,?,?,?)',
    [farmer_id, name, land_area, season, sowing_date],
    (err, result) => {
      if (err) return res.json({ success: false, message: 'Error adding crop' });
      res.json({ success: true, message: 'Crop added!' });
    }
  );
});

router.get('/my-crops', verifyToken, (req, res) => {
  db.query(
    'SELECT * FROM crops WHERE farmer_id = ?',
    [req.farmer.id],
    (err, results) => {
      if (err) return res.json({ success: false });
      res.json({ success: true, crops: results });
    }
  );
});

module.exports = router;