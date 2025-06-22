const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db.js');
const shopRoutes = require('./routes/shoproutes.js');
const authRoutes = require('./routes/authRoutes.js');
const lorryRoutes = require('./routes/lorryRoutes.js'); // Assuming you have lorry routes

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/shops', shopRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/lorryservices', lorryRoutes); // Assuming you have lorry services routes
app.get('/', (req, res) => {
  res.send('Welcome to Afiya Ledger API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ledger-frontend/dist')));

// Fallback for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ledger-frontend/dist/index.html'));
});

