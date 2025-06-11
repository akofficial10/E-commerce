import mongoose from "mongoose";
import Product from "./productModel.js"; // Import Product model

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add a static method to calculate average rating
reviewSchema.statics.getAverageRating = async function (productId) {
  try {
    const obj = await this.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    if (obj.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        rating: parseFloat(obj[0].averageRating.toFixed(1)),
        reviewCount: obj[0].reviewCount,
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        rating: 0,
        reviewCount: 0,
      });
    }
  } catch (err) {
    console.error("Error updating product rating:", err);
  }
};

// Call getAverageRating after save
reviewSchema.post("save", function (doc) {
  doc.constructor.getAverageRating(doc.productId);
});

// Call getAverageRating after remove
reviewSchema.post("remove", function (doc) {
  doc.constructor.getAverageRating(doc.productId);
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
