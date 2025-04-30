import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Allow requests from the frontend
}));

app.use(express.json({ limit: "100mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "100mb", extended: true })); // Increase URL-encoded payload limit

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});