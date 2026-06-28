import express from 'express';
import {
  getAllEmployees,
  getRetiredEmployees,
  getRetiredCount,
  getMyEmployeeDetails,
  updateEmployeeStatus
} from '../controllers/employeesController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAllEmployees);
router.get('/retirees', getRetiredEmployees);
router.get('/retirees/count', getRetiredCount);
router.get('/me', verifyToken, getMyEmployeeDetails);
router.put('/:id/status', verifyToken, isAdmin, updateEmployeeStatus);

export default router;
