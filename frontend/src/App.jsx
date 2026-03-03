import { useMovieStore } from "./store/movie.store";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import SkeletonLoader from "./components/SkeletonLoader";
import StarBackground from "./components/StarBackground";

export default function App() {
    const { movie, loading, error } = useMovieStore();

    return (
        <div className="relative h-screen bg-[#040816] overflow-hidden"
            style={{
                backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
            }}
        >
            <StarBackground />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-20 right-10 w-64 h-64 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

            <main className="relative z-10 h-full flex flex-col">
                <div className="text-center pt-4 sm:pt-8 pb-4 sm:pb-6 animate-fade-in px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-2 leading-none tracking-tight">
                        Movie
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.6)]">
                            Khoj
                        </span>
                    </h1>

                    <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-lg mx-auto leading-relaxed px-2">
                        Drop any IMDb ID and get instant AI-powered audience sentiment insights.
                    </p>
                </div>

                <div className="px-2 sm:px-4 mb-4 sm:mb-6 animate-fade-in">
                    <SearchBar />
                </div>

                <div className="flex-1 px-2 sm:px-4 overflow-y-auto">
                    {!movie && !loading && !error && (
                        <div className="text-center mt-8 sm:mt-12 animate-fade-in">
                            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-float inline-block">🎬</div>
                            <p className="text-slate-500 text-xs sm:text-sm">Enter an IMDb ID to explore a movie</p>
                            <p className="text-slate-600 text-xs mt-1">
                                Try{" "}
                                <span className="text-indigo-400 font-mono">tt0133093</span>
                                {" "}— The Matrix
                            </p>
                        </div>
                    )}

                    {loading && <SkeletonLoader />}

                    {error && !loading && (
                        <div className="w-full max-w-4xl mx-auto animate-slide-up">
                            <div className="bg-white/3 backdrop-blur-xl border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.1)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
                                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">⚠️</div>
                                <h2 className="text-base sm:text-lg font-bold text-rose-300 mb-2">Something went wrong</h2>
                                <p className="text-slate-400 text-xs sm:text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {movie && !loading && <MovieCard movie={movie} />}
                </div>

                <footer className="relative z-10 text-center py-2 sm:py-4 text-slate-700 text-xs tracking-widest">
                    MovieKhoj — Movie Sentiment Insights
                </footer>
            </main>
        </div>
    );
}