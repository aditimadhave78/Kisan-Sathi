 const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/market', require('./routes/market'));
app.use('/api/crops', require('./routes/crops'));

app.listen(process.env.PORT, () => {
  console.log(`🌱 Kisan Sathi running on port ${process.env.PORT}`);
});