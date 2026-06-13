import Order from "../../models/Order.js";
import Product from "../../models/Products.js";
import ProductReview from "../../models/Review.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "need to purchase to review",
      });
    }
    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });
    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "already reviewed",
      });
    }
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();
    const review = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      review.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;
    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(200).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};
export const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured!",
    });
  }
};
