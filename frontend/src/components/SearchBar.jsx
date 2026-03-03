import { useState } from "react";
import { useMovieStore } from "../store/movie.store";

export default function SearchBar() {
    const [input, setInput] = useState("");
    const [movieName, setMovieName] = useState("");
    const [year, setYear] = useState("");
    const [searchMode, setSearchMode] = useState("imdb");
    const { fetchMovie, loading, clearMovie, findImdbId, findingId } = useMovieStore();

    const handleImdbSubmit = (e) => {
        e.preventDefault();
        const trimmed = input.trim();

        if (!trimmed) {
            alert("Please enter an IMDb ID");
            return;
        }

        if (!trimmed.startsWith("tt")) {
            alert("Please enter a valid IMDb ID starting with 'tt'");
            return;
        }

        fetchMovie(trimmed);
    };

    const handleNameSearch = async (e) => {
        e.preventDefault();
        const name = movieName.trim();

        if (!name) {
            alert("Please enter a movie name");
            return;
        }

        const imdbId = await findImdbId(name, year);
        if (imdbId) {
            setInput(imdbId);
            fetchMovie(imdbId);
        }
    };

    const handleClear = () => {
        setInput("");
        setMovieName("");
        setYear("");
        clearMovie();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4">
                <button
                    onClick={() => setSearchMode("imdb")}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${searchMode === "imdb"
                            ? "bg-indigo-600 text-white"
                            : "bg-white/10 text-indigo-300 hover:bg-white/20"
                        }`}
                >
                    Search by IMDb ID
                </button>
                <button
                    onClick={() => setSearchMode("name")}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${searchMode === "name"
                            ? "bg-indigo-600 text-white"
                            : "bg-white/10 text-indigo-300 hover:bg-white/20"
                        }`}
                >
                    Search by Name
                </button>
            </div>

            {searchMode === "imdb" ? (
                <form onSubmit={handleImdbSubmit}>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-base sm:text-lg pointer-events-none">
                                🎬
                            </span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter IMDb ID (e.g. tt0133093)"
                                disabled={loading}
                                className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/3 backdrop-blur-xl border border-white/[0.07] text-white placeholder-indigo-300/40 text-sm sm:text-base outline-none focus:border-indigo-500 transition-all duration-300 disabled:opacity-50"
                            />
                            {input && !loading && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
                        >
                            {loading ? "Loading..." : "Search"}
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleNameSearch}>
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <input
                                type="text"
                                value={movieName}
                                onChange={(e) => setMovieName(e.target.value)}
                                placeholder="Movie name (e.g. The Matrix)"
                                disabled={findingId}
                                className="flex-1 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/3 backdrop-blur-xl border border-white/[0.07] text-white placeholder-indigo-300/40 text-sm sm:text-base outline-none focus:border-indigo-500 transition-all duration-300 disabled:opacity-50"
                            />
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Year (optional)"
                                disabled={findingId}
                                className="w-full sm:w-32 px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/3 backdrop-blur-xl border border-white/[0.07] text-white placeholder-indigo-300/40 text-sm sm:text-base outline-none focus:border-indigo-500 transition-all duration-300 disabled:opacity-50"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <button
                                type="submit"
                                disabled={findingId || !movieName.trim()}
                                className="flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
                            >
                                {findingId ? "Finding ID..." : "Find IMDb ID"}
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-medium text-indigo-300 bg-white/10 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {input && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-indigo-300 text-xs sm:text-sm">Current IMDb ID:</span>
                        <button
                            onClick={() => copyToClipboard(input)}
                            className="text-indigo-400 hover:text-white transition-colors text-xs sm:text-sm"
                        >
                            📋 Copy
                        </button>
                    </div>
                    <div className="text-white font-mono text-sm sm:text-lg mt-1 break-all">{input}</div>
                </div>
            )}
        </div>
    );
}