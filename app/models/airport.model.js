import { DataTypes } from 'sequelize';
import db from './index.js';

const Airport = db.sequelize.define(
  'Airport',
  {
    code: {
      type: DataTypes.STRING(6),
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [3, 6],
        isUppercase: true,
      },
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: {
        name: 'city_unique_constraint', // Ensures uniqueness but prevents duplicate keys
        msg: 'City already exists in the database!',
      },
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
      },
    },
    kind: {
      type: DataTypes.ENUM('Passenger', 'Cargo', 'Military', 'Private'),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'airports', // Ensures Sequelize knows the table name
  }
);

// Log when the model is initialized
console.log(' Airport Model Initialized');

export default Airport;
