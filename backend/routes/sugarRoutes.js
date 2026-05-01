import express from 'express';
import { scanSugar, addManualEntry, getSugarHistory, getSugarStats } from '../controllers/sugarController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All sugar routes are protected
router.use(protect);

router.post('/scan', scanSugar);
router.post('/manual', addManualEntry);
router.get('/history', getSugarHistory);
router.get('/stats', getSugarStats);

export default router;
