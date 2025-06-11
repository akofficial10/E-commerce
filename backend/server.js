import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectClodinary from "./config/cloudInary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Subscriber from "./models/subscriberModel.js";
import nodemailer from "nodemailer";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

connectDB();
connectClodinary();

// CORS configuration

const allowedOrigins = ["https://e-commerce-1-5lp9.onrender.com", "https://e-commerce-2-oajk.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);


// Newsletter subscription endpoint
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: "This email is already subscribed",
      });
    }

    // Create new subscriber
    const newSubscriber = await Subscriber.create({ email });

    // Send welcome email
    try {
      await transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to DermoDazzle!",
        html: `
         <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Soft Gradient Header -->
  <div style="background: linear-gradient(to right, #FF9A9E 0%, #FAD0C4 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 1px;">Welcome to the DermoDazzle Family!</h1>
  </div>

  <!-- Content -->
  <div style="padding: 30px; background: white; line-height: 1.7;">
    <p style="font-size: 16px; color: #555;">Hi there,</p>
    <p style="font-size: 16px; color: #555;">We’re so excited to have you on board. At DermoDazzle, we believe skincare should be simple, joyful, and glow-giving.</p>
    
    <!-- Feature Highlights (Icons optional) -->
    <div style="margin: 25px 0;">
      <p style="font-size: 15px; color: #555; margin: 10px 0;">✨ <strong>Explore</strong> our dermatologist-approved products</p>
      <p style="font-size: 15px; color: #555; margin: 10px 0;">✨ <strong>Discover</strong> routines tailored to your skin’s needs</p>
      <p style="font-size: 15px; color: #555; margin: 10px 0;">✨ <strong>Join</strong> a community that celebrates healthy skin</p>
    </div>

    <!-- CTA Button -->
    <a href="${process.env.FRONTEND_URL}" style="display: inline-block; background: #FF9A9E; color: white; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; margin: 15px 0;">
      Start Exploring
    </a>
  </div>

  <!-- Footer -->
  <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
    <p style="margin: 5px 0;">Need help? <a href="mailto:hello@dermodazzle.com" style="color: #FF9A9E;">Contact us</a></p>
    <p style="margin: 5px 0;"><a href="${process.env.FRONTEND_URL}/unsubscribe?email=${email}" style="color: #999; text-decoration: underline;">Unsubscribe</a></p>
  </div>
</div>
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: "Thank you for subscribing! Check your email for discount code.",
    });
  } catch (err) {
    console.error("Subscription error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again.",
    });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
