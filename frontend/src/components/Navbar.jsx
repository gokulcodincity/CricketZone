import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const isPlayers = pathname === "/players" || pathname.startsWith("/players/");
  const isAdd = pathname === "/players/add";

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16
                    bg-surface-900/80 backdrop-blur-xl border-b border-white/[0.07]">
      {/* Brand */}
      <Link to="/players" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700
                        flex items-center justify-center shadow-glow-teal
                        group-hover:scale-105 transition-transform duration-200">
          <span className="text-lg">🏏</span>
        </div>
        <span className="font-display font-black text-xl
                         bg-gradient-to-r from-brand-400 to-brand-300
                         bg-clip-text text-transparent tracking-tight">
          CricketZone
        </span>
      </Link>

      {/* Centre nav */}
      <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.07]
                      rounded-2xl px-2 py-1.5">
        <Link
          to="/players"
          className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200
            ${isPlayers && !isAdd
              ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
              : "text-slate-400 hover:text-slate-200"}`}
        >
          Players
        </Link>
      </div>

      {/* Right: Add Player CTA */}
      <Link to="/players/add" className="btn-primary text-xs py-2 px-4">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Player
      </Link>
    </nav>
  );
};

export default Navbar;