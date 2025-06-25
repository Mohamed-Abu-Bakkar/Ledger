const express = require('express');
const cors = require('cors');
const path = require('path');
// === Importing required modules
// const mongoose = require('mongoose'); // Not needed here, as connectDB handles it
// const dotenv = require('dotenv'); // Not needed here, as dotenv is already imported
// === Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const connectDB = require('./config/db.js');
const shopRoutes = require('./routes/shoproutes.js');
const authRoutes = require('./routes/authRoutes.js');
const lorryRoutes = require('./routes/lorryRoutes.js');

const app = express();
const MONGODB_URI = process.env.MONGO_URI;
// === Connect to MongoDB
connectDB(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));




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


const PORT = process.env.PORT || 500;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
