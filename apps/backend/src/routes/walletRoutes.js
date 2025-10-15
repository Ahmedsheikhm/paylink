import express from 'express';
import { getMyWallet,createWallet,getMyWalletByUserId } from '../controllers/walletController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);//all wallet routes require auth

router.get('/',getMyWallet);
router.get('/',createWallet); //create wallet for current user
router.get('/:userId',getMyWalletByUserId);//admin or lookup wallet

export default router;