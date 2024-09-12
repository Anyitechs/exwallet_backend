import express from 'express';
import offeringRoutes from './offerings.js';

const router = express.Router();
router.use('/offerings', offeringRoutes);

export default router;