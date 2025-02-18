import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './app/models/index.js';
import Airport from './app/models/airport.model.js';
import airportRoutes from './app/routes/airport.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client')); // Serve static frontend files
app.use('/api/airports', airportRoutes);

// Ensure database sync includes all models
db.sequelize
  .sync({ alter: true }) // Forces table creation if it doesn't exist
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error syncing database:', err));

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
