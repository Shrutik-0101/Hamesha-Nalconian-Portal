import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/user-data', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Access granted to sensitive user data',
    user: req.user
  });
});

router.get('/admin-data', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({
    message: 'Access granted to sensitive ADMIN data',
    user: req.user
  });
});

export default router;
