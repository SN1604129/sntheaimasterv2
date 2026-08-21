import { useState } from "react";

const GENDERS = ["Male", "Female", "Non-binary"];
const GENRES = ["Superhero", "Fantasy", "Sci-Fi", "Action", "Horror", "Mystery", "Thriller"];
const SUPERPOWERS = [
  "Dark Energy Control", "Time Manipulation", "Telepathy", "Super Strength",
  "Invisibility", "Lightning Speed", "Fire Mastery", "Telekinesis",
  "Reality Warping", "Shadow Control", "Healing Factor", "Cosmic Power",
  "Mind Control", "Elemental Force", "Dimensional Travel", "Precognition",
];
const VILLAINS = [
  "Evil Mastermind", "Alien Warlord", "Corrupt AI Overlord", "Dark Sorcerer",
  "Rogue Scientist", "Interdimensional Demon", "Cyber Terrorist", "Ancient God",
  "Government Conspiracy", "Fallen Hero", "Corporate Tyrant", "Time Manipulator",
];
const SETTINGS = [
  "New York City", "Futuristic Tokyo", "Medieval Kingdom", "Deep Space Station",
  "Underground Bunker", "Haunted Metropolis", "Floating Sky City", "Post-Apocalyptic Earth",
  "Dhaka 2077", "Sydney Harbour", "London Underground", "Dubai Skyline",
];

const ART_STYLES = [
  {
    id: "marvel",
    name: "Classic Marvel",
    desc: "Bold ink, vibrant colors, dynamic action",
    emoji: "🦸",
    colors: ["#E23636", "#1A6EBF", "#F0C132"],
  },
  {
    id: "noir",
    name: "Dark Noir",
    desc: "Heavy shadows, rain, moral ambiguity",
    emoji: "🌧️",
    colors: ["#111111", "#1A1A3E", "#8B0000"],
  },
  {
    id: "manga",
    name: "Manga Style",
    desc: "Clean lines, screen tones, raw emotion",
    emoji: "⚡",
    colors: ["#FFFFFF", "#111111", "#FF6B9D"],
  },
  {
    id: "retro",
    name: "Retro Pop Art",
    desc: "60s halftone dots, bold primaries",
    emoji: "🎨",
    colors: ["#FFE600", "#00AEEF", "#FF0090"],
  },
  {
    id: "painted",
    name: "Painted Epic",
    desc: "Rich oil-painted, Alex Ross style",
    emoji: "🖼️",
    colors: ["#8B0000", "#1C3A5E", "#C9A84C"],
  },
  {
    id: "indie",
    name: "Indie Underground",
    desc: "Scratchy, raw, hand-drawn energy",
    emoji: "✏️",
    colors: ["#8B7355", "#4A4A4A", "#CC6600"],
  },
];

export default function CustomizeStep({ formData, photoPreview, onSubmit, onBack }) {
  const [data, setData] = useState({ ...formData, art_style: formData.art_style || "marvel" });
  const [errors, setErrors] = useState({});
  const set = (k, v) => setData(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!data.hero_name.trim()) e.hero_name = "Enter your hero name";
    if (!data.superpower) e.superpower = "Choose a superpower";
    if (!data.villain) e.villain = "Choose a villain";
    if (!data.setting) e.setting = "Choose a setting";
    setErrors(e);
    return !Object.keys(e).length;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        {photoPreview && (
          <img src={photoPreview} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-[#7c3aed]" />
        )}
        <div>
          <h2 className="text-2xl font-bold text-white">Build Your Hero</h2>
          <p className="text-white/40 text-sm">Every detail shapes your unique comic</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Name */}
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
            Hero Name * <span className="text-white/30 normal-case font-normal">(appears throughout your comic)</span>
          </label>
          <input
            type="text"
            value={data.hero_name}
            onChange={e => set("hero_name", e.target.value)}
            placeholder="e.g. Shadow Nova, Iron Veil, Quantum, DesTroy..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#7c3aed] transition-colors text-sm"
          />
          {errors.hero_name && <p className="text-red-400 text-xs mt-1">{errors.hero_name}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Hero Gender</label>
          <div className="flex gap-3">
            {GENDERS.map(g => (
              <button key={g} onClick={() => set("gender", g)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                  data.gender === g ? "bg-[#7c3aed] border-[#7c3aed] text-white" : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                }`}>{g}</button>
            ))}
          </div>
        </div>

        {/* Art Style */}
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
            Art Style * <span className="text-white/30 normal-case font-normal">(defines your comic's entire visual identity)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ART_STYLES.map(style => (
              <button
                key={style.id}
                onClick={() => set("art_style", style.id)}
                className={`p-3 rounded-xl text-left transition-all border relative overflow-hidden ${
                  data.art_style === style.id
                    ? "border-[#7c3aed] bg-[#7c3aed]/15"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                {/* Color swatches */}
                <div className="flex gap-1 mb-2">
                  {style.colors.map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="text-lg mb-0.5">{style.emoji}</div>
                <p className={`text-xs font-bold ${data.art_style === style.id ? "text-[#a78bfa]" : "text-white/70"}`}>
                  {style.name}
                </p>
                <p className="text-white/30 text-xs mt-0.5">{style.desc}</p>
                {data.art_style === style.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#7c3aed] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Genre</label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map(g => (
              <button key={g} onClick={() => set("genre", g)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  data.genre === g ? "bg-[#7c3aed] border-[#7c3aed] text-white" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                }`}>{g}</button>
            ))}
          </div>
        </div>

        {/* Superpower */}
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Superpower *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUPERPOWERS.map(p => (
              <button key={p} onClick={() => set("superpower", p)}
                className={`px-3 py-2.5 rounded-xl text-xs text-left transition-all border ${
                  data.superpower === p ? "bg-[#06b6d4]/15 border-[#06b6d4] text-[#06b6d4]" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                }`}>{p}</button>
            ))}
          </div>
          {errors.superpower && <p className="text-red-400 text-xs mt-1">{errors.superpower}</p>}
        </div>

        {/* Villain */}
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Villain *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {VILLAINS.map(v => (
              <button key={v} onClick={() => set("villain", v)}
                className={`px-3 py-2.5 rounded-xl text-xs text-left transition-all border ${
                  data.villain === v ? "bg-red-500/15 border-red-500/60 text-red-400" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                }`}>{v}</button>
            ))}
          </div>
          {errors.villain && <p className="text-red-400 text-xs mt-1">{errors.villain}</p>}
        </div>

        {/* Setting */}
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Setting *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SETTINGS.map(s => (
              <button key={s} onClick={() => set("setting", s)}
                className={`px-3 py-2.5 rounded-xl text-xs text-left transition-all border ${
                  data.setting === s ? "bg-[#7c3aed]/15 border-[#7c3aed] text-[#a78bfa]" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                }`}>{s}</button>
            ))}
          </div>
          {errors.setting && <p className="text-red-400 text-xs mt-1">{errors.setting}</p>}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="px-6 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all text-sm">← Back</button>
        <button onClick={() => validate() && onSubmit(data)}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-semibold hover:opacity-90 transition-opacity text-sm">
          Preview & Generate →
        </button>
      </div>
    </div>
  );
}
