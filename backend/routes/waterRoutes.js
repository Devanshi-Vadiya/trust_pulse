import express from 'express';
import { verifyWater, getBatch, getWaterHistory } from '../controllers/waterController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All water routes are protected
router.use(protect);

router.post('/verify', verifyWater);
router.get('/batch/:id', getBatch);
router.get('/history', getWaterHistory);

export default router;
