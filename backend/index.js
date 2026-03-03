import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoute from "./routes/movie.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "https://moviekhoj-frontendd.onrender.com", credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/movie", movieRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { });