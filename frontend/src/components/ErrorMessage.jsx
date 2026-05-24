const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4
                  text-center px-6 animate-fade-up">
    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20
                    flex items-center justify-center">
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor"
           strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71
             c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898
             0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    </div>
    <div>
      <h3 className="font-display font-bold text-lg text-red-400 mb-1">
        Something went wrong
      </h3>
      <p className="text-slate-400 text-sm max-w-sm leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <button onClick={onRetry}
        className="mt-2 px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20
                   text-red-400 font-semibold text-sm hover:bg-red-500/20
                   transition-all duration-200 active:scale-95">
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;