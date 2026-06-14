import Order from "../../models/Order.js";
import ProductReview from "../../models/Review.js";
import Product from "../../models/Products.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    const normalizedReviewValue = Number(reviewValue);

    if (
      !productId ||
      !userId ||
      !reviewMessage?.trim() ||
      !Number.isFinite(normalizedReviewValue) ||
      normalizedReviewValue < 1 ||
      normalizedReviewValue > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Please add a rating and review message",
      });
    }

    const orders = await Order.find({ userId });
    const eligibleOrder = orders.find((order) => {
      const paymentStatus = String(order.paymentStatus ?? "").toLowerCase();
      const orderStatus = String(order.orderStatus ?? "").toLowerCase();
      const hasProduct = Array.isArray(order.cartItems)
        ? order.cartItems.some(
            (item) => String(item?.productId) === String(productId),
          )
        : false;

      const isPaid = ["paid", "success", "completed"].includes(paymentStatus);
      const isCompleted = [
        "confirmed",
        "delivered",
        "shipping",
        "shipped",
      ].includes(orderStatus);

      return hasProduct && isPaid && (isCompleted || isPaid);
    });

    if (!eligibleOrder) {
      return res.status(403).json({
        success: false,
        message: "You can review this product after buying it",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    let reviewDocument = checkExistingReview;
    if (reviewDocument) {
      reviewDocument.userName = userName;
      reviewDocument.reviewMessage = reviewMessage.trim();
      reviewDocument.reviewValue = normalizedReviewValue;
      await reviewDocument.save();
    } else {
      reviewDocument = new ProductReview({
        productId,
        userId,
        userName,
        reviewMessage: reviewMessage.trim(),
        reviewValue: normalizedReviewValue,
      });
      await reviewDocument.save();
    }

    const reviews = await ProductReview.find({ productId });
    const totalReviews = reviews.length;

    const averageReview =
      totalReviews === 0
        ? 0
        : reviews.reduce((sum, r) => sum + Number(r.reviewValue || 0), 0) /
          totalReviews;
    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(checkExistingReview ? 200 : 201).json({
      success: true,
      message: checkExistingReview ? "Review updated" : "Review added",
      data: reviewDocument,
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
