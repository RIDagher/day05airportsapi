import Airport from '../models/airport.model.js';
import { validateAirport } from '../utils/validator.js';
import logger from '../utils/logger.js';

/**
 * Get all airports, sorted by code
 */
export const getAllAirports = async (req, res) => {
  logger.info(`Request received: Fetch all airports`);
  try {
    const airports = await Airport.findAll({ order: [['code', 'ASC']] });
    logger.info(`Fetched ${airports.length} airports`);
    return res.status(200).json(airports);
  } catch (err) {
    logger.error('Error fetching airports', err);
    res.status(500).json({ error: 'Error fetching airports' });
  }
};

/**
 * Get an airport by its code
 */
export const getAirportByCode = async (req, res) => {
  const { code } = req.params;
  logger.info(`Request received: Fetch airport with code ${code}`);

  try {
    const airport = await Airport.findByPk(code);
    if (!airport) {
      logger.warn(`Airport not found: ${code}`);
      return res.status(404).json({ message: 'Airport not found' });
    }
    return res.status(200).json(airport);
  } catch (err) {
    logger.error(`Error fetching airport with code ${code}:`, err);
    return res.status(500).json({ message: 'Error fetching airport' });
  }
};

/**
 * Create an airport
 */
export const createAirport = async (req, res) => {
  try {
    logger.info('Incoming request to create an airport', req.body);

    // Validate request data
    const validationError = validateAirport(req.body);
    if (validationError) {
      logger.warn(`Validation failed: ${validationError}`);
      return res.status(400).json({ message: validationError });
    }

    const { code, city, latitude, longitude, kind } = req.body;

    // Ensure the airport code and city are unique
    const existingAirport = await Airport.findOne({ where: { code } });
    const existingCity = await Airport.findOne({ where: { city } });

    if (existingAirport) {
      logger.warn(`Airport code already in use: ${code}`);
      return res.status(409).json({ message: 'Airport code already in use' });
    }
    if (existingCity) {
      logger.warn(`City already in use: ${city}`);
      return res.status(409).json({ message: 'City already in use' });
    }

    // Create airport
    const newAirport = await Airport.create({
      code,
      city,
      latitude,
      longitude,
      kind,
    });
    logger.info(`Airport created: ${JSON.stringify(newAirport)}`);
    return res.status(201).json(newAirport);
  } catch (err) {
    logger.error('Error creating airport:', err);
    res.status(500).json({ error: 'Error creating airport.' });
  }
};

/**
 * Update an airport
 */
export const updateAirport = async (req, res) => {
  const { code } = req.params;
  logger.info(`Updating airport with code: ${code}`);

  try {
    const airport = await Airport.findByPk(code);
    if (!airport) {
      logger.warn(`Airport not found: ${code}`);
      return res.status(404).json({ message: 'Airport not found.' });
    }

    // Validate request body
    const validationError = validateAirport(req.body, true); // Set isUpdate = true
    if (validationError) {
      logger.warn(`Validation failed: ${validationError}`);
      return res.status(400).json({ message: validationError });
    }

    const { city, latitude, longitude, kind } = req.body;

    // Ensure city is unique (excluding the current record)
    const existingCity = await Airport.findOne({ where: { city } });
    if (existingCity && existingCity.code !== code) {
      logger.warn(`City already in use by another airport: ${city}`);
      return res.status(409).json({ message: 'City already in use.' });
    }

    // Update airport
    await airport.update({ city, latitude, longitude, kind });
    logger.info(`Airport updated successfully: ${code}`);
    res.status(200).json({ message: 'Airport updated successfully', airport });
  } catch (err) {
    logger.error(`Error updating airport ${code}:`, err);
    res.status(500).json({ error: 'Error updating airport.' });
  }
};

/**
 * Delete an airport
 */
export const deleteAirport = async (req, res) => {
  const { code } = req.params;
  logger.info(`Request received: Delete airport with code ${code}`);

  try {
    const airport = await Airport.findByPk(code);
    if (!airport) {
      logger.warn(`Airport not found: ${code}`);
      return res.status(404).json({ message: 'Airport not found' });
    }

    // Delete airport
    await airport.destroy();
    logger.info(`Airport deleted successfully: ${code}`);
    return res
      .status(200)
      .json({ message: `Airport ${code} deleted successfully` });
  } catch (err) {
    logger.error(`Error deleting airport ${code}: ${err.message}`);
    return res.status(500).json({ error: 'Error deleting airport' });
  }
};
