import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPlayer } from "../services/apiService";

/* ─── Constants ─────────────────────────────────────────── */
const ROLES = ["Batsman", "Bowler", "All-rounder", "Wicket-keeper"];

const COUNTRIES = [
  "India", "Australia", "England", "Pakistan",
  "South Africa", "New Zealand", "West Indies",
  "Sri Lanka", "Bangladesh", "Zimbabwe",
];

/* ─── Input component ───────────────────────────────────── */
const Field = ({ label, id, error, children }) => (
  <div>
    <label htmlFor={id} className="input-label">{label}</label>
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5
               0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

/* ─── Role card selector ────────────────────────────────── */
const roleConfig = {
  "Batsman":       { icon: "🏏", color: "border-brand-500/60 bg-brand-500/10 text-brand-400",    bg: "from-brand-500 to-brand-700" },
  "Bowler":        { icon: "⚡", color: "border-orange-500/60 bg-orange-500/10 text-orange-400", bg: "from-orange-400 to-orange-600" },
  "All-rounder":   { icon: "⭐", color: "border-yellow-500/60 bg-yellow-500/10 text-yellow-400", bg: "from-yellow-400 to-orange-500" },
  "Wicket-keeper": { icon: "🧤", color: "border-purple-500/60 bg-purple-500/10 text-purple-400", bg: "from-purple-500 to-purple-700" },
};

/* ─── Page ──────────────────────────────────────────────── */
const AddPlayerPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", country: "", role: "", matches: "",
    runs: "", average: "", wickets: "", economy: "",
  });
  const [errors,    setErrors]    = useState({});
  const [submitting,setSubmitting] = useState(false);
  const [submitErr, setSubmitErr]  = useState("");
  const [success,   setSuccess]    = useState(false);

  /* field change */
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    setSubmitErr("");
  };

  /* validate */
  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Player name is required.";
    if (!form.country)        errs.country  = "Please select a country.";
    if (!form.role)           errs.role    = "Please select a role.";
    if (!form.matches)        errs.matches = "Matches played is required.";
    else if (isNaN(form.matches) || Number(form.matches) < 0)
      errs.matches = "Must be a positive number.";

    const isBat = form.role === "Batsman" || form.role === "All-rounder";
    const isBow = form.role === "Bowler"  || form.role === "All-rounder";

    if (isBat) {
      if (!form.runs)    errs.runs    = "Runs is required for this role.";
      if (!form.average) errs.average = "Average is required for this role.";
    }
    if (isBow) {
      if (!form.wickets) errs.wickets = "Wickets is required for this role.";
      if (!form.economy) errs.economy = "Economy is required for this role.";
    }
    return errs;
  };

  /* submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setSubmitting(true);
      const payload = {
        name:    form.name.trim(),
        country: form.country,
        role:    form.role,
        matches: Number(form.matches),
        runs:    form.runs    ? Number(form.runs)    : null,
        average: form.average ? Number(form.average) : null,
        wickets: form.wickets ? Number(form.wickets) : null,
        economy: form.economy ? Number(form.economy) : null,
      };
      await createPlayer(payload);
      setSuccess(true);
      setTimeout(() => navigate("/players"), 1800);
    } catch (err) {
      setSubmitErr(
        err.response?.data?.detail || "Failed to add player. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isBatsman = form.role === "Batsman" || form.role === "All-rounder";
  const isBowler  = form.role === "Bowler"  || form.role === "All-rounder";

  /* ── Success screen ─────────────────────────────────── */
  if (success) {
    return (
      <div className="min-h-screen bg-surface-900 bg-hero-gradient flex items-center justify-center px-4">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-brand-500/20 border-2 border-brand-500/40
                          flex items-center justify-center text-5xl mx-auto mb-6
                          shadow-glow-teal">
            ✅
          </div>
          <h2 className="font-display font-black text-3xl text-slate-100 mb-2">Player Added!</h2>
          <p className="text-slate-400 text-sm">Redirecting to players list...</p>
          <div className="mt-4 w-32 h-1 bg-surface-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-surface-900 bg-hero-gradient">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Back */}
        <Link to="/players"
          className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium
                     hover:text-brand-400 transition-colors mb-8 animate-fade-up">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Players
        </Link>

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1 h-6 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full block" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500">New Entry</p>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl
                         bg-gradient-to-r from-slate-100 to-brand-400 bg-clip-text text-transparent mb-2">
            Add Player
          </h1>
          <p className="text-slate-400 text-sm">Fill in the details to add a new cricketer to the database.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up-1" noValidate>

          {/* ── Card 1: Basic Info ─────────────────────────── */}
          <div className="glass rounded-3xl p-6 space-y-5">
            <h2 className="font-display font-bold text-sm text-slate-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-black">1</span>
              Basic Information
            </h2>

            {/* Name */}
            <Field label="Player Name *" id="name" error={errors.name}>
              <input
                id="name"
                type="text"
                placeholder="e.g. Virat Kohli"
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                className={`input-field ${errors.name ? "border-red-500/50 focus:ring-red-500/40" : ""}`}
              />
            </Field>

            {/* Country */}
            <Field label="Country *" id="country" error={errors.country}>
              <select
                id="country"
                value={form.country}
                onChange={e => handleChange("country", e.target.value)}
                className={`input-field ${errors.country ? "border-red-500/50 focus:ring-red-500/40" : ""}`}
              >
                <option value="" disabled>Select country...</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            {/* Matches */}
            <Field label="Matches Played *" id="matches" error={errors.matches}>
              <input
                id="matches"
                type="number"
                min={0}
                placeholder="e.g. 120"
                value={form.matches}
                onChange={e => handleChange("matches", e.target.value)}
                className={`input-field ${errors.matches ? "border-red-500/50 focus:ring-red-500/40" : ""}`}
              />
            </Field>
          </div>

          {/* ── Card 2: Role ───────────────────────────────── */}
          <div className="glass rounded-3xl p-6">
            <h2 className="font-display font-bold text-sm text-slate-300 flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-black">2</span>
              Player Role *
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {ROLES.map(role => {
                const cfg    = roleConfig[role];
                const active = form.role === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleChange("role", role)}
                    className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2
                                transition-all duration-200 text-left active:scale-95
                                ${active ? cfg.color : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}
                  >
                    <span className="text-2xl leading-none">{cfg.icon}</span>
                    <span className={`font-semibold text-sm ${active ? "" : "text-slate-400"}`}>{role}</span>
                    {active && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full
                                       bg-gradient-to-br from-brand-400 to-brand-600
                                       flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0
                               011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {errors.role && (
              <p className="mt-2 text-xs text-red-400 font-medium">{errors.role}</p>
            )}
          </div>

          {/* ── Card 3: Stats (conditional) ───────────────── */}
          {form.role && (
            <div className="glass rounded-3xl p-6 space-y-5 animate-fade-up">
              <h2 className="font-display font-bold text-sm text-slate-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-black">3</span>
                Performance Stats
              </h2>

              {isBatsman && (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Total Runs *" id="runs" error={errors.runs}>
                    <input
                      id="runs"
                      type="number"
                      min={0}
                      placeholder="e.g. 12000"
                      value={form.runs}
                      onChange={e => handleChange("runs", e.target.value)}
                      className={`input-field ${errors.runs ? "border-red-500/50 focus:ring-red-500/40" : ""}`}
                    />
                  </Field>
                  <Field label="Batting Average *" id="average" error={errors.average}>
                    <input
                      id="average"
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="e.g. 59.30"
                      value={form.average}
                      onChange={e => handleChange("average", e.target.value)}
                      className={`input-field ${errors.average ? "border-red-500/50 focus:ring-red-500/40" : ""}`}
                    />
                  </Field>
                </div>
              )}

              {isBowler && (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Wickets *" id="wickets" error={errors.wickets}>
                    <input
                      id="wickets"
                      type="number"
                      min={0}
                      placeholder="e.g. 350"
                      value={form.wickets}
                      onChange={e => handleChange("wickets", e.target.value)}
                      className={`input-field ${errors.wickets ? "border-red-500/50 focus:ring-red-500/40" : ""}`}
                    />
                  </Field>
                  <Field label="Economy Rate *" id="economy" error={errors.economy}>
                    <input
                      id="economy"
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="e.g. 4.35"
                      value={form.economy}
                      onChange={e => handleChange("economy", e.target.value)}
                      className={`input-field ${errors.economy ? "border-red-500/50 focus:ring-red-500/40" : ""}`}
                    />
                  </Field>
                </div>
              )}
            </div>
          )}

          {/* ── Submit error ───────────────────────────────── */}
          {submitErr && (
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-2xl
                            bg-red-500/10 border border-red-500/20">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none"
                   stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-red-400 text-sm font-medium">{submitErr}</p>
            </div>
          )}

          {/* ── Buttons ────────────────────────────────────── */}
          <div className="flex gap-3 pt-2">
            <Link to="/players" className="btn-ghost flex-1 justify-center py-3">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 justify-center py-3"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Player
                </>
              )}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default AddPlayerPage;
