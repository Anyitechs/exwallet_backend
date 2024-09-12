import express from 'express';
import { getOfferingsController } from '../controllers/offeringsController.js';

const router = express.Router();
router.get('/', getOfferingsController);

export default router;