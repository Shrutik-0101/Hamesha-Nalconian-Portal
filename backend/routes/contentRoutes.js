import express from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getContent);
router.put('/', verifyToken, isAdmin, updateContent);

export default router;
