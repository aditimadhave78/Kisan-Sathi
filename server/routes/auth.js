 const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/signup', async (req, res) => {
  const { name, email, password, phone, location, state } = req.body;

  db.query('SELECT * FROM farmers WHERE email = ?', [email], async (err, results) => {
    if (results.length > 0) {
      return res.json({ success: false, message: 'Email already registered!' });
    }
    const hashed = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO farmers (name, email, password, phone, location, state) VALUES (?,?,?,?,?,?)',
      [name, email, hashed, phone, location, state],
      (err, result) => {
        if (err) return res.json({ success: false, message: 'Error signing up' });
        res.json({ success: true, message: 'Registered successfully!' });
      }
    );
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM farmers WHERE email = ?', [email], async (err, results) => {
    if (results.length === 0) {
      return res.json({ success: false, message: 'Email not found!' });
    }
    const farmer = results[0];
    const match = await bcrypt.compare(password, farmer.password);
    if (!match) {
      return res.json({ success: false, message: 'Wrong password!' });
    }
    const token = jwt.sign(
      { id: farmer.id, name: farmer.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      success: true, token,
      farmer: { id: farmer.id, name: farmer.name, location: farmer.location }
    });
  });
});

module.exports = router;