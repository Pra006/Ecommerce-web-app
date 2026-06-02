import { ImageUploadUtils } from "../../helper/cloudinary.js";
import Product from "../../models/Products.js";

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: " No file uploaded",
      });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await ImageUploadUtils(url);
    res.json({
      success: true,
      result: result.url,
      message: "file uploaded",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlycreatedProduct = new Product({
      title,
      description,
      image,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlycreatedProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newlycreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

//fetch all products
const fetchAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Got all Product",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    findProduct.title = title || findProduct.title;
    findProduct.description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export default {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
};
