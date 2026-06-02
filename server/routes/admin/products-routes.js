import express from "express"
import ProductsController from "../../controllers/admin/products-controller.js"
import { upload } from "../../helper/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single('my_file'), ProductsController.handleImageUpload)
router.post("/add", ProductsController.addProduct)
router.get("/all", ProductsController.fetchAllProduct)
router.put("/edit/:id", ProductsController.editProduct);
router.delete("/delete/:id", ProductsController.deleteProduct);


export default router;