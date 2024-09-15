import express from 'express';
import { getVcController, createVcController, getAllVcController } from '../controllers/didController.js';

const router = express.Router();

router.get('/:userId', getVcController);
router.post('/', createVcController);
router.get('/', getAllVcController);

export default router;