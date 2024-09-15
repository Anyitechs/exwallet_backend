import express from 'express';
import offeringRoutes from './offerings.js';
import didRoutes from './did.js';
import exchangeRoutes from './exchange.js';

const router = express.Router();
router.use('/did', didRoutes);
router.use('/offerings', offeringRoutes);
router.use('/exchange', exchangeRoutes);

export default router;