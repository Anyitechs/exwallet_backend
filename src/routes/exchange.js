import express from 'express';
import { createExchangeController, getExchanges, createOrderController, closeOrderController } from '../controllers/exchangeController.js';

const router = express.Router();
router.post('/create', createExchangeController);
router.get('/all', getExchanges);
router.post('/order/create', createOrderController);
router.put('/order/close', closeOrderController);

export default router;