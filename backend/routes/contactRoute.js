import express from "express";
import Contact from "../models/contactModel.js";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Validation middleware
const validateTicket = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("subject")
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 5 })
    .withMessage("Subject must be at least 5 characters long"),
  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 5 })
    .withMessage("Message must be at least 5 characters long"),
  body("issueType")
    .isIn(["general", "order", "return", "technical", "billing"])
    .withMessage("Invalid issue type"),
];

// Submit ticket route
router.post("/submit", validateTicket, async (req, res) => {
  console.log("Incoming ticket submission:", req.body); // <-- DEBUG LOG

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array()); // <-- DEBUG LOG
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { name, email, subject, message, issueType } = req.body;

    // Save contact in DB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
      issueType,
    });

    // Only proceed with email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Email to user
      await transporter.sendMail({
        from: `"Customer Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `We've received your support request: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Thank you for contacting us!</h2>
            <p>We've received your message and our team will get back to you as soon as possible.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
            <p><strong>Reference Number:</strong> ${newContact._id}</p>
            <p>You can expect a response within 24-48 hours.</p>
            <p>Best regards,<br>Customer Support Team</p>
          </div>
        `,
      });

      // Notification email to support team
      await transporter.sendMail({
        from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
        subject: `New Support Ticket: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">New Support Ticket Received</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>From:</strong> ${name || "Not provided"} (${email})</p>
              <p><strong>Issue Type:</strong> ${issueType}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
            <p><strong>Ticket ID:</strong> ${newContact._id}</p>
            <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
            <p>Please respond to this ticket within 24 hours.</p>
          </div>
        `,
      });
    }

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully",
      ticketId: newContact._id,
    });
  } catch (error) {
    console.error("❗ Contact form submission error:", error); // <-- DEBUG LOG
    res.status(500).json({
      success: false,
      message: "Failed to submit your message. Please try again later.",
    });
  }
});

// Get all contacts (for admin panel)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error("❗ Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
});

export default router;
