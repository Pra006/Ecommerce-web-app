import express from "express";
import { getAllOrderByUserId, getOrderDetailsForAdmin, updateOrderStatusForAdmin } from '../../controllers/admin/order-controller.js';

const router = express.Router();

router.get('/get', getAllOrderByUserId)
router.get('/details/:id', getOrderDetailsForAdmin)
router.put('/update/:id', updateOrderStatusForAdmin)

export default router