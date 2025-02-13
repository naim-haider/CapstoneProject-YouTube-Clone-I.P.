import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
//=== Routes import ===//
import userRoutes from "./routes/UserRoutes.js";

connectDB();

dotenv.config();

const app = express();

app.use(express.json()); // to parse JSON bodies

// Use user routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
