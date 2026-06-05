import express from "express";
import { addAddress, deleteAllAddress, editAllAddress, fetchAllAddress } from "../../controllers/shop/address-Controller.js";


const router = express.Router();

router.post("/add", addAddress);
router.get('/get/:userId', fetchAllAddress);
router.put('/update/:userId/:addressId', editAllAddress);
router.delete('/delete/:userId/:addressId', deleteAllAddress);

export default router;