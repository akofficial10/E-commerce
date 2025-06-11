import Review from "../models/Review.js";
import Product from "../models/productModel.js";

// @desc    Add a review
// @route   POST /api/reviews/:productId
// @access  Private
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId,
      userId: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    const review = new Review({
      productId,
      userId: req.user.id,
      name: req.user.name, // Always use the authenticated user's name
      rating: Number(rating),
      comment,
    });

    const savedReview = await review.save();

    // Update product rating
    await Review.getAverageRating(productId);

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      message: error.message || "Failed to add review",
    });
  }
};

// @desc    Get reviews for product
// @route   GET /api/reviews/:productId
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({
      message: error.message || "Failed to get reviews",
    });
  }
};
