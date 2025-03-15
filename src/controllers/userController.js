import User from "../models/User.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    console.log('_________________________________registerUser');
    const { email, location } = req.body;
    const user = new User({ email, location });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user location
export const updateLocation = async (req, res) => {
  try {
    const { email, location } = req.body;
    const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Location updated successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
