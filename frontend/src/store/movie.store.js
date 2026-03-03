import { create } from "zustand";
import axiosInstance from "../utils/axiosService";

export const useMovieStore = create((set, get) => ({
    movie: null,
    loading: false,
    error: null,
    findingId: false,
    comments: [],
    commentsLoading: false,
    showComments: false,

    fetchComments: async (imdbId) => {
        set({ commentsLoading: true });

        try {
            const { data } = await axiosInstance.get(`/api/movie/${imdbId}/comments`);
            set({ comments: data.comments, commentsLoading: false, showComments: true });
        } catch (err) {
            set({ comments: [], commentsLoading: false, error: "Failed to load comments" });
        }
    },

    toggleComments: () => {
        const { showComments } = get();
        set({ showComments: !showComments });
    },

    findImdbId: async (name, year) => {
        set({ findingId: true, error: null });

        try {
            const { data } = await axiosInstance.post('/api/movie/find-id', { name, year });
            set({ findingId: false });
            return data.imdbId;
        } catch (err) {
            set({ findingId: false, error: "Could not find IMDb ID" });
            return null;
        }
    },

    fetchMovie: async (imdbId) => {
        if (!imdbId?.trim().startsWith("tt")) {
            set({ error: "Invalid IMDb ID" });
            return;
        }

        set({ loading: true, error: null, movie: null, comments: [], showComments: false });

        try {
            const { data } = await axiosInstance.get(`/api/movie/${imdbId.trim()}`);
            set({ movie: data, loading: false });
        } catch (err) {
            const message = err.response?.status === 404 ? "Movie not found" :
                err.response?.status === 400 ? "Invalid IMDb ID" :
                    !err.response ? "Network error" : "Failed to fetch movie";
            set({ error: message, loading: false });
        }
    },

    clearMovie: () => set({ movie: null, error: null, comments: [], showComments: false }),
}));