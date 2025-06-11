import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router
  .route("/:productId")
  .get(getReviews) // Public route
  .post(protect, addReview); // Protected route

export default router;
