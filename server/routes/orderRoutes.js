import express from 'express';
import { getOrderDetails } from '../controllers/orderController.js';

const router = express.Router();

router.get('/api/orders/:orderId', getOrderDetails);

export default router;
