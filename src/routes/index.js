import express from 'express';
import offeringRoutes from './offerings.js';
import didRoutes from './did.js'

const router = express.Router();
router.use('/did', didRoutes);
router.use('/offerings', offeringRoutes);

export default router;