import express from 'express';
import { verifyAlcohol, getProduct, getAlcoholHistory } from '../controllers/alcoholController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All alcohol routes are protected
router.use(protect);

router.post('/verify', verifyAlcohol);
router.get('/product/:code', getProduct);
router.get('/history', getAlcoholHistory);

export default router;
