import User from "../models/User.js";

export const validateUser = async (req, res, next) => {
  try {
    const { email, location } = req.body;

    // Check if email and location are provided
    if (!email || !location) {
      return res.status(400).json({ error: "Email and location are required" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // If everything is fine, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in validateUser:", error);
    res.status(500).json({ error: "Server error during validation" });
  }
};
