// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const scheduleRoutes = require('./routes/schedule');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/schedule", scheduleRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
