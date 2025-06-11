import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  bestseller: { type: Boolean, default: false },
  date: { type: Number, required: true },
  benefits: { type: String, required: true },
  keyIngredients: { type: String, required: true },
  skinType: { type: String, required: true },
  volume: { type: Number, required: true },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
