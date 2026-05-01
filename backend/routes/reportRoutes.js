import express from 'express';
import { createReport, getReports, getReport } from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// All report routes are protected
router.use(protect);

// POST with file upload (up to 5 evidence images)
router.post('/', upload.array('evidence', 5), createReport);
router.get('/', getReports);
router.get('/:id', getReport);

export default router;
