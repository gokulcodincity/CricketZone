import { Link } from "react-router-dom";

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
  if (country === "Zimbabwe")     return "\uD83C\uDDFF\uD83C\uDDFC";
  return "\uD83C\uDF0D";
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

function avatarGradient(role) {
  if (role === "Batsman")       return "from-brand-500 to-brand-700";
  if (role === "Bowler")        return "from-orange-400 to-orange-600";
  if (role === "All-rounder")   return "from-yellow-400 to-orange-500";
  if (role === "Wicket-keeper") return "from-purple-500 to-purple-700";
  return "from-brand-500 to-brand-700";
}

/* ─── Component ─────────────────────────────────────────── */
const PlayerCard = ({ player, index = 0 }) => {
  const badge  = roleBadge(player.role);
  const grad   = avatarGradient(player.role);
  const delay  = `${index * 60}ms`;

  const isBatsman = player.role === "Batsman" || player.role === "All-rounder";

  return (
    <Link
      to={`/players/${player._id}`}
      className="group block glass rounded-3xl p-5 shadow-card
                 hover:shadow-card-hover hover:-translate-y-1.5 hover:border-brand-500/30
                 transition-all duration-300 animate-fade-up"
      style={{ animationDelay: delay }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${grad}
                         flex items-center justify-center shadow-glow-teal
                         font-display font-black text-xl text-white
                         group-hover:scale-105 transition-transform duration-300`}>
          {initials(player.name)}
        </div>
        <span className="text-3xl leading-none" title={player.country}>
          {countryFlag(player.country)}
        </span>
      </div>

      {/* Name + badges */}
      <div className="mb-4">
        <h2 className="font-display font-bold text-[1.05rem] text-slate-100
                       group-hover:text-brand-400 transition-colors duration-200 leading-tight mb-2">
          {player.name}
        </h2>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`badge ${badge.cls}`}>
            {badge.icon} {player.role}
          </span>
          <span className="text-xs text-slate-500 font-medium">{player.country}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {isBatsman ? (
          <>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Runs</p>
              <p className="font-display font-bold text-lg text-brand-400 leading-none">
                {player.runs != null ? player.runs.toLocaleString() : "—"}
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Average</p>
              <p className="font-display font-bold text-lg text-slate-300 leading-none">
                {player.average != null ? player.average : "—"}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Wickets</p>
              <p className="font-display font-bold text-lg text-orange-400 leading-none">
                {player.wickets != null ? player.wickets : "—"}
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Economy</p>
              <p className="font-display font-bold text-lg text-slate-300 leading-none">
                {player.economy != null ? player.economy : "—"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06]">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25
                 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0
                 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          {player.matches != null ? player.matches : 0} Matches
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-brand-500
                         group-hover:gap-2 transition-all duration-200">
          Profile
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default PlayerCard;