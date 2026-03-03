export default function SkeletonLoader() {
    const shimmerCls = "rounded-xl bg-[length:200%_100%] bg-gradient-to-r from-[#0d1235] via-[#1a2060] to-[#0d1235] animate-shimmer";

    return (
        <div className="w-full max-w-5xl mx-auto animate-slide-up">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_0_30px_rgba(99,102,241,0.1)] rounded-3xl overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className={`w-full aspect-[2/3] ${shimmerCls}`} />
                </div>
                <div className="flex-1 space-y-4">
                    <div className={`h-9 w-3/4 ${shimmerCls}`} />
                    <div className={`h-5 w-1/3 ${shimmerCls}`} />
                    <div className={`h-5 w-1/4 ${shimmerCls}`} />
                    <div className="h-px w-full bg-white/5 my-2" />
                    <div className="space-y-2">
                        <div className={`h-4 w-full ${shimmerCls}`} />
                        <div className={`h-4 w-5/6 ${shimmerCls}`} />
                        <div className={`h-4 w-4/5 ${shimmerCls}`} />
                    </div>
                    <div className="h-px w-full bg-white/5 my-2" />
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className={`h-8 w-24 rounded-full ${shimmerCls}`} />
                        ))}
                    </div>
                    <div className="h-px w-full bg-white/5 my-2" />
                    <div className="bg-white/[0.03] rounded-2xl p-5 space-y-3">
                        <div className={`h-5 w-1/3 ${shimmerCls}`} />
                        <div className={`h-4 w-full ${shimmerCls}`} />
                        <div className={`h-4 w-5/6 ${shimmerCls}`} />
                        <div className={`h-8 w-28 rounded-full ${shimmerCls} mt-2`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
