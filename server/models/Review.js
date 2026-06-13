import mongoose from "mongoose";

const ProductReviewSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  userName: Number,
  reviewMessage: String,
  reviewValue: String,
}, {timestamps: true});

export default mongoose.model("ProductReview", ProductReviewSchema);