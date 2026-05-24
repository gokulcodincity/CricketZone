import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlayerById } from "../services/apiService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

/* ─── Helpers ───────────────────────────────────────────── */
function countryFlag(country) {
  if (country === "India")        return "\uD83C\uDDEE\uD83C\uDDF3";
  if (country === "Australia")    return "\uD83C\uDDE6\uD83C\uDDFA";
  if (country === "England")      return "\uD83C\uDFF4";
  if (country === "Pakistan")     return "\uD83C\uDDF5\uD83C\uDDF0";
  if (country === "South Africa") return "\uD83C\uDDFF\uD83C\uDDE6";
  if (country === "New Zealand")  return "\uD83C\uDDF3\uD83C\uDDFF";
  if (country === "West Indies")  return "\uD83C\uDFDD";
  if (country === "Sri Lanka")    return "\uD83C\uDDF1\uD83C\uDDF0";
  if (country === "Bangladesh")   return "\uD83C\uDDE7\uD83C\uDDE9";
  return "\uD83C\uDF0D";
}

function avatarGradient(role) {
  if (role === "Batsman")       return "from-brand-500 to-brand-700";
  if (role === "Bowler")        return "from-orange-400 to-orange-600";
  if (role === "All-rounder")   return "from-yellow-400 to-orange-500";
  if (role === "Wicket-keeper") return "from-purple-500 to-purple-700";
  return "from-brand-500 to-brand-700";
}

function roleBadge(role) {
  if (role === "Batsman")       return { cls: "badge-teal",   icon: "🏏" };
  if (role === "Bowler")        return { cls: "badge-orange", icon: "⚡" };
  if (role === "All-rounder")   return { cls: "badge-gold",   icon: "⭐" };
  if (role === "Wicket-keeper") return { cls: "badge-purple", icon: "🧤" };
  return { cls: "badge-teal", icon: "🏏" };
}

function initials(name) {
  if (!name) return "??";
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

/* ─── Stat card ─────────────────────────────────────────── */
const StatCard = ({ label, value, sub, accent = "text-brand-400" }) => (
  <div className="glass rounded-2xl p-5 hover:border-brand-500/20 transition-all duration-200">
    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-2">{label}</p>
    <p className={`font-display font-black text-3xl leading-none ${accent} mb-1`}>{value}</p>
    {sub && <p className="text-xs text-slate-600 mt-1">{sub}</p>}
  </div>
);

/* ─── Page ──────────────────────────────────────────────── */
const PlayerDetailPage = () => {
  const { id } = useParams();

  const [player,  setPlayer]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => { fetchPlayer(); }, [id]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPlayerById(id);
      setPlayer(data);
    } catch (err) {
      const msg =
        err.response?.data?.detail || err.message || "Player not found.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error) return (
    <div className="min-h-screen bg-surface-900 bg-hero-gradient">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/players" className="inline-flex items-center gap-2 text-slate-400 text-sm
                                       hover:text-brand-400 transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Players
        </Link>
        <ErrorMessage message={error} onRetry={fetchPlayer} />
      </main>
    </div>
  );

  const isBatsman = player.role === "Batsman" || player.role === "All-rounder";
  const isBowler  = player.role === "Bowler"  || player.role === "All-rounder";
  const badge = roleBadge(player.role);
  const grad  = avatarGradient(player.role);

  return (
    <div className="min-h-screen bg-surface-900 bg-hero-gradient">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Back btn */}
        <Link to="/players"
          className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium
                     hover:text-brand-400 transition-colors mb-8 animate-fade-up">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Players
        </Link>

        {/* ── Hero card ─────────────────────────────────────── */}
        <div className="glass rounded-4xl p-7 mb-6 relative overflow-hidden shadow-card animate-fade-up">
          {/* Background decoration */}
          <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full
                          bg-gradient-to-br from-brand-500/10 to-transparent pointer-events-none" />
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.04] pointer-events-none
                          select-none leading-none">🏏</div>

          {/* Player identity */}
          <div className="flex items-start gap-5 mb-7 flex-wrap">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${grad} shadow-glow-teal
                             flex items-center justify-center font-display font-black text-3xl text-white
                             flex-shrink-0`}>
              {initials(player.name)}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight
                             bg-gradient-to-r from-slate-100 to-slate-300
                             bg-clip-text text-transparent leading-tight mb-2">
                {player.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`badge ${badge.cls}`}>{badge.icon} {player.role}</span>
                <span className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                  <span className="text-xl">{countryFlag(player.country)}</span>
                  {player.country}
                </span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-fade-up-1">
            <StatCard
              label="Matches"
              value={player.matches != null ? player.matches : "—"}
              sub="International career"
            />

            {isBatsman && (
              <>
                <StatCard
                  label="Total Runs"
                  value={player.runs != null ? player.runs.toLocaleString() : "—"}
                  sub="Career runs scored"
                  accent="text-brand-400"
                />
                <StatCard
                  label="Batting Avg"
                  value={player.average != null ? player.average : "—"}
                  sub="Runs per dismissal"
                  accent="text-yellow-400"
                />
              </>
            )}

            {isBowler && (
              <>
                <StatCard
                  label="Wickets"
                  value={player.wickets != null ? player.wickets : "—"}
                  sub="Career wickets"
                  accent="text-orange-400"
                />
                <StatCard
                  label="Economy"
                  value={player.economy != null ? player.economy : "—"}
                  sub="Runs per over"
                  accent="text-red-400"
                />
              </>
            )}
          </div>
        </div>

        {/* ── Profile info card ─────────────────────────────── */}
        <div className="glass rounded-3xl p-6 animate-fade-up-2">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-5 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full" />
            <h2 className="font-display font-bold text-base text-slate-200">Player Profile</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Full Name",   value: player.name },
              { label: "Nationality", value: `${countryFlag(player.country)} ${player.country}` },
              { label: "Speciality",  value: player.role },
              { label: "Experience",  value: `${player.matches != null ? player.matches : 0} matches` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/[0.025] rounded-2xl px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-200 leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default PlayerDetailPage;