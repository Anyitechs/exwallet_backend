import express from 'express';
import { getVcController, createVcController } from '../controllers/didController.js';

const router = express.Router();

router.get('/:userId', getVcController);
router.post('/', createVcController);

export default router;