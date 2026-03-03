import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

export const searchMoviesByName = async (query) => {
    const { data } = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    return data.results || [];
};

export const getMovieByImdbId = async (imdbId) => {
    const { data } = await axios.get(`${BASE_URL}/find/${imdbId}?api_key=${API_KEY}&external_source=imdb_id`);
    return data.movie_results?.[0] || null;
};

export const getMovieDetails = async (tmdbId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${tmdbId}?api_key=${API_KEY}`);
    return data;
};

export const getMovieCredits = async (tmdbId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${tmdbId}/credits?api_key=${API_KEY}`);
    return data;
};

export const getMovieReviews = async (tmdbId) => {
    const { data } = await axios.get(`${BASE_URL}/movie/${tmdbId}/reviews?api_key=${API_KEY}`);
    return data.results || [];
};