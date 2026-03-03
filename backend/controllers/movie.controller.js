import { getMovieByImdbId, getMovieDetails, getMovieCredits, getMovieReviews } from "../utils/tmdb.util.js";
import { analyzeSentiment, findImdbId } from "../utils/gemini.js";

export const getMovieComments = async (req, res) => {
    try {
        const { imdbId } = req.params;

        if (!imdbId?.startsWith("tt")) {
            return res.status(400).json({ message: "Invalid IMDb ID" });
        }

        const basicMovie = await getMovieByImdbId(imdbId);
        if (!basicMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const reviews = await getMovieReviews(basicMovie.id);

        const comments = reviews.slice(0, 10).map(review => ({
            id: review.id,
            author: review.author || "Anonymous",
            content: review.content.length > 300 ? review.content.substring(0, 300) + "..." : review.content,
            fullContent: review.content,
            rating: review.author_details?.rating || null,
            createdAt: review.created_at,
            url: review.url
        }));

        res.json({ comments, total: reviews.length });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch comments" });
    }
};

export const findMovieId = async (req, res) => {
    try {
        const { name, year } = req.body;
        if (!name?.trim()) {
            return res.status(400).json({ message: "Movie name required" });
        }

        const imdbId = await findImdbId(name.trim(), year);
        if (!imdbId) {
            return res.status(404).json({ message: "IMDb ID not found" });
        }

        res.json({ imdbId });
    } catch (error) {
        res.status(500).json({ message: "Failed to find IMDb ID" });
    }
};

export const getMovieInsight = async (req, res) => {
    try {
        const { imdbId } = req.params;

        if (!imdbId?.startsWith("tt")) {
            return res.status(400).json({ message: "Invalid IMDb ID" });
        }

        const basicMovie = await getMovieByImdbId(imdbId);
        if (!basicMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const tmdbId = basicMovie.id;
        const details = await getMovieDetails(tmdbId);

        let cast = [];
        let sentimentSummary = "No reviews available";
        let overallSentiment = "N/A";
        let reviewCount = 0;

        try {
            const credits = await getMovieCredits(tmdbId);
            cast = credits.cast.slice(0, 10).map(actor => actor.name);
        } catch (error) { }

        try {
            const reviews = await getMovieReviews(tmdbId);
            reviewCount = reviews.length;

            if (reviews.length > 0) {
                const reviewsText = reviews.slice(0, 5).map(r => r.content).join("\n\n");
                const sentiment = await analyzeSentiment(reviewsText);

                const lower = sentiment.toLowerCase();
                if (lower.includes("positive")) overallSentiment = "Positive";
                else if (lower.includes("negative")) overallSentiment = "Negative";
                else if (lower.includes("mixed")) overallSentiment = "Mixed";

                sentimentSummary = sentiment.split('\n').slice(0, 3).join(' ').trim();
            }
        } catch (error) { }

        res.json({
            title: details.title,
            poster: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : null,
            releaseYear: details.release_date?.split("-")[0] || "N/A",
            rating: details.vote_average || "N/A",
            plot: details.overview || "No plot available",
            cast: cast.length > 0 ? cast : ["Cast unavailable"],
            sentimentSummary,
            overallSentiment,
            imdbId,
            reviewCount,
            genres: details.genres?.map(g => g.name) || [],
            runtime: details.runtime || "N/A"
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch movie data" });
    }
};