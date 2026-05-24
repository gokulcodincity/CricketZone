import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlayers, getPlayersByCountry } from "../services/apiService";
import PlayerCard from "../components/PlayerCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

/* ─── Filter config ─────────────────────────────────────── */
const FILTERS = [
  { label: "All",          value: "ALL",          flag: "\uD83C\uDF0D" },
  { label: "India",        value: "India",        flag: "\uD83C\uDDEE\uD83C\uDDF3" },
  { label: "Australia",    value: "Australia",    flag: "\uD83C\uDDE6\uD83C\uDDFA" },
  { label: "England",      value: "England",      flag: "\uD83C\uDFF4" },
  { label: "Pakistan",     value: "Pakistan",     flag: "\uD83C\uDDF5\uD83C\uDDF0" },
  { label: "South Africa", value: "South Africa", flag: "\uD83C\uDDFF\uD83C\uDDE6" },
  { label: "New Zealand",  value: "New Zealand",  flag: "\uD83C\uDDF3\uD83C\uDDFF" },
];

/* ─── Stat pill ─────────────────────────────────────────── */
const StatPill = ({ icon, label, value, color = "text-brand-400" }) => (
  <div className="flex items-center gap-2.5 glass rounded-2xl px-4 py-2.5 animate-fade-up">
    <span className="text-lg">{icon}</span>
    <div>
      <p className={`font-display font-bold text-base leading-none ${color}`}>{value}</p>
      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{label}</p>
    </div>
  </div>
);

/* ─── Page ──────────────────────────────────────────────── */
const PlayersPage = () => {
  const [players,       setPlayers]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState("");
  const [activeCountry, setActiveCountry] = useState("ALL");

  useEffect(() => { fetchPlayers(); }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPlayers();
      setPlayers(data);
    } catch (err) {
      setError(
        err.message === "Network Error"
          ? "Cannot reach the server. Make sure the backend is running on port 8000."
          : "Unable to fetch players. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (country) => {
    try {
      setActiveCountry(country);
      setLoading(true);
      setError("");
      const data = country === "ALL" ? await getPlayers() : await getPlayersByCountry(country);
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* derived */
  const countries   = [...new Set(players.map(p => p.country))].length;
  const batsmen     = players.filter(p => p.role === "Batsman" || p.role === "All-rounder").length;
  const bowlers     = players.filter(p => p.role === "Bowler"  || p.role === "All-rounder").length;

  return (
    <div className="min-h-screen bg-surface-900 bg-hero-gradient">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-6 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full block" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500">
              Squad Database
            </p>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight
                         bg-gradient-to-r from-slate-100 via-slate-200 to-brand-400
                         bg-clip-text text-transparent mb-2">
            Cricket Players
          </h1>
          <p className="text-slate-400 text-base">
            Explore profiles, stats &amp; career records of world-class cricketers.
          </p>
        </div>

        {/* ── Stats Shelf ───────────────────────────────────── */}
        {!loading && !error && (
          <div className="flex flex-wrap gap-3 mb-8">
            <StatPill icon="🏏" label="Total Players" value={players.length} />
            <StatPill icon="\uD83C\uDF0D" label="Countries"    value={countries} color="text-purple-400" />
            <StatPill icon="⭐" label="Batsmen"      value={batsmen}   color="text-yellow-400" />
            <StatPill icon="⚡" label="Bowlers"      value={bowlers}   color="text-orange-400" />
          </div>
        )}

        {/* ── Filter Tabs ───────────────────────────────────── */}
        <div className="mb-8 animate-fade-up-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-3">
            Filter by Country
          </p>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(({ label, value, flag }) => (
              <button
                key={value}
                id={`filter-${value.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => handleFilter(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold
                            border transition-all duration-200 active:scale-95
                            ${activeCountry === value
                              ? "bg-brand-500/20 border-brand-500/50 text-brand-400 shadow-glow-teal"
                              : "glass border-white/[0.07] text-slate-400 hover:border-brand-500/30 hover:text-brand-300"
                            }`}
              >
                <span className="text-base">{flag}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── States ────────────────────────────────────────── */}
        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={fetchPlayers} />
        )}

        {!loading && !error && players.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-up">
            <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center text-4xl">
              🏏
            </div>
            <div className="text-center">
              <h3 className="font-display font-bold text-lg text-slate-300 mb-1">No players found</h3>
              <p className="text-slate-500 text-sm">Try a different country filter or add new players.</p>
            </div>
            <Link to="/players/add" className="btn-primary mt-2">
              + Add First Player
            </Link>
          </div>
        )}

        {/* ── Grid ──────────────────────────────────────────── */}
        {!loading && !error && players.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500 font-medium">
                Showing <span className="text-slate-300 font-semibold">{players.length}</span> players
              </p>
              <Link to="/players/add" className="btn-ghost text-xs py-2 px-3.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Player
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {players.map((player, i) => (
                <PlayerCard key={player._id} player={player} index={i} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PlayersPage;