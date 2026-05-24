const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-5">
    {/* Triple ring spinner */}
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-2 border-brand-500/20 border-t-brand-400
                      animate-spin-slow" />
      <div className="absolute inset-2 rounded-full border-2 border-brand-600/20 border-t-brand-500
                      animate-spin-slow [animation-direction:reverse] [animation-duration:0.6s]" />
      <div className="absolute inset-4 rounded-full border-2 border-brand-700/20 border-t-brand-600
                      animate-spin-slow [animation-duration:1.4s]" />
    </div>
    <div className="text-center">
      <p className="text-slate-300 font-semibold text-sm animate-pulse-soft">
        Fetching cricket data...
      </p>
      <p className="text-slate-600 text-xs mt-1">Just a moment</p>
    </div>
  </div>
);

export default Loader;