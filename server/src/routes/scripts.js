import express from 'express';
import { generateScript, getScripts } from '../controllers/scriptController.js';

const router = express.Router();

router.post('/generate', generateScript);
router.get('/', getScripts);

export { router as scriptRoutes };