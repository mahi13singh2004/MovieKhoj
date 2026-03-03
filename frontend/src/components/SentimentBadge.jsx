const CONFIG = {
    Positive: {
        label: "Positive",
        gradient: "from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/40",
        text: "text-emerald-300",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
        dot: "bg-emerald-400",
    },
    Negative: {
        label: "Negative",
        gradient: "from-rose-500/20 to-pink-500/20",
        border: "border-rose-500/40",
        text: "text-rose-300",
        glow: "shadow-[0_0_20px_rgba(244,63,94,0.3)]",
        dot: "bg-rose-400",
    },
    Mixed: {
        label: "Mixed",
        gradient: "from-amber-500/20 to-orange-500/20",
        border: "border-amber-500/40",
        text: "text-amber-300",
        glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]",
        dot: "bg-amber-400",
    },
    "N/A": {
        label: "N/A",
        gradient: "from-slate-500/20 to-slate-600/20",
        border: "border-slate-500/40",
        text: "text-slate-400",
        glow: "",
        dot: "bg-slate-400",
    },
};

export default function SentimentBadge({ sentiment }) {
    const cfg = CONFIG[sentiment] || CONFIG["N/A"];
    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-gradient-to-r ${cfg.gradient} ${cfg.border} ${cfg.glow} transition-all`}>
            <span className={`w-2 h-2 rounded-full animate-pulse-ring ${cfg.dot}`} />
            <span className={`text-sm font-semibold tracking-widest uppercase ${cfg.text}`}>
                {cfg.label}
            </span>
        </div>
    );
}
