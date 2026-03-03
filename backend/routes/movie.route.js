import express from "express";
import { getMovieInsight, findMovieId, getMovieComments } from "../controllers/movie.controller.js";

const router = express.Router();

router.post("/find-id", findMovieId);
router.get("/:imdbId/comments", getMovieComments);
router.get("/:imdbId", getMovieInsight);

export default router;