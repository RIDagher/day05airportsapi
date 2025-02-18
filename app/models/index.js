import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create Sequelize instant
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // disabled logging sql querries in the console
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Test database connection
db.sequelize
  .sync({ alter: true }) //  This will DROP and RECREATE all tables
  .then(() => console.log(' Database synchronized (tables recreated)'))
  .catch((err) => console.error(' Error syncing database:', err));

export default db;
