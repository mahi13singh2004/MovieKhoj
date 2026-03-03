import { useState, useEffect } from "react";
import { checkBackendHealth } from "../utils/axiosService";
import StarBackground from "./StarBackground";

export default function HealthCheck({ onHealthy }) {
    const [status, setStatus] = useState("checking"); // checking, healthy, error, retrying
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);
    const [dots, setDots] = useState("");

    useEffect(() => {
        const dotInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? "" : prev + ".");
        }, 500);

        return () => clearInterval(dotInterval);
    }, []);

    useEffect(() => {
        checkHealth();
    }, []);

    const checkHealth = async () => {
        setStatus("checking");
        setError("");

        const result = await checkBackendHealth();

        if (result.isHealthy) {
            setStatus("healthy");
            setTimeout(() => onHealthy(), 1000);
        } else {
            setStatus("error");
            setError(result.error);

            // Auto retry up to 3 times with increasing delays
            if (retryCount < 3) {
                const delay = (retryCount + 1) * 3000; // 3s, 6s, 9s
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    setStatus("retrying");
                    setTimeout(checkHealth, 1000);
                }, delay);
            }
        }
    };

    const handleManualRetry = () => {
        setRetryCount(0);
        checkHealth();
    };

    return (
        <div className="relative h-screen bg-[#040816] overflow-hidden flex items-center justify-center"
            style={{
                backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
            }}
        >
            <StarBackground />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-20 right-10 w-64 h-64 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center px-4 max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-none tracking-tight">
                        Movie
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.6)]">
                            Khoj
                        </span>
                    </h1>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    {status === "checking" && (
                        <div className="animate-fade-in">
                            <div className="text-4xl mb-4 animate-pulse">🔍</div>
                            <h2 className="text-xl font-bold text-white mb-2">Waking up the backend{dots}</h2>
                            <p className="text-slate-400 text-sm">
                                This might take a moment on Render's free tier
                            </p>
                        </div>
                    )}

                    {status === "retrying" && (
                        <div className="animate-fade-in">
                            <div className="text-4xl mb-4 animate-spin">⚡</div>
                            <h2 className="text-xl font-bold text-white mb-2">Retrying{dots}</h2>
                            <p className="text-slate-400 text-sm">
                                Attempt {retryCount + 1} of 4
                            </p>
                        </div>
                    )}

                    {status === "healthy" && (
                        <div className="animate-fade-in">
                            <div className="text-4xl mb-4 animate-bounce">✅</div>
                            <h2 className="text-xl font-bold text-green-400 mb-2">Backend is ready!</h2>
                            <p className="text-slate-400 text-sm">Loading MovieKhoj...</p>
                        </div>
                    )}

                    {status === "error" && retryCount >= 3 && (
                        <div className="animate-fade-in">
                            <div className="text-4xl mb-4">❌</div>
                            <h2 className="text-xl font-bold text-red-400 mb-2">Backend Unavailable</h2>
                            <p className="text-slate-400 text-sm mb-4">{error}</p>
                            <button
                                onClick={handleManualRetry}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-slate-600 text-xs mt-4">
                    Render free tier services sleep after inactivity
                </p>
            </div>
        </div>
    );
}