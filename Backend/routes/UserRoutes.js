import express from "express";
import {
  signIn,
  signUp,
  getAllUsers,
  getUserById,
} from "../controllers/UserController.js";

const router = express.Router();

// User Sign Up
router.post("/signup", signUp);

// User Login
router.post("/signin", signIn);

// get all user
router.get("/", getAllUsers);

// get user by id
router.get("/user/:id", getUserById);

export default router;
