import express from "express";
import {
  signIn,
  signUp,
  getAllUsers,
  getUserById,
} from "../controllers/UserController.js";

const router = express.Router();

// User Sign Up
router.post("/users/signup", signUp);

// User Login
router.post("/users/signin", signIn);

// get all user
router.get("/users/", getAllUsers);

// get user by id
router.get("/users/user/:id", getUserById);

export default router;
