import express from "express";
import { signIn, signUp, getUserInfo } from "../controllers/UserController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// User Sign Up
router.post("/signup", signUp);

// User Login
router.post("/signin", signIn);

// Get User Info (protected route, requires JWT authentication)
router.get("/me", auth, getUserInfo);

export default router;
