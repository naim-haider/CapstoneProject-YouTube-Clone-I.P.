import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json()); // to parse JSON bodies

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
