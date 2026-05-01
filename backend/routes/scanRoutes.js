import express from 'express';
import { createScan, getScanHistory, getScan, getScanStats } from '../controllers/scanController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All scan routes are protected
router.use(protect);

router.post('/', createScan);
router.get('/history', getScanHistory);
router.get('/stats', getScanStats);
router.get('/:id', getScan);

export default router;
