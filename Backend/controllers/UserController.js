import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { userName, email, password, avatar } = req.body;
    // console.log(userName);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = new User({ userName, email, password, avatar });
    // console.log(user);

    await user.save();
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the URL params
    // console.log(id);

    // Find the user by the provided ID and exclude the password field
    const user = await User.findById(id).select("-password");

    // If no user is found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user's data in the response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database (excluding the password field)
    const users = await User.find().select("-password");

    // If no users are found, return a 404 error
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Send the users data in the response
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
