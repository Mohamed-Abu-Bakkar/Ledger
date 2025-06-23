const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db.js');
const shopRoutes = require('./routes/shoproutes.js');
const authRoutes = require('./routes/authRoutes.js');
const lorryRoutes = require('./routes/lorryRoutes.js');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// === API Routes (Important: before frontend static serve)
app.use('/api/shops', shopRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/lorryservices', lorryRoutes);

// === Serve Frontend
const frontendPath = path.join(__dirname, '..', 'ledger-frontend', 'dist');
app.use(express.static(frontendPath));

app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
