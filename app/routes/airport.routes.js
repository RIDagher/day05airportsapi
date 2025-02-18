import express from 'express';
import {
  createAirport,
  deleteAirport,
  getAirportByCode,
  getAllAirports,
  updateAirport,
} from '../controllers/airport.controller.js';

const router = express.Router();

router.get('/', getAllAirports);
router.get('/:code', getAirportByCode);
router.post('/', createAirport);
router.put('/:code', updateAirport);
router.delete('/:code', deleteAirport);

export default router;
