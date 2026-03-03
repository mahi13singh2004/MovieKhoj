import { useState } from "react";
import SentimentBadge from "./SentimentBadge";
import { useMovieStore } from "../store/movie.store";

export default function MovieCard({ movie }) {
    const [imgErr, setImgErr] = useState(false);
    const [expandedComment, setExpandedComment] = useState(null);
    const { fetchComments, toggleComments, comments, commentsLoading, showComments } = useMovieStore();

    const ratingColor =
        movie.rating >= 7.5 ? "text-emerald-400" :
            movie.rating >= 5 ? "text-amber-400" :
                "text-rose-400";

    const stars = Math.round(movie.rating / 2);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const handleCommentsClick = () => {
        if (!showComments && comments.length === 0) {
            fetchComments(movie.imdbId);
        } else {
            toggleComments();
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getRatingColor = (rating) => {
        if (rating >= 8) return "text-emerald-400";
        if (rating >= 6) return "text-amber-400";
        if (rating >= 4) return "text-orange-400";
        return "text-rose-400";
    };

    return (
        <div className="w-full max-w-5xl mx-auto animate-slide-up">
            <div className="bg-gradient-to-br from-slate-900/90 to-indigo-900/30 backdrop-blur-xl border border-white/10 shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_0_40px_rgba(99,102,241,0.15)] rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="flex flex-col">
                    <div className="relative w-full h-48 sm:h-64 lg:h-auto lg:w-72 lg:min-h-[400px] flex-shrink-0 overflow-hidden lg:absolute lg:left-0 lg:top-0 lg:bottom-0">
                        {movie.poster && !imgErr ? (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                onError={() => setImgErr(true)}
                                className="w-full h-full object-cover animate-float"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-indigo-900/40 to-slate-900/40 text-4xl sm:text-6xl">
                                🎬
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/80 hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent lg:hidden" />
                    </div>

                    <div className="lg:ml-72 p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight drop-shadow-[0_0_30px_rgba(99,102,241,0.7)] mb-2">
                                {movie.title}
                            </h2>
                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                <span className="text-indigo-300/70 text-xs font-medium tracking-widest uppercase bg-white/5 px-2 py-1 rounded-full">
                                    {movie.releaseYear}
                                </span>
                                {movie.runtime !== "N/A" && (
                                    <span className="text-slate-400 text-xs bg-white/5 px-2 py-1 rounded-full">
                                        {movie.runtime} min
                                    </span>
                                )}
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <span className={`text-lg sm:text-xl font-black ${ratingColor}`}>
                                        {movie.rating !== "N/A" ? Number(movie.rating).toFixed(1) : "N/A"}
                                    </span>
                                    <span className="text-slate-500 text-xs">/10</span>
                                    <span className="ml-1 text-amber-400 tracking-tight text-sm sm:text-base">
                                        {"★".repeat(stars)}{"☆".repeat(5 - stars)}
                                    </span>
                                </div>
                            </div>

                            {movie.genres && movie.genres.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
                                    {movie.genres.slice(0, 4).map((genre, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {movie.imdbId && (
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-indigo-300 text-xs">IMDb ID:</span>
                                    <button
                                        onClick={() => copyToClipboard(movie.imdbId)}
                                        className="text-indigo-400 hover:text-white transition-colors text-xs flex items-center gap-1"
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                                <div className="text-white font-mono text-sm mt-1 break-all">{movie.imdbId}</div>
                            </div>
                        )}

                        <div className="h-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-transparent" />

                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400/60 mb-2">
                                Plot
                            </p>
                            <p className="text-slate-300 text-sm leading-relaxed">{movie.plot}</p>
                        </div>

                        <div className="h-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-transparent" />

                        {movie.cast?.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400/60 mb-2">
                                    Cast
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {movie.cast.slice(0, 6).map((name, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs font-medium rounded-full bg-white/[0.06] backdrop-blur-sm border border-indigo-500/20 text-indigo-200 hover:border-indigo-500/50 hover:text-white transition-all duration-200"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="h-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-transparent" />

                        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-indigo-500/20">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <span className="text-indigo-400">✦</span>
                                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400/80">
                                    AI Sentiment Analysis
                                </p>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                {movie.sentimentSummary}
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 uppercase tracking-widest">Overall:</span>
                                    <SentimentBadge sentiment={movie.overallSentiment} />
                                </div>
                                {movie.reviewCount > 0 && (
                                    <button
                                        onClick={handleCommentsClick}
                                        disabled={commentsLoading}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-medium text-white bg-indigo-600/80 hover:bg-indigo-600 disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-xs"
                                    >
                                        {commentsLoading ? (
                                            <>
                                                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                💬 {showComments ? 'Hide' : 'View'} Comments ({movie.reviewCount})
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        {showComments && comments.length > 0 && (
                            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-700/50">
                                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                                    <span className="text-indigo-400">💬</span>
                                    User Reviews ({comments.length})
                                </h3>
                                <div className="space-y-3 max-h-40 sm:max-h-48 overflow-y-auto">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                        <span className="text-indigo-300 text-xs font-bold">
                                                            {comment.author.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium text-xs sm:text-sm">{comment.author}</p>
                                                        <p className="text-slate-400 text-xs">{formatDate(comment.createdAt)}</p>
                                                    </div>
                                                </div>
                                                {comment.rating && (
                                                    <div className="flex items-center gap-1">
                                                        <span className={`text-xs font-bold ${getRatingColor(comment.rating)}`}>
                                                            {comment.rating}
                                                        </span>
                                                        <span className="text-amber-400">★</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-slate-300 text-xs leading-relaxed">
                                                {expandedComment === comment.id ? comment.fullContent : comment.content}
                                            </p>
                                            {comment.content !== comment.fullContent && (
                                                <button
                                                    onClick={() => setExpandedComment(expandedComment === comment.id ? null : comment.id)}
                                                    className="text-indigo-400 hover:text-indigo-300 text-xs mt-2 transition-colors"
                                                >
                                                    {expandedComment === comment.id ? 'Show less' : 'Read more'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}