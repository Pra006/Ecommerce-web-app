import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
title: String,
image: String,
description:String,
category: String,
brand:String,
price:Number,
salePrice:Number,
totalStock:Number,
averageReview:Number
},{timestamps: true})

const Product = mongoose.model("Product", ProductSchema)
export default Product;
