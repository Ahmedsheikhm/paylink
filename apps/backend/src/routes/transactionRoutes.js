import express from 'express';
import { deposit,withdraw,transfer } from '../controllers/transactionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);

router.post('/deposit',deposit);
router.post('/withdraw',withdraw);
router.post('/transfer',transfer);

export default router;